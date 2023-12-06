import * as tools from '../tools.js';
import * as updates from '../build_and_update.js';

export function hideSelection(graphBundle,which) {
    var i = 0;
    while (i < graphBundle.selectedNodes.length) {
        var n = graphBundle.selectedNodes[i];
        var nodeType = n[0];
        if (which === nodeType || which === undefined) {
            updates.removeFromSelected(n,graphBundle);
            updates.removeNode(n,graphBundle);
        }
        else i++;
    }
}

export function restrictToSelection(graphBundle) {
    var i = 0;
    while (graphBundle.activeNodes.length > graphBundle.selectedNodes.length) {
        if (graphBundle.selectedNodes.indexOf(graphBundle.activeNodes[i].id) >= 0) i++;
        else updates.removeNode(graphBundle.activeNodes[i].id,graphBundle);
    }
}

export function getNeighbourhood(graphBundle, sType) {
    var neighbourhood = new Set();
    for (var i=0; i<graphBundle.selectedNodes.length; i++) {
        neighbourhood.add(graphBundle.selectedNodes[i]);
        var neighbours = graphBundle.nodeNeighbours[graphBundle.selectedNodes[i]];
        for (var j=0; j<neighbours.length; j++) {
            if (sType === 'x' || sType === 'z') {
                if (neighbours[j][0] !== sType) continue;
            }
            if (tools.findNodeIndex(neighbours[j],graphBundle) !== undefined) {
                neighbourhood.add(neighbours[j]);
            }
        }
    }
    return neighbourhood;
}

export function selectNeighbourhood(graphBundle,sType) {
    var neighbourhood = getNeighbourhood(graphBundle,sType);
    for (const neighbour of neighbourhood) {
        if (graphBundle.selectedNodes.indexOf(neighbour) === -1) {
            updates.addToSelected(neighbour,graphBundle);
        }
    }
}

export function restrictToNeighbourhood(graphBundle,sType) {
    var neighbourhood = getNeighbourhood(graphBundle,sType);
    var i = 0;
    while (graphBundle.activeNodes.length > neighbourhood.size) {
        if (!neighbourhood.has(graphBundle.activeNodes[i].id)) {
            updates.removeNode(graphBundle.activeNodes[i].id,graphBundle);
        }
        else i++;
    }
}

export function displayNeighbourhood(graphBundle,sType) {
    for (var i=0; i<graphBundle.selectedNodes.length; i++) {
        var neighbours = graphBundle.nodeNeighbours[graphBundle.selectedNodes[i]];
        for (var j=0; j<neighbours.length; j++) {
            if (sType === 'x' || sType === 'z') {
                if (neighbours[j][0] !== sType) continue;
            }
            if (tools.findNodeIndex(neighbours[j],graphBundle) === undefined) {
                updates.addNode(neighbours[j],graphBundle);
                var nextNeighbours = graphBundle.nodeNeighbours[neighbours[j]];
                for (var k=0; k<nextNeighbours.length; k++) {
                    if (neighbours[j][0] === 'q') {
                        updates.addLink(nextNeighbours[k],neighbours[j],graphBundle);
                    }
                    else updates.addLink(neighbours[j],nextNeighbours[k],graphBundle);
                }
            }
        }
    }
}

export function selectEvery(graphBundle,which) {
    for (var i=0; i<graphBundle.activeNodes.length; i++) {
        var nodeClass = d3.select('#'+graphBundle.activeNodes[i].id).attr('class');
        var nodeType = nodeClass[0];
        var nodeStatus = nodeClass[1];
        if (which[0] === nodeType || which[0] === undefined) {
            if (which[1] === nodeStatus || which[1] === undefined) {
                updates.addToSelected(graphBundle.activeNodes[i].id,graphBundle);
            }
        }
    }
}

export function selectByDegree(graphBundle,targetDegree) {
    for (var i=0; i<graphBundle.activeNodes.length; i++) {
        var neighbours = graphBundle.nodeNeighbours[graphBundle.activeNodes[i].id];
        var degree = 0;
        for (var j=0; j<neighbours.length; j++) {
            if (tools.findNodeIndex(neighbours[j],graphBundle) !== undefined) degree++;
        }
        if (degree === targetDegree) {
            updates.addToSelected(graphBundle.activeNodes[i].id,graphBundle);
        }
    }
}

export function selectComponent(graphBundle) {
    var componentSizeOld = 0;
    var componentSizeNew = 1;
    while (componentSizeOld !== componentSizeNew) {
        componentSizeOld = graphBundle.selectedNodes.length;
        selectNeighbourhood(graphBundle);
        componentSizeNew = graphBundle.selectedNodes.length;
    }
}
