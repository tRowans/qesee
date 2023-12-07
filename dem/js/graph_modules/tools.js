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
        if (graphBundle.errorX[graphBundle.timestep][id.slice(1)] === '1') {
            if (graphBundle.errorZ[graphBundle.timestep][id.slice(1)] === '1') {
                cl = cl + 'y';
            }
            else cl = cl + 'x';
        }
        else if (graphBundle.errorZ[graphBundle.timestep][id.slice(1)] === '1') {
            cl = cl + 'z';
        }
        else cl = cl + 'i';
    }
    else if (cl === 'x') {
        cl = cl + graphBundle.
            syndromeX[graphBundle.timestep][id.slice(1)];
    }
    else cl = cl + graphBundle.
        syndromeZ[graphBundle.timestep][id.slice(1)];
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
