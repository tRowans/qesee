export function processDEM(dem,demMap,detectorShift) {
    if (dem !== undefined) {
        for (var i=0; i<dem.length; i++) {
            if (/error/.test(dem[i])) {
                var match;
                var matches = [];
                var re = /D\S+/g;
                while ((match = re.exec(dem[i])) != null) {
                    matches.push(parseInt(match[0].slice(1)));
                }
                demMap.push(matches.map(n=> n+detectorShift));
            }
            if (/shift_detectors/.test(dem[i])) {
                var match = /\s\d+$/.exec(dem[i]);
                detectorShift += parseInt(match[0]);
            }
            if (/repeat/.test(dem[i])) {
                var nRepeats = parseInt(/\d+/.exec(dem[i])[0]);
                var matchingBracketLine = findMatchingBracket(dem,i);
                for (var r=0; r<nRepeats; r++) {
                    ({ demMap, detectorShift } = processDEM(dem.slice(i+1,matchingBracketLine),
                                                              demMap,
                                                              detectorShift));
                }
                i = matchingBracketLine;
            }
        }
    }
    return { demMap, detectorShift };
}

function findMatchingBracket(dem, i) {
    var nest = 1;
    var matchingBracketLine; 
    for (var j=i+1; j<dem.length; j++) {
        if (/\{/.test(dem[j])) { nest += 1; }
        else if (/\}/.test(dem[j])) { nest -= 1; }
        if (nest === 0) {
            matchingBracketLine = j;
            break;
        }
    }
    return matchingBracketLine;
}

export function processData(graphBundle,demMap) {
    if (demMap.length === 0) {
        alert("Error: No detector error model provided");
        return false;
    }
   
    var nErrors = demMap.length;
    var nDetectors = Math.max(...demMap.flat());
    for (var i=0; i<nDetectors+1; i++) {
        var detector = {'id': 'd'+i};
        graphBundle.nodes.push(detector);
    }
    for (var i=0; i<nErrors; i++) {
        var error = {'id': 'e'+i};
        graphBundle.nodes.push(error);
        for (var j=0; j<demMap[i].length; j++) {
            var link = {'source': 'e'+i, 'target': 'd'+demMap[i][j]};
            graphBundle.links.push(link);
        }
    }
    return true;
}

export function checkValidity(demMap,syndrome,correction) {
    const validity = checkNodeCounts(demMap,syndrome,correction);
    const nSteps = checkSteps(syndrome,correction);
    if (!validity || nSteps === -1) return -1;
    return nSteps;
}

function checkNodeCounts(demMap,syndrome,correction) {
    var errorMsg = "";
    var nErrors = demMap.length;
    var nDetectors = Math.max(...demMap.flat());
    if (correction !== undefined) {
        if (correction.length === 0) {
            errorMsg = errorMsg + "Error: correction data cannot have length zero\n";
        }
        else if (correction[0].length !== nErrors) {
            errorMsg = errorMsg + "Error: correction data does not match number of error mechanisms\n";
        }
    }
    if (syndrome !== undefined) {
        if (syndrome.length === 0) {
            errorMsg = errorMsg + "Error: syndrome data cannot have length zero\n";
        }
        else if (syndrome[0].length !== nDetectors) {
            errorMsg = errorMsg + "Error: syndrome data does not match number of detectors\n";
        }
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return false;
    }
    return true;
}

function checkSteps(syndrome,correction) {
    var nSteps = 0;
    var errorMsg = "";
    if (correction !== undefined) {
        nSteps = correction.length;
        if (syndrome !== undefined && syndrome.length !== nSteps) {
            errorMsg = errorMsg + "Error: syndrome and correction data do not have the same number of timesteps\n";
        }
    }
    if (syndrome !== undefined) {
        nSteps = syndrome.length;
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return -1;
    }
    return nSteps;
}
