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
    if (cl === 'q') {
        var state = graphBundle.error[graphBundle.timestep][id.slice(1)];
        if (state === '0') { cl = cl + 'i'; }
        else if (state === '1') { cl = cl + 'x'; }
        else if (state === '2') { cl = cl + 'y'; }
        else if (state === '3') { cl = cl + 'z'; }
    }
    else if (cl === 's') {
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

export function assignLinkClass(sourceId,targetId,graphBundle) {
    var sourceState = d3.select('#'+sourceId).attr('class')[1];
    var targetState = d3.select('#'+targetId).attr('class')[1];
    var cl = graphBundle.link_type_lookup[sourceId + targetId];
    if (sourceState === '1' && targetState !== 'i') {
        cl = cl + '1';
    }
    else { cl = cl + '0'; }
    return cl;
}

export function assignRX(id) {
    var cl = id[0];
    if (cl === 'q') return 5;
    else return 1;
}
