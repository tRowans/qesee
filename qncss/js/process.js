export function processData(graphBundle,H) {
    if (H === undefined) {
        alert("Error: Please provide a parity check matrix");
        return false;
    }
    
    for (var i=0; i<H.length; i++) {
        var stab = {'id': 's'+i};
        var link_count = 0;
        graphBundle.nodes.push(stab);
        for (var j=0; j<H[i].length; j++) {
            if (i === 0) {
                var qubit = {'id': 'q'+j};
                graphBundle.nodes.push(qubit);
            }
            if (H[i][j] === '1') {
                var link = {'source': 's'+i, 'target': 'q'+j};
                graphBundle.links.push(link);
                graphBundle.link_type_lookup['s'+i+'q'+j] = 'x';
            }
            else if (H[i][j] === '2') {
                var link = {'source': 's'+i, 'target': 'q'+j};
                graphBundle.links.push(link);
                graphBundle.link_type_lookup['s'+i+'q'+j] = 'y';
            }
            else if (H[i][j] === '3') {
                var link = {'source': 's'+i, 'target': 'q'+j};
                graphBundle.links.push(link);
                graphBundle.link_type_lookup['s'+i+'q'+j] = 'z';
            }
        }
    }
    return true;
}

export function checkValidity(H,error,syndrome) {
    const validity = checkNodeCounts(H,error,syndrome);
    const nSteps = checkSteps(error,syndrome);
    if (!validity || nSteps === -1) return -1;
    return nSteps;
}

function checkNodeCounts(H,error,syndrome) {
    var errorMsg = "";
    if (error !== undefined) {
        if (error.length === 0) {
            errorMsg = errorMsg + "Error: error data cannot have length zero\n";
        }
        else if (error[0].length !== H[0].length) {
            errorMsg = errorMsg + "Error: error data does not match number of qubits in PCM\n";
        }
    }
    if (syndrome !== undefined) {
        if (syndrome.length === 0) {
            errorMsg = errorMsg + "Error: syndrome data cannot have length zero\n";
        }
        else if (syndrome[0].length !== H.length) {
            errorMsg = errorMsg + "Error: syndrome data does not match number of checks in PCM\n";
        }
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return false;
    }
    return true;
}

function checkSteps(error,syndrome) {
    var nSteps = 0;
    var errorMsg = "";
    if (error !== undefined) {
        nSteps = error.length;
        if (syndrome !== undefined && syndrome.length !== nSteps) {
            errorMsg = errorMsg + "Error: error and syndrome data do not have the same number of timesteps\n";
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
