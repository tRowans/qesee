import * as tools from './tools.js';
import * as misc from './misc.js';

//----------ADDING AND REMOVING----------

export function addNode(id,graphBundle) {
    graphBundle.activeNodes.push({'id': id});
    update(graphBundle);
}

export function removeNode(id,graphBundle) {
    var i = 0;
    var n = tools.findNode(id,graphBundle);
    while (i < graphBundle.activeLinks.length) {
        if ((graphBundle.activeLinks[i]['source'] === n)
            ||(graphBundle.activeLinks[i]['target'] === n)) graphBundle.activeLinks.splice(i,1);
        else i++;
    }
    var index = tools.findNodeIndex(id,graphBundle);
    if (index !== undefined) {
        graphBundle.activeNodes.splice(index,1);
        update(graphBundle);
    }
}

export function addLink(sourceId,targetId,graphBundle) {
    var sourceNode = tools.findNode(sourceId,graphBundle);
    var targetNode = tools.findNode(targetId,graphBundle);
    if ((sourceNode !== undefined) 
        && (targetNode !== undefined)) {
        graphBundle.activeLinks.push({'source': sourceNode, 'target': targetNode});
        update(graphBundle);
    }
}

export function addToSelected(id,graphBundle) {
    graphBundle.selectedNodes.push(id);
    update(graphBundle);
}

export function removeFromSelected(id,graphBundle) {
    for (var i=0; i<graphBundle.selectedNodes.length; i++) {
        if (graphBundle.selectedNodes[i] == id) {
            graphBundle.selectedNodes.splice(i,1);
            break;
        }
    }
    update(graphBundle);
}

//----------BUILDING----------

export function buildNeighbours(graphBundle) {
    for (var i=0; i<graphBundle.nodes.length; i++) {
        graphBundle.nodeNeighbours[graphBundle.nodes[i].id]= [];
        for (var j=0; j<graphBundle.links.length; j++) {
            if (graphBundle.links[j]['source'] === graphBundle.nodes[i].id) {
                graphBundle
                    .nodeNeighbours[graphBundle.nodes[i].id]
                    .push(graphBundle.links[j]['target']);
            }
            else if (graphBundle.links[j]['target'] === graphBundle.nodes[i].id) {
                graphBundle
                    .nodeNeighbours[graphBundle.nodes[i].id]
                    .push(graphBundle.links[j]['source']);
            }
        }
    }
}

export function buildGraph(graphBundle) {
    for (var i=0; i<graphBundle.nodes.length; i++) {
        addNode(graphBundle.nodes[i].id,graphBundle);
    }
    for (var i=0; i<graphBundle.links.length; i++) {
        addLink(graphBundle.links[i].source,graphBundle.links[i].target,graphBundle);
    }
}

//----------POSITION CONTROL----------

function keepInBounds(pos, bound) {
    if (pos < 0) return 0;
    else if (pos > bound) return bound;
    else return pos;
}

function dragstarted(event, d, graphBundle) {
    if (!event.active) graphBundle.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d, graphBundle) {
    if (!event.active) graphBundle.simulation.alphaTarget(0);
    if (graphBundle.locked) {
        d.fx = event.x;
        d.fy = event.y;
    }
    else {
        d.fx = null;
        d.fy = null;
    }
}

//----------UPDATE----------

export function update(graphBundle) {

    var link = graphBundle.svg
        .select('.links')
        .selectAll('line')
        .data(graphBundle.activeLinks);

    link.enter()
        .append('line');

    link.exit().remove();

    var node = graphBundle.svg
        .select('.nodes')
        .selectAll('rect')
        .data(graphBundle.activeNodes);

    node.enter()
        .append('rect')
        .call(d3.drag()
            .on('start', function(event, d) { dragstarted(event, d, graphBundle) })
            .on('drag', function(event, d) { dragged(event, d) })
            .on('end', function(event, d) { dragended(event, d, graphBundle)}))
        .on('click', function(event) {
            if (event.shiftKey) {
                if (graphBundle.selectedNodes.indexOf(this.id) >= 0) {
                    removeFromSelected(this.id,graphBundle);
                }
                else {
                    addToSelected(this.id,graphBundle);
                };
            }
            else {
                while (graphBundle.selectedNodes.length > 0) {
                    removeFromSelected(graphBundle.selectedNodes[0],graphBundle);
                }
                addToSelected(this.id,graphBundle);
            }
        })
        .on('mouseover', function(event, d) {
            misc.displayNodeInfo(event, d, graphBundle);
        })
        .on('mouseout', function() {
            d3.select('svg').selectAll('.infoPopup').remove()
        });
    
    node.exit().remove();

    //Set IDs and classes (do this after adding/removing or things get mismatched
    d3.select('.nodes')
        .selectAll('rect')
        .attr('id', function(d) {return d.id;})
        .attr('class', function(d) {return tools.assignNodeClass(d.id,graphBundle)})
        .attr('width', 10)                                      //width and height need to be set as actual attributes
        .attr('height', 10)                                     //and cannot be CSS styled for some reason
        .attr('rx', function(d) {return tools.assignRX(d.id)}); //rx cannot be CSS styled on safari

    d3.select('.links')
        .selectAll('line')
        .attr('class', function(d) {return tools.assignLinkClass(d.source.id,d.target.id);});

    //These are necessary or it won't draw the most recently added element
    //for some special js reason
    link = graphBundle.svg
        .select('.links')
        .selectAll('line');

    node = graphBundle.svg
        .select('.nodes')
        .selectAll('rect');

    graphBundle.simulation
        .nodes(graphBundle.activeNodes)
        .on('tick', function() {
            link
                .attr("x1", function(d) {return keepInBounds(d.source.x, graphBundle.width);})
                .attr("y1", function(d) {return keepInBounds(d.source.y, graphBundle.height);})
                .attr("x2", function(d) {return keepInBounds(d.target.x, graphBundle.width);})
                .attr("y2", function(d) {return keepInBounds(d.target.y, graphBundle.height);});
            node        
                .attr("x", function(d) {return keepInBounds(d.x, graphBundle.width) - 5;})  //need these -5s because rect position     
                .attr("y", function(d) {return keepInBounds(d.y, graphBundle.height) - 5;});    //is measured from the corner not centre   
        });

    if (graphBundle.nSteps) {
        graphBundle.stepCounter
            .text(`${graphBundle.timestep+1}/${graphBundle.nSteps}`);
    }
    else {
        graphBundle.stepCounter
            .text('');
    }
    
    graphBundle.simulation.alpha(1).restart();
}
