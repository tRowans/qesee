import * as tools from '../tools.js';
import * as updates from '../build_and_update.js';

export function hideSelection(graphSVG,graphVars,simulation,decodingData,which) {
    var i = 0;
    while (i < graphVars.selectedNodes.length) {
        var n = graphVars.selectedNodes[i];
        var nodeType = n[0];
        if (which === nodeType || which === undefined) {
            updates.removeFromSelected(n,graphSVG,graphVars,simulation,decodingData);
            updates.removeNode(n,graphSVG,graphVars,simulation,decodingData);
        }
        else i++;
    }
}

export function restrictToSelection(graphSVG,graphVars,simulation,decodingData) {
    var i = 0;
    while (graphVars.activeNodes.length > graphVars.selectedNodes.length) {
        if (graphVars.selectedNodes.indexOf(graphVars.activeNodes[i].id) >= 0) i++;
        else updates.removeNode(graphVars.activeNodes[i].id,graphSVG,graphVars,simulation,decodingData);
    }
}

export function getNeighbourhood(graphVars, sType) {
    var neighbourhood = new Set();
    for (var i=0; i<graphVars.selectedNodes.length; i++) {
        neighbourhood.add(graphVars.selectedNodes[i]);
        var neighbours = graphVars.nodeNeighbours[graphVars.selectedNodes[i]];
        for (var j=0; j<neighbours.length; j++) {
            if (sType === 'x' || sType === 'z') {
                if (neighbours[j][0] !== sType) continue;
            }
            if (tools.findNodeIndex(neighbours[j],graphVars) !== undefined) {
                neighbourhood.add(neighbours[j]);
            }
        }
    }
    return neighbourhood;
}

export function selectNeighbourhood(graphSVG,graphVars,simulation,decodingData,sType) {
    var neighbourhood = getNeighbourhood(graphVars,sType);
    for (const neighbour of neighbourhood) {
        if (graphVars.selectedNodes.indexOf(neighbour) === -1) {
            updates.addToSelected(neighbour,graphSVG,graphVars,simulation,decodingData);
        }
    }
}

export function restrictToNeighbourhood(graphSVG,graphVars,simulation,decodingData,sType) {
    var neighbourhood = getNeighbourhood(graphVars,sType);
    var i = 0;
    while (graphVars.activeNodes.length > neighbourhood.size) {
        if (!neighbourhood.has(graphVars.activeNodes[i].id)) {
            updates.removeNode(graphVars.activeNodes[i].id,graphSVG,graphVars,simulation,decodingData);
        }
        else i++;
    }
}

export function displayNeighbourhood(graphSVG,graphVars,simulation,decodingData,sType) {
    for (var i=0; i<graphVars.selectedNodes.length; i++) {
        var neighbours = graphVars.nodeNeighbours[graphVars.selectedNodes[i]];
        for (var j=0; j<neighbours.length; j++) {
            if (sType === 'x' || sType === 'z') {
                if (neighbours[j][0] !== sType) continue;
            }
            if (tools.findNodeIndex(neighbours[j],graphVars) === undefined) {
                updates.addNode(neighbours[j],graphSVG,graphVars,simulation,decodingData);
                var nextNeighbours = graphVars.nodeNeighbours[neighbours[j]];
                for (var k=0; k<nextNeighbours.length; k++) {
                    if (neighbours[j][0] === 'q') {
                        updates.addLink(nextNeighbours[k],neighbours[j],graphSVG,graphVars,simulation,decodingData);
                    }
                    else updates.addLink(neighbours[j],nextNeighbours[k],graphSVG,graphVars,simulation,decodingData);
                }
            }
        }
    }
}

export function selectEvery(graphSVG,graphVars,simulation,decodingData,which) {
    for (var i=0; i<graphVars.activeNodes.length; i++) {
        var nodeClass = d3.select('#'+graphVars.activeNodes[i].id).attr('class');
        var nodeType = nodeClass[0];
        var nodeStatus = nodeClass[1];
        if (which[0] === nodeType || which[0] === undefined) {
            if (which[1] === nodeStatus || which[1] === undefined) {
                updates.addToSelected(graphVars.activeNodes[i].id,
                graphSVG,graphVars,simulation,decodingData);
            }
        }
    }
}

export function selectByDegree(graphSVG,graphVars,simulation,decodingData,targetDegree) {
    for (var i=0; i<graphVars.activeNodes.length; i++) {
        var neighbours = graphVars.nodeNeighbours[graphVars.activeNodes[i].id];
        var degree = 0;
        for (var j=0; j<neighbours.length; j++) {
            if (tools.findNodeIndex(neighbours[j],graphVars) !== undefined) degree++;
        }
        if (degree === targetDegree) {
            updates.addToSelected(graphVars.activeNodes[i].id,graphSVG,graphVars,simulation,decodingData);
        }
    }
}

export function selectComponent(graphSVG,graphVars,simulation,decodingData) {
    var componentSizeOld = 0;
    var componentSizeNew = 1;
    while (componentSizeOld !== componentSizeNew) {
        componentSizeOld = graphVars.selectedNodes.length;
        selectNeighbourhood(graphSVG,graphVars,simulation,decodingData);
        componentSizeNew = graphVars.selectedNodes.length;
    }
}
