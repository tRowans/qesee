import * as tools from './tools.js';
import * as misc from './misc.js';

//----------ADDING AND REMOVING----------

export function addNode(id,graphSVG,graphVars,simulation,decodingData) {
    graphVars.activeNodes.push({'id': id});
    update(graphSVG,graphVars,simulation,decodingData);
}

export function removeNode(id,graphSVG,graphVars,simulation,decodingData) {
    var i = 0;
    var n = tools.findNode(id,graphVars);
    while (i < graphVars.activeLinks.length) {
        if ((graphVars.activeLinks[i]['source'] === n)
            ||(graphVars.activeLinks[i]['target'] === n)) graphVars.activeLinks.splice(i,1);
        else i++;
    }
    var index = tools.findNodeIndex(id, graphVars);
    if (index !== undefined) {
        graphVars.activeNodes.splice(index,1);
        update(graphSVG,graphVars,simulation,decodingData);
    }
}

export function addLink(sourceId,targetId,graphSVG,graphVars,simulation,decodingData) {
    var sourceNode = tools.findNode(sourceId,graphVars);
    var targetNode = tools.findNode(targetId,graphVars);
    if ((sourceNode !== undefined) 
        && (targetNode !== undefined)) {
        graphVars.activeLinks.push({'source': sourceNode, 'target': targetNode});
        update(graphSVG,graphVars,simulation,decodingData);
    }
}

export function addToSelected(id,graphSVG,graphVars,simulation,decodingData) {
    graphVars.selectedNodes.push(id);
    update(graphSVG,graphVars,simulation,decodingData);
}

export function removeFromSelected(id,graphSVG,graphVars,simulation,decodingData) {
    for (var i=0; i<graphVars.selectedNodes.length; i++) {
        if (graphVars.selectedNodes[i] == id) {
            graphVars.selectedNodes.splice(i,1);
            break;
        }
    }
    update(graphSVG,graphVars,simulation,decodingData);
}

//----------BUILDING----------

export function buildNeighbours(nodes,links,graphVars) {
    for (var i=0; i<nodes.length; i++) {
        graphVars.nodeNeighbours[nodes[i].id]= [];
        for (var j=0; j<links.length; j++) {
            if (links[j]['source'] === nodes[i].id) {
                graphVars.nodeNeighbours[nodes[i].id].push(links[j]['target']);
            }
            else if (links[j]['target'] === nodes[i].id) {
                graphVars.nodeNeighbours[nodes[i].id].push(links[j]['source']);
            }
        }
    }
}

export function buildGraph(nodes,links,graphSVG,graphVars,simulation,decodingData) {
    for (var i=0; i<nodes.length; i++) {
        addNode(nodes[i].id,graphSVG,graphVars,simulation,decodingData);
    }
    for (var i=0; i<links.length; i++) {
        addLink(links[i].source,links[i].target,graphSVG,graphVars,simulation,decodingData);
    }
}

//----------POSITION CONTROL----------

function keepInBounds(pos, bound) {
    if (pos < 0) return 0;
    else if (pos > bound) return bound;
    else return pos;
}

function dragstarted(event, d, simulation) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d, simulation, locked) {
    if (!event.active) simulation.alphaTarget(0);
    if (locked) {
        d.fx = event.x;
        d.fy = event.y;
    }
    else {
        d.fx = null;
        d.fy = null;
    }
}

//----------UPDATE----------

export function update(graphSVG, graphVars, simulation, decodingData) {

    var link = graphSVG
        .select('.links')
        .selectAll('line')
        .data(graphVars.activeLinks);

    link.enter()
        .append('line');

    link.exit().remove();

    var node = graphSVG
        .select('.nodes')
        .selectAll('rect')
        .data(graphVars.activeNodes);

    node.enter()
        .append('rect')
        .call(d3.drag()
            .on('start', function(event, d) { dragstarted(event, d, simulation) })
            .on('drag', function(event, d) { dragged(event, d) })
            .on('end', function(event, d) { dragended(event, d, simulation, graphVars.locked)}))
        .on('click', function(event) {
            if (event.shiftKey) {
                if (graphVars.selectedNodes.indexOf(this.id) >= 0) {
                    removeFromSelected(this.id,graphSVG,graphVars,simulation,decodingData);
                }
                else {
                    addToSelected(this.id,graphSVG,graphVars,simulation,decodingData);
                };
            }
            else {
                while (graphVars.selectedNodes.length > 0) {
                    removeFromSelected(graphVars.selectedNodes[0],graphSVG,graphVars,simulation,decodingData);
                }
                addToSelected(this.id,graphSVG,graphVars,simulation,decodingData);
            }
        })
        .on('mouseover', function(event, d) {
            misc.displayNodeInfo(event, d, graphVars);
        })
        .on('mouseout', function() {
            d3.select('svg').selectAll('.infoPopup').remove()
        });
    
    node.exit().remove();

    //Set IDs and classes (do this after adding/removing or things get mismatched
    d3.select('.nodes')
        .selectAll('rect')
        .attr('id', function(d) {return d.id;})
        .attr('class', function(d) {return tools.assignNodeClass(d.id,graphVars,decodingData)})
        .attr('width', 10)                                      //width and height need to be set as actual attributes
        .attr('height', 10)                                     //and cannot be CSS styled for some reason
        .attr('rx', function(d) {return tools.assignRX(d.id)}); //rx cannot be CSS styled on safari

    d3.select('.links')
        .selectAll('line')
        .attr('class', function(d) {return tools.assignLinkClass(d.source.id,d.target.id);});

    //These are necessary or it won't draw the most recently added element
    //for some special js reason
    link = graphSVG
        .select('.links')
        .selectAll('line');

    node = graphSVG
        .select('.nodes')
        .selectAll('rect');

    simulation
        .nodes(graphVars.activeNodes)
        .on('tick', function() {
            link
                .attr("x1", function(d) {return keepInBounds(d.source.x, graphVars.width);})
                .attr("y1", function(d) {return keepInBounds(d.source.y, graphVars.height);})
                .attr("x2", function(d) {return keepInBounds(d.target.x, graphVars.width);})
                .attr("y2", function(d) {return keepInBounds(d.target.y, graphVars.height);});
            node        
                .attr("x", function(d) {return keepInBounds(d.x, graphVars.width) - 5;})  //need these -5s because rect position     
                .attr("y", function(d) {return keepInBounds(d.y, graphVars.height) - 5;});    //is measured from the corner not centre   
        });

    if (graphVars.nSteps) {
        graphVars.stepCounter
            .text(`${graphVars.timestep+1}/${graphVars.nSteps}`);
    }
    else {
        graphVars.stepCounter
            .text('');
    }
    
    simulation.alpha(1).restart();
}
