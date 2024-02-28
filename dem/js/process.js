export function processDEM(dem,demMap,detectorShift,errorProbs) {
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
                errorProbs.push(/\(\S+\)/.exec(dem[i])[0]);
            }
            if (/shift_detectors/.test(dem[i])) {
                var match = /\s\d+$/.exec(dem[i]);
                detectorShift += parseInt(match[0]);
            }
            if (/repeat/.test(dem[i])) {
                var nRepeats = parseInt(/\d+/.exec(dem[i])[0]);
                var matchingBracketLine = findMatchingBracket(dem,i);
                for (var r=0; r<nRepeats; r++) {
                    ({ demMap, detectorShift, errorProbs } = processDEM(
                        dem.slice(i+1,matchingBracketLine),
                        demMap,
                        detectorShift,
                        errorProbs));
                }
                i = matchingBracketLine;
            }
        }
    }
    return { demMap, detectorShift, errorProbs};
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

export function processData(graphBundle) {
    if (graphBundle.demMap.length === 0) {
        alert("Error: No detector error model provided");
        return false;
    }
   
    var nErrors = graphBundle.demMap.length;
    var nDetectors = Math.max(...graphBundle.demMap.flat());
    for (var i=0; i<nDetectors+1; i++) {
        var detector = {'id': 'd'+i};
        graphBundle.nodes.push(detector);
    }
    for (var i=0; i<nErrors; i++) {
        var error = {'id': 'e'+i};
        graphBundle.nodes.push(error);
        for (var j=0; j<graphBundle.demMap[i].length; j++) {
            var link = {'source': 'e'+i, 'target': 'd'+graphBundle.demMap[i][j]};
            graphBundle.links.push(link);
        }
    }
    return true;
}

export function checkValidity(graphBundle) {
    graphBundle.syndrome = window.syndrome;
    graphBundle.correction = window.correction;
    const validity = checkNodeCounts(graphBundle);
    const nSteps = checkSteps(graphBundle);
    if (!validity || nSteps === -1) return -1;
    return nSteps;
}

function checkNodeCounts(graphBundle) {
    var errorMsg = "";
    var nErrors = graphBundle.demMap.length;
    var nDetectors = Math.max(...graphBundle.demMap.flat()) + 1;    //need +1 because indexing starts at 0
    if (graphBundle.correction !== undefined) {
        if (graphBundle.correction.length === 0) {
            errorMsg = errorMsg + "Error: correction data cannot have length zero\n";
        }
        else if (graphBundle.correction[0].length !== nErrors) {
            errorMsg = errorMsg + "Error: length of correction data ("
                + graphBundle.correction[0].length 
                + ") does not match number of error mechanisms ("
                + nErrors
                + ")\n";
        }
    }
    if (graphBundle.syndrome !== undefined) {
        if (graphBundle.syndrome.length === 0) {
            errorMsg = errorMsg + "Error: syndrome data cannot have length zero\n";
        }
        else if (graphBundle.syndrome[0].length !== nDetectors) {
            errorMsg = errorMsg + "Error: length of syndrome data ("
                + graphBundle.syndrome[0].length 
                + ") does not match number of detectors ("
                + nDetectors 
                + ")\n";
        }
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return false;
    }
    return true;
}

function checkSteps(graphBundle) {
    var nSteps = 0;
    var errorMsg = "";
    if (graphBundle.correction !== undefined) {
        nSteps = graphBundle.correction.length;
        if (graphBundle.syndrome !== undefined && graphBundle.syndrome.length !== nSteps) {
            errorMsg = errorMsg + "Error: syndrome and correction data do not have the same number of timesteps\n";
        }
    }
    if (graphBundle.syndrome !== undefined) {
        nSteps = graphBundle.syndrome.length;
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return -1;
    }
    return nSteps;
}
