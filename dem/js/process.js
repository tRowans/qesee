export function processDEM(dem, demData) {
    if (dem !== undefined) {
        for (var i=0; i<dem.length; i++) {
            var error;
            if (/ExplainedError/.test(dem[i])) {error = {};}    //new error
            else if (/dem_error_terms/.test(dem[i])) {          
                var match;
                var matches = [];
                var re = /(?<=D)\d+/g;
                while ((match = re.exec(dem[i])) != null) {
                    matches.push(parseInt(match[0]));
                }
                error.connectedDetectors = matches;
            }
            else if (/flipped_pauli_product/.test(dem[i])) {   
                error.operator = /(?<=:\s)\S+/.exec(dem[i])[0];
            }
            else if (/TICK/.test(dem[i])) {
                error.time = /\d+/.exec(dem[i]);
            }
            else if (/resolving(\s)to/.test(dem[i])) {
                error.origin = /(?<=to\s).+/.exec(dem[i]);
                demData.push(error);    //this one always last so push here
            }
        }
    }
}

export function processData(graphBundle) {
    if (graphBundle.demData.length === 0) {
        alert("Error: No detector error model provided");
        return false;
    }
   
    var nErrors = graphBundle.demData.length;
    var nDetectors = 0;
    for (var i=0; i<nErrors; i++) {
        var error = {'id': 'e'+i};
        graphBundle.nodes.push(error);
        var connections = graphBundle.demData[i].connectedDetectors;
        if (Math.max(connections) > nDetectors) {nDetectors = Math.max(connections);}
        for (var j=0; j<connections.length; j++) {
            var link = {'source': 'e'+i, 'target': 'd'+connections[j]};
            graphBundle.links.push(link);
        }
    }
    for (var i=0; i<nDetectors+1; i++) {
        var detector = {'id': 'd'+i};
        graphBundle.nodes.push(detector);
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
    var nErrors = graphBundle.demData.length;
    var nDetectors = 0;
    for (var i=0; i<nErrors; i++) {
        var maxConnection = Math.max(graphBundle.demData[i].connectedDetectors);
        if (maxConnection > nDetectors) {nDetectors = maxConnection;}
    }
    nDetectors++;   //need +1 because indexing starts at 0
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
