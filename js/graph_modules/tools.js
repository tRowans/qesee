export function findNode(id, graphVars) {
    for (var i=0; i<graphVars.activeNodes.length; i++) {
        if (graphVars.activeNodes[i].id === id) return graphVars.activeNodes[i];
    }
}

export function findNodeIndex(id, graphVars) {
    for (var i=0; i<graphVars.activeNodes.length; i++) {
        if (graphVars.activeNodes[i].id === id) return i;
    }
}

export function areConnected(id1, id2, graphVars) {
    if (graphVars.nodeNeighbours[id1].indexOf(id2) >= 0) {
        return true;
    }
    else return false;
}

export function assignNodeClass(id, graphVars, decodingData) {
    //type
    var cl = id[0];
    //status
    if (cl === 'q') {
        if (decodingData.
                errorX[graphVars.timestep][id.slice(1)] === '1') {
            if (decodingData.
                errorZ[graphVars.timestep][id.slice(1)] === '1') {
                cl = cl + 'y';
            }
            else cl = cl + 'x';
        }
        else if (decodingData.
            errorZ[graphVars.timestep][id.slice(1)] === '1') {
            cl = cl + 'z';
        }
        else cl = cl + 'i';
    }
    else if (cl === 'x') {
        cl = cl + decodingData.
            syndromeX[graphVars.timestep][id.slice(1)];
    }
    else cl = cl + decodingData.
        syndromeZ[graphVars.timestep][id.slice(1)];
    //selected y/n
    if (graphVars.selectedNodes.indexOf(id) >= 0) {
        cl = cl + 'y';
    }
    else cl = cl + 'n';

    return cl;
}

export function assignLinkClass(sourceId,targetId) {
    var sourceState = d3.select('#'+sourceId).attr('class')[1];
    var targetState = d3.select('#'+targetId).attr('class')[1];
    if (sourceState === '1') {
        if (targetState === 'x' && sourceId[0] !== 'x') return 'xErr';
        else if (targetState === 'z' && sourceId[0] !== 'z') return 'zErr';
        else if (targetState === 'y') return 'yErr';
    }
    return 'noErr';
}

export function assignRX(id) {
    var cl = id[0];
    if (cl === 'q') return 5;
    else return 1;
}
