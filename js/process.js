export function processData(nodes,links,HX,HZ,errorX,errorZ,syndromeX,syndromeZ) {
    if (HX === undefined || HZ === undefined) {
        alert("Error: Please provide both an X and Z parity check matrix");
        return false;
    }
    if (HX[0].length !== HZ[0].length) {
        alert("Error: X and Z parity check matrices must have the same number of columnns");
        return false;
    }
    
    for (var i=0; i<HX.length; i++) {
        var stab = {'id': 'x'+i};
        nodes.push(stab);
        for (var j=0; j<HX[i].length; j++) {
            if (i === 0) {
                var qubit = {'id': 'q'+j};
                nodes.push(qubit);
            }
            if (HX[i][j] === '1') {
                var link = {'source': 'x'+i, 'target': 'q'+j};
                links.push(link);
            }
        }
    }
    for (var i=0; i<HZ.length; i++) {
        var stab = {'id': 'z'+i};
        nodes.push(stab);
        for (var j=0; j<HZ[i].length; j++) {
            if (HZ[i][j] === '1') {
                var link = {'source': 'z'+i, 'target': 'q'+j};
                links.push(link);
            }
        }
    }
    return true;
}

export function checkValidity(HX,HZ,errorX,errorZ,syndromeX,syndromeZ) {
    const validity = checkNodeCounts(HX,HZ,errorX,errorZ,syndromeX,syndromeZ);
    const nSteps = checkSteps(errorX,errorZ,syndromeX,syndromeZ);
    if (!validity || nSteps === -1) return -1;
    return nSteps;
}

function checkNodeCounts(HX,HZ,errorX,errorZ,syndromeX,syndromeZ) {
    var errorMsg = "";
    if (errorX !== undefined && errorX[0].length !== HX[0].length) {
        errorMsg = errorMsg + "Error: X error data does not match number of qubits in PCMs\n";
    }
    if (errorZ !== undefined && errorZ[0].length !== HX[0].length) {
        errorMsg = errorMsg + "Error: Z error data does not match number of qubits in PCMs\n";
    }
    if (syndromeX !== undefined && syndromeX[0].length !== HX.length) {
        errorMsg = errorMsg + "Error: X syndrome data does not match number of checks in X PCM\n";
    }
    if (syndromeZ !== undefined && syndromeZ[0].length !== HZ.length) {
        errorMsg = errorMsg + "Error: Z syndrome data does not match number of checks in Z PCM\n";
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return false;
    }
    return true;
}

function checkSteps(errorX,errorZ,syndromeX,syndromeZ) {
    var nSteps = 0;
    var errorMsg = "";
    if (errorX !== undefined) {
        nSteps = errorX.length;
        if (errorZ !== undefined && errorZ.length !== nSteps) {
            errorMsg = errorMsg + "Error: X and Z error data do not have the same number of timesteps\n";
        }
        if (syndromeX !== undefined && syndromeX.length !== nSteps) {
            errorMsg = errorMsg + "Error: X error and X syndrome data do not have the same number of timesteps\n";
        }
        if (syndromeZ !== undefined && syndromeZ.length !== nSteps) {
            errorMsg = errorMsg + "Error: X error and Z syndrome data do not have the same number of timesteps\n";
        }
    }
    if (errorZ !== undefined) {
        nSteps = errorZ.length;
        if (syndromeX !== undefined && syndromeX.length !== nSteps) {
            errorMsg = errorMsg + "Error: Z error and X syndrome data do not have the same number of timesteps\n";
        }
        if (syndromeZ !== undefined && syndromeZ.length !== nSteps) {
            errorMsg = errorMsg + "Error: Z error and Z syndrome data do not have the same number of timesteps\n";
        }
    }
    if (syndromeX !== undefined) {
        nSteps = syndromeX.length;
        if (syndromeZ !== undefined && syndromeZ.length !== nSteps) {
            errorMsg = errorMsg + "Error: X and Z syndrome data do not have the same number of timesteps\n";
        }
    }
    if (syndromeZ !== undefined) {
        nSteps = syndromeZ.length;
    }
    if (errorMsg !== "") {
        alert(errorMsg);
        return -1;
    }
    return nSteps;
}
