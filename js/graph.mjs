import {createContextMenu} from './menu.mjs';

export function tannerGraph(graphSVG,nodes,links) {

    //----------VARIABLES----------

    var width = graphSVG.attr("width");
    var height = graphSVG.attr("height");

    graphSVG
        .append('g')
        .attr('class', 'links');
    graphSVG
        .append('g')
        .attr('class', 'nodes');

    var activeNodes = [];
    var activeLinks = [];
    var selectedNodes = [];
    var nodeNeighbours = {}; 

    var simulation = d3
        .forceSimulation()
        .force('link', d3.forceLink()
            .links(activeLinks)
            .id(function(d) {return d.id;}))
        .force('charge', d3.forceManyBody().strength(-30))
        .force('center', d3.forceCenter(width/2, height/2));

    //----------BUILD----------

    function buildNeighbours(nodeNeighbours) {
        for (var i=0; i<nodes.length; i++) {
            nodeNeighbours[nodes[i].id]= [];
            for (var j=0; j<links.length; j++) {
                if (links[j]['source'] === nodes[i].id) {
                    nodeNeighbours[nodes[i].id].push(links[j]['target']);
                }
                else if (links[j]['target'] === nodes[i].id) {
                    nodeNeighbours[nodes[i].id].push(links[j]['source']);
                }
            }
        }
    }

    function buildGraph() {
        for (var i=0; i<nodes.length; i++) {
            addNode(nodes[i].id);
        }
        for (var i=0; i<links.length; i++) {
            addLink(links[i].source,links[i].target);
        }
    }

    //----------TOOLS----------

    function findNode(id) {
        for (var i=0; i<activeNodes.length; i++) {
            if (activeNodes[i].id === id) return activeNodes[i];
        }
    }

    function findNodeIndex(id) {
        for (var i=0; i<activeNodes.length; i++) {
            if (activeNodes[i].id === id) return i;
        }
    }

    function areConnected(id1, id2) {
        if (nodeNeighbours[id1].indexOf(id2) >= 0) {
            return true;
        }
        else return false;
    }

    //----------UPDATES----------

    function addNode(id) {
        activeNodes.push({'id': id});
        update();
    }

    function removeNode(id) {
        var i = 0;
        var n = findNode(id);
        while (i < activeLinks.length) {
            if ((activeLinks[i]['source'] === n)
                ||(activeLinks[i]['target'] === n)) activeLinks.splice(i,1);
            else i++;
        }
        var index = findNodeIndex(id);
        if (index !== undefined) {
            activeNodes.splice(index,1);
            update();
        }
    }

    function addLink(sourceId, targetId) {
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);
        if ((sourceNode !== undefined) 
            && (targetNode !== undefined)) {
            activeLinks.push({'source': sourceNode, 'target': targetNode});
            update();
        }
    }

    function addToSelected(id) {
        d3.select('#' + id)
            .attr('stroke', 'yellow')
            .attr('stroke-width', '3px')
        selectedNodes.push(id);
        update();
    }

    function removeFromSelected(id) {
        d3.select('#' + id)
            .attr('stroke', '#fff')
            .attr('stroke-width', '1.5px');
        for (var i=0; i<selectedNodes.length; i++) {
            if (selectedNodes[i] == id) {
                selectedNodes.splice(i,1);
                break;
            }
        }
        update();
    }

    function update() {

        var link = graphSVG
            .select('.links')
            .selectAll('line')
            .data(activeLinks);

        link.enter()
            .append('line')
            .attr('stroke', 'white')
            .attr('stroke-opacity', '0.6')
            .attr('stroke-width', '3');

        link.exit().remove();

        var node = graphSVG
            .select('.nodes')
            .selectAll('circle')
            .data(activeNodes);

        node.enter()
            .append('circle')
            .attr('id', function(d) {return d.id;})
            .attr('r', 5)
            .attr('stroke', '#fff')
            .attr('stroke-width', '1.5px')
            .attr('fill', function(d) {
                if (d.id.indexOf('x') >= 0) return 'blue';
                else if (d.id.indexOf('z') >= 0) return 'red';
                else return 'black';
            })
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended))
            .on('click', function(event) {
                if (event.shiftKey) {
                    if (selectedNodes.indexOf(this.id) >= 0) {
                        removeFromSelected(this.id);
                    }
                    else {
                        addToSelected(this.id);
                    };
                }
                else {
                    for (var i=0; i<selectedNodes.length; i++) {
                        removeFromSelected(selectedNodes[i]);
                    }
                    addToSelected(this.id);
                }
            });
        
        node.exit().remove();

        //rematch bound data to circle properties (can unmatch when removing nodes)
        d3.select('.nodes')
            .selectAll('circle')
            .attr('id', function(d) {return d.id;})
            .attr('fill', function(d) {
                if (d.id.indexOf('x') >= 0) return 'blue';
                else if (d.id.indexOf('z') >= 0) return 'red';
                else return 'black';
            })
            .attr('stroke', function(d) {
                if (selectedNodes.indexOf(d.id) >= 0) {
                    return 'yellow';
                }
                else {
                    return '#fff';
                };
            })
            .attr('stroke-width', function(d) {
                if (selectedNodes.indexOf(d.id) >= 0) {
                    return '3px';
                }
                else return '1.5px';
            });

        //These are necessary or it won't draw the most recently added element
        //for some special js reason
        link = graphSVG
            .select('.links')
            .selectAll('line');

        node = graphSVG
            .select('.nodes')
            .selectAll('circle');

        simulation
            .nodes(activeNodes)
            .on('tick', function() {
                link
                    .attr("x1", function(d) {return d.source.x;})
                    .attr("y1", function(d) {return d.source.y;})
                    .attr("x2", function(d) {return d.target.x;})
                    .attr("y2", function(d) {return d.target.y;});
                node
                    .attr("cx", function(d) {return d.x;})
                    .attr("cy", function(d) {return d.y;});
            });

        simulation.alpha(1).restart();
    }

    //----------POSITION----------

    /*
    function pos1D(d) {
        if (d.id.indexOf("x") >= 0) {return 400;}
        else if (d.id.indexOf("z") >= 0) {return 200;}
        else {return 300;}
    }
    */

    function ticked(link, node) {
        if (oneD.checked) {
            link
                .attr("x1", function(d) {return d.source.x;})
                .attr("y1", function(d) {return pos1D(d.source);})
                .attr("x2", function(d) {return d.target.x;})
                .attr("y2", function(d) {return pos1D(d.target);});
            node
                .attr("cx", function(d) {return d.x;})
                .attr("cy", function(d) {return pos1D(d);});
            }
        else {
            link
                .attr("x1", function(d) {return d.source.x;})
                .attr("y1", function(d) {return d.source.y;})
                .attr("x2", function(d) {return d.target.x;})
                .attr("y2", function(d) {return d.target.y;});
            node
                .attr("cx", function(d) {return d.x;})
                .attr("cy", function(d) {return d.y;});
            }
        }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    //----------MENUS----------

    function whichMenu() {
        var qubitSelected = false;
        var stabSelected = false;
        for (var i=0; i<selectedNodes.length; i++) {
            if (selectedNodes[i][0] === 'q') {
                qubitSelected = true;
            }
            else {stabSelected = true;}
        }
        if (qubitSelected && !stabSelected) {
            return 'q';
        }
        else if (!qubitSelected && stabSelected) {
            return 's';
        }
        else if (qubitSelected && stabSelected) {
            return 'g';
        }
        else return 'e';
    }

    function hideSelection(which) {
        var i = 0;
        while (i < selectedNodes.length) {
            var n = selectedNodes[i];
            var nodeType = n[0];
            if (nodeType === 's') {
                nodeType = n[1];
            }
            if (which === nodeType || which === undefined) {
                removeFromSelected(n);
                removeNode(n);
            }
            else i++;
        }
    }

    function restrictToSelection() {
        var i = 0;
        while (activeNodes.length > selectedNodes.length) {
            if (selectedNodes.indexOf(activeNodes[i].id) >= 0) i++;
            else removeNode(activeNodes[i].id);
        }
    }

    function getNeighbourhood(sType) {
        var neighbourhood = new Set();
        for (var i=0; i<selectedNodes.length; i++) {
            neighbourhood.add(selectedNodes[i]);
            var neighbours = nodeNeighbours[selectedNodes[i]];
            for (var j=0; j<neighbours.length; j++) {
                if (sType === 'x' || sType === 'z') {
                    if (neighbours[j][1] !== sType) continue;
                }
                if (findNodeIndex(neighbours[j]) !== undefined) {
                    neighbourhood.add(neighbours[j]);
                }
            }
        }
        return neighbourhood;
    }

    function selectNeighbourhood(sType) {
        var neighbourhood = getNeighbourhood(sType);
        for (const neighbour of neighbourhood) {
            if (selectedNodes.indexOf(neighbour) === -1) {
                addToSelected(neighbour);
            }
        }
    }

    function restrictToNeighbourhood(sType) {
        var neighbourhood = getNeighbourhood(sType);
        var i = 0;
        while (activeNodes.length > neighbourhood.size) {
            if (!neighbourhood.has(activeNodes[i].id)) {
                removeNode(activeNodes[i].id);
            }
            else i++;
        }
    }

    function displayNeighbourhood(sType) {
        for (var i=0; i<selectedNodes.length; i++) {
            var neighbours = nodeNeighbours[selectedNodes[i]];
            for (var j=0; j<neighbours.length; j++) {
                if (sType === 'x' || sType === 'z') {
                    if (neighbours[j][1] !== sType) continue;
                }
                if (findNodeIndex(neighbours[j]) === undefined) {
                    addNode(neighbours[j]);
                    var nextNeighbours = nodeNeighbours[neighbours[j]];
                    for (var k=0; k<nextNeighbours.length; k++) {
                        if (neighbours[j][0] === 'q') {
                            addLink(nextNeighbours[k],neighbours[j]);
                        }
                        else addLink(neighbours[j],nextNeighbours[k]);
                    }
                }
            }
        }
    }

    function selectEvery(which) {
        for (var i=0; i<activeNodes.length; i++) {
            var n = activeNodes[i].id;
            var nodeType = n[0];
            if (nodeType === 's') {
                nodeType = n[1];
            }
            if (which === nodeType || which === undefined) {
                addToSelected(n);
            }
        }
    }

    var qubitMenu = [
        {
            label: 'Hide selection',
            action: function() {hideSelection();}
        },
        {
            label: 'Restrict to selection',
            action: function() {restrictToSelection();}
        },
        {
            label: 'Restrict to X neighbourhood',
            action: function() {restrictToNeighbourhood('x');}
        },
        {
            label: 'Restrict to Z neighbourhood',
            action: function() {restrictToNeighbourhood('z');}
        },
        {
            label: 'Restrict to neighbourhood',
            action: function() {restrictToNeighbourhood();}
        },
        {
            label: 'Select all X neighbours',
            action: function() {selectNeighbourhood('x');}
        },
        {
            label: 'Select all Z neighbours',
            action: function() {selectNeighbourhood('z');}
        },
        {
            label: 'Select all neighbours',
            action: function() {selectNeighbourhood();}
        },
        {
            label: 'Display all X neighbours',
            action: function() {displayNeighbourhood('x');}
        },
        {
            label: 'Display all Z neighbours',
            action: function() {displayNeighbourhood('z');}
        },
        {
            label: 'Display all neighbours',
            action: function() {displayNeighbourhood();}
        }
    ];

    var stabMenu = [
        {
            label: 'Hide selection',
            action: function() {hideSelection();}
        },
        {
            label: 'Restrict to selection',
            action: function() {restrictToSelection();}
        },
        {
            label: 'Restrict to support',
            action: function() {restrictToNeighbourhood();}
        },
        {
            label: 'Display full support',
            action: function() {displayNeighbourhood();}
        }
    ];

    var genericMenu = [
        {
            label: 'Hide qubits',
            action: function() {hideSelection('q');}
        },
        {
            label: 'Hide X stabilisers',
            action: function() {hideSelection('x');}
        },
        {
            label: 'Hide Z stabilisers',
            action: function() {hideSelection('z');}
        },
        {
            label: 'Hide selection',
            action: function() {hideSelection();}
        },
        {
            label: 'Restrict to selection',
            action: function() {restrictToSelection();}
        },
        {
            label: 'Restrict to neighbourhood',
            action: function() {restrictToNeighbourhood();}
        },
        {
            label: 'Display all neighbours',
            action: function() {displayNeighbourhood();}
        }
    ];

    var emptyMenu = [
        {
            label: 'Select all qubits',
            action: function() {selectEvery('q');}
        },
        {
            label: 'Select all X stabilisers',
            action: function() {selectEvery('x');}
        },
        {
            label: 'Select all Z stabilisers',
            action: function() {selectEvery('z');}
        },
        {
            label: 'Select everything',
            action: function() {selectEvery();}
        }
    ]

   
    /*
    label: 'Restrict to support',
    action: function(openMenu) {
        var targetNode = openMenu.target.id;
        var toRemove = []
        for (var i=0; i<activeNodes.length; i++) {
            if (!areConnected(targetNode,activeNodes[i].id)) {
                toRemove.push(activeNodes[i].id);
            }
        }
        for (var i=0; i<toRemove.length; i++) {
            removeNode(toRemove[i]);
        }
    }
    */

    function keepSelected(event) {
        if (event.target.nodeName === 'circle') {
            return true;
        }
        else if (event.shiftKey) {
            return true;
        }
        else if (d3.select(event.target).attr('class') === 'contextMenuItem') {
            return true;
        }
    }

    d3.select('body')
        .on('click', function(event) {
            if (!keepSelected(event)) {
                while (selectedNodes.length > 0) {
                    removeFromSelected(selectedNodes[0]);
                }
            }
            d3.selectAll('.contextMenu').remove();
        })
        .on('contextmenu', function(event) {
            var menuChoice = whichMenu();
            if (menuChoice === 'q') {
                createContextMenu(event, qubitMenu);
            }
            else if (menuChoice === 's') {
                createContextMenu(event, stabMenu);
            }
            else if (menuChoice === 'g') {
                createContextMenu(event, genericMenu);
            }
            else {
                createContextMenu(event, emptyMenu);
            };
        });

    
    buildNeighbours(nodeNeighbours);
    buildGraph();

}
