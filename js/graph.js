import {createContextMenu} from './menu.js';

export function tannerGraph(graphSVG,nodes,links,errorX,errorZ,syndromeX,syndromeZ,nSteps) {

    //----------VARIABLES----------
    
    var width = window.innerWidth - 20;
    var height = 0.8*window.innerHeight;

    graphSVG
        .attr('width', width)
        .attr('height', height);

    graphSVG
        .selectAll('g')
        .remove();

    graphSVG
        .append('g')
        .attr('class', 'links');
    graphSVG
        .append('g')
        .attr('class', 'nodes');
    
    graphSVG
        .append('g')
        .attr('class', 'buttons');
    graphSVG
        .append('g')
        .attr('class', 'timestep');

    graphSVG
        .append('g')
        .attr('class', 'border')
        .append('rect')
        .attr('class', 'border')
        .attr('width', width)
        .attr('height', height)
        .attr('stroke', 'black')
        .attr('fill', 'none');

    
    var forwardButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    forwardButton
        .append('rect')
        .attr('class', 'button')
        .attr('x', width-70)
        .attr('y', height-70)
        .attr('width', '50')
        .attr('height', '50')
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('fill', 'white');
        });
    forwardButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-50)
        .attr('y', height-40)
        .attr('pointer-events', 'none')
        .text('>');
    forwardButton.on('click', function() {
        stepForward()
    });

    var backButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    backButton
        .append('rect')
        .attr('x', width-125)
        .attr('y', height-70)
        .attr('width', '50')
        .attr('height', '50')
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('fill', 'white');
        });
    backButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-105)
        .attr('y', height-40)
        .attr('pointer-events', 'none')
        .text('<');
    backButton.on('click', function() {
        stepBack()
    });

    var resetButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    resetButton
        .append('rect')
        .attr('x', width-120)
        .attr('y', 10)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('fill', 'white');
        });
    resetButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-88)
        .attr('y', 28)
        .attr('pointer-events', 'none')
        .text('Reset');
    resetButton.on('click', function() {
        resetGraph()
    });

    var chargeButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    chargeButton
        .append('rect')
        .attr('x', width-120)
        .attr('y', 40)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('fill', 'white');
        });
    chargeButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-93)
        .attr('y', 58)
        .attr('pointer-events', 'none')
        .text('Charge');
    chargeButton.on('click', function() {
        adjustParams()
    });

    var toggleButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    toggleButton
        .append('rect')
        .attr('x', width-120)
        .attr('y', 70)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', function() {
            if (!displayIDs) {
                return 'white';
            }
            else return '#ADD8E6';
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            if (!displayIDs) {
                d3.select(this)
                    .attr('fill', 'white');
            }
            else {
                d3.select(this)
                    .attr('fill', '#ADD8E6');
            }
        });
    toggleButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-105)
        .attr('y', 88)
        .attr('pointer-events', 'none')
        .text('Toggle IDs');
    toggleButton.on('click', function() {
        displayIDs = !displayIDs;
    });

    var swapButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    swapButton
        .append('rect')
        .attr('x', width-120)
        .attr('y', 100)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('fill', 'white');
        });
    swapButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-112)
        .attr('y', 118)
        .attr('pointer-events', 'none')
        .text('Swap colours');
    swapButton.on('click', function() {
        swapXZcolours();
    });

    var lockButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    lockButton
        .append('rect')
        .attr('x', width-120)
        .attr('y', 130)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', function() {
            if (!locked) {
                return 'white';
            }
            else return '#ADD8E6';
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            if (!locked) {
                d3.select(this)
                    .attr('fill', 'white');
            }
            else {
                d3.select(this)
                    .attr('fill', '#ADD8E6');
            }
        });
    lockButton
        .append('text')
        .attr('class', 'button')
        .attr('x', width-105)
        .attr('y', 148)
        .attr('pointer-events', 'none')
        .text('Lock nodes');
    lockButton.on('click', function() {
        lockNodes();
    });

    //add all-zero error and syndrome arrays if none provided
    //these arrays are nodes.length long which is the number
    //of qubits + all stabilisers, so longer than the real arrays
    //would be, but this doesn't really matter.
   
    if (errorX === undefined) {
        errorX = [];
        for (var i=0; i<(nSteps+1); i++) {
            errorX.push([]);
            for (var j=0; j<nodes.length; j++) {
                errorX[i].push('0');
            }
        }
    }

    if (errorZ === undefined) {
        errorZ = [];
        for (var i=0; i<(nSteps+1); i++) {
            errorZ.push([]);
            for (var j=0; j<nodes.length; j++) {
                errorZ[i].push('0');
            }
        }
    }
        
    if (syndromeX === undefined) {
        syndromeX = [];
        for (var i=0; i<(nSteps+1); i++) {
            syndromeX.push([]);
            for (var j=0; j<nodes.length; j++) {
                syndromeX[i].push('0');
            }
        }
    }
       
    if (syndromeZ === undefined) {
        syndromeZ = [];
        for (var i=0; i<(nSteps+1); i++) {
            syndromeZ.push([]);
            for (var j=0; j<nodes.length; j++) {
                syndromeZ[i].push('0');
            }
        }
    }

    var timestep = 0;

    var displayIDs = false;

    var swappedXZ = false;

    var locked = false;

    var step_counter = d3
        .select('.timestep')
        .append('text')
        .attr('x', '15')
        .attr('y', '15')

    var activeNodes = [];
    var activeLinks = [];
    var selectedNodes = [];
    var nodeNeighbours = {}; 

    var charge = -20;

    var simulation = d3
        .forceSimulation()
        .force('link', d3.forceLink()
            .links(activeLinks)
            .id(function(d) {return d.id;}))
        .force('charge', d3.forceManyBody().strength(charge))
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

    function assignNodeClass(id) {
        //type
        var cl = id[0];
        //status
        if (cl === 'q') {
            if (errorX[timestep][id.slice(1)] === '1') {
                if (errorZ[timestep][id.slice(1)] === '1') {
                    cl = cl + 'y';
                }
                else cl = cl + 'x';
            }
            else if (errorZ[timestep][id.slice(1)] === '1') {
                cl = cl + 'z';
            }
            else cl = cl + 'i';
        }
        else if (cl === 'x') {
            cl = cl + syndromeX[timestep][id.slice(1)];
        }
        else cl = cl + syndromeZ[timestep][id.slice(1)];
        //selected y/n
        if (selectedNodes.indexOf(id) >= 0) {
            cl = cl + 'y';
        }
        else cl = cl + 'n';

        return cl;
    }

    function assignLinkClass(sourceId,targetId) {
        var sourceState = d3.select('#'+sourceId).attr('class')[1];
        var targetState = d3.select('#'+targetId).attr('class')[1];
        if (sourceState === '1') {
            if (targetState === 'x' && sourceId[0] !== 'x') return 'xErr';
            else if (targetState === 'z' && sourceId[0] !== 'z') return 'zErr';
            else if (targetState === 'y') return 'yErr';
        }
        return 'noErr';
    }

    function assignRX(id) {
        var cl = id[0];
        if (cl === 'q') return 5;
        else return 1;
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
        selectedNodes.push(id);
        update();
    }

    function removeFromSelected(id) {
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
            .append('line');

        link.exit().remove();

        var node = graphSVG
            .select('.nodes')
            .selectAll('rect')
            .data(activeNodes);

        node.enter()
            .append('rect')
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
                    while (selectedNodes.length > 0) {
                        removeFromSelected(selectedNodes[0]);
                    }
                    addToSelected(this.id);
                }
            })
            .on('mouseover', function(event, d) {
                displayNodeInfo(event, d);
            })
            .on('mouseout', function() {
                d3.select('svg').selectAll('.infoPopup').remove()
            });
        
        node.exit().remove();

        //Set IDs and classes (do this after adding/removing or things get mismatched
        d3.select('.nodes')
            .selectAll('rect')
            .attr('id', function(d) {return d.id;})
            .attr('class', function(d) {return assignNodeClass(d.id)})
            .attr('width', 10)                                  //width and height need to be set as actual attributes
            .attr('height', 10)                                 //and cannot be CSS styled for some reason
            .attr('rx', function(d) {return assignRX(d.id)});   //rx cannot be CSS styled on safari

        d3.select('.links')
            .selectAll('line')
            .attr('class', function(d) {return assignLinkClass(d.source.id,d.target.id);});

        //These are necessary or it won't draw the most recently added element
        //for some special js reason
        link = graphSVG
            .select('.links')
            .selectAll('line');

        node = graphSVG
            .select('.nodes')
            .selectAll('rect');

        simulation
            .nodes(activeNodes)
            .on('tick', function() {
                link
                    .attr("x1", function(d) {return keepInBounds(d.source.x, width);})
                    .attr("y1", function(d) {return keepInBounds(d.source.y, height);})
                    .attr("x2", function(d) {return keepInBounds(d.target.x, width);})
                    .attr("y2", function(d) {return keepInBounds(d.target.y, height);});
                node        
                    .attr("x", function(d) {return keepInBounds(d.x, width) - 5;})  //need these -5s because rect position     
                    .attr("y", function(d) {return keepInBounds(d.y, height) - 5;});    //is measured from the corner not centre   
            });

        if (nSteps) {
            step_counter
                .text(`${timestep+1}/${nSteps}`);
        }

        simulation.alpha(1).restart();
    }

    //----------POSITION----------



    function keepInBounds(pos, bound) {
        if (pos < 0) return 0;
        else if (pos > bound) return bound;
        else return pos;
    }


    /*
    function pos1D(d) {
        if (d.id.indexOf("x") >= 0) {return 400;}
        else if (d.id.indexOf("z") >= 0) {return 200;}
        else {return 300;}
    }

    function ticked(link, node) {
        if (oneD.checked) {
            link
                .attr("x1", function(d) {return d.source.x;})
                .attr("y1", function(d) {return pos1D(d.source);})
                .attr("x2", function(d) {return d.target.x;})
                .attr("y2", function(d) {return pos1D(d.target);});
            node
                .attr("x", function(d) {return d.x;})
                .attr("y", function(d) {return pos1D(d);});
            }
        else {
            link
                .attr("x1", function(d) {return d.source.x;})
                .attr("y1", function(d) {return d.source.y;})
                .attr("x2", function(d) {return d.target.x;})
                .attr("y2", function(d) {return d.target.y;});
            node
                .attr("x", function(d) {return d.x;})
                .attr("y", function(d) {return d.y;});
            }
        }
    */

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
        if (locked) {
            d.fx = event.x;
            d.fy = event.y;
        }
        else {
            d.fx = null;
            d.fy = null;
        }
    }

    //----------BUTTONS----------

    function stepForward() {
        if (timestep < nSteps) {
            timestep++;
            update();
        }
    }

    function stepBack() {
        if (timestep > 0) {
            timestep--;
            update();
        }
    }

    function resetGraph() {
        while (activeNodes.length > 0) {
            removeNode(activeNodes[0].id);
        }
        buildGraph();
    }

    function adjustParams() {
        let newCharge = window.prompt('Enter new charge value (default is -20)');
        if (!(newCharge === null) && !(newCharge === '')) {
            charge = newCharge;
            simulation.force('charge').strength(charge);
            update();
        }
    }

    function swapXZcolours() {
        var csslink = document.getElementsByTagName('link')[0];
        if (!swappedXZ) {
            csslink.href = 'css/style_swapped.css';
            swappedXZ = true;
        }
        else {
            csslink.href = 'css/style.css';
            swappedXZ = false;
        }
    }

    function lockNodes() {
        locked = !locked;
        for (var i=0; i<activeNodes.length; i++) {
            if (locked) {
                activeNodes[i].fx = activeNodes[i].x;
                activeNodes[i].fy = activeNodes[i].y;
            }
            else {
                activeNodes[i].fx = null;
                activeNodes[i].fy = null;
            }
        }
    }


    //----------NODE INFO POPUP----------

    function displayNodeInfo(event, d) {
        if (displayIDs) {
            const id = d.id;
            var infoPopup = d3
                .select('svg')
                .append('g')
                .attr('class', 'infoPopup');

            infoPopup
                .append('rect')
                .attr('class', 'infoPopup')
                .attr('x', event.pageX)
                .attr('y', event.pageY)
                .attr('width', function() {
                    return 10 + 10*(id.length) + 5;
                })
                .attr('height', '30')
                .attr('fill', 'white');

            infoPopup
                .append('text')
                .attr('class', 'infoPopup')
                .attr('x', function() {
                    return event.pageX + 10;
                })
                .attr('y', function() {
                    return event.pageY + 20;
                })
                .text(id);
        }
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
                    if (neighbours[j][0] !== sType) continue;
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
                    if (neighbours[j][0] !== sType) continue;
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
            var nodeClass = d3.select('#'+activeNodes[i].id).attr('class');
            var nodeType = nodeClass[0];
            var nodeStatus = nodeClass[1];
            if (which[0] === nodeType || which[0] === undefined) {
                if (which[1] === nodeStatus || which[1] === undefined) {
                    addToSelected(activeNodes[i].id);
                }
            }
        }
    }

    function selectByDegree(targetDegree) {
        for (var i=0; i<activeNodes.length; i++) {
            var neighbours = nodeNeighbours[activeNodes[i].id];
            var degree = 0;
            for (var j=0; j<neighbours.length; j++) {
                if (findNodeIndex(neighbours[j]) !== undefined) degree++;
            }
            if (degree === targetDegree) {
                addToSelected(activeNodes[i].id);
            }
        }
    }

    function selectComponent() {
        var componentSizeOld = 0;
        var componentSizeNew = 1;
        while (componentSizeOld !== componentSizeNew) {
            componentSizeOld = selectedNodes.length;
            selectNeighbourhood();
            componentSizeNew = selectedNodes.length;
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
            label: 'Select connected component',
            action: function() {selectComponent();}
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
        },
        {
            label: 'Select connected component',
            action: function() {selectComponent();}
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
        },
        {
            label: 'Select connected component',
            action: function() {selectComponent();}
        }
    ];

    var emptyMenu = [
        {
            label: 'Select all qubits',
            action: function() {selectEvery('q');}
        },
        {
            label: 'Select all X error qubits',
            action: function() {selectEvery('qx');}
        },
        {
            label: 'Select all Z error qubits',
            action: function() {selectEvery('qz');}
        },
        {
            label: 'Select all Y error qubits',
            action: function() {selectEvery('qy');}
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
        },
        {
            label: 'Select all pendant nodes',
            action: function() {selectByDegree(1);}
        },
        {
            label: 'Select all isolated nodes',
            action: function() {selectByDegree(0);}
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
        if (event.target.nodeName === 'rect') {
            return true;
        }
        else if (event.shiftKey) {
            return true;
        }
        else if (d3.select(event.target).attr('class') === 'contextMenuItem') {
            return true;
        }
    }

    d3.select('svg')
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

    d3.select('body')
        .on('keypress', function(event) {
            if (event.keyCode == 106) {
                stepBack();
            }
            else if (event.keyCode == 107) {
                stepForward();
            };
        });
    
    graphSVG.append('text')
        .text('Loading...')
        .attr('class', 'loadingMessage')
        .attr('font-size', '48px')
        .attr('x', width/2-width*0.1)
        .attr('y', height/2);
    setTimeout(function() {
        buildNeighbours(nodeNeighbours);
        buildGraph();
        graphSVG.select('.loadingMessage').remove();
        update();
    }, 0);
}
