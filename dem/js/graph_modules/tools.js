export function findNode(id, graphBundle) {
    for (var i=0; i<graphBundle.activeNodes.length; i++) {
        if (graphBundle.activeNodes[i].id === id) return graphBundle.activeNodes[i];
    }
}

export function findNodeIndex(id, graphBundle) {
    for (var i=0; i<graphBundle.activeNodes.length; i++) {
        if (graphBundle.activeNodes[i].id === id) return i;
    }
}

export function areConnected(id1, id2, graphBundle) {
    if (graphBundle.nodeNeighbours[id1].indexOf(id2) >= 0) {
        return true;
    }
    else return false;
}

export function assignNodeClass(id, graphBundle) {
    //type
    var cl = id[0];
    //status
    if (cl === 'e') {
        cl = cl + graphBundle.
            correction[graphBundle.timestep][id.slice(1)];
    }
    else if (cl === 'd') {
        cl = cl + graphBundle.
            syndrome[graphBundle.timestep][id.slice(1)];
    }
    //selected y/n
    if (graphBundle.selectedNodes.indexOf(id) >= 0) {
        cl = cl + 'y';
    }
    else cl = cl + 'n';

    return cl;
}

export function assignLinkClass(sourceId,targetId) {
    var sourceState = d3.select('#'+sourceId).attr('class')[1];
    var targetState = d3.select('#'+targetId).attr('class')[1];
    if (sourceState === '1' && targetState ==='1') { return 'err'; }
    return 'noErr';
}

export function assignRX(id) {
    var cl = id[0];
    if (cl === 'e') return 5;
    else return 1;
}
