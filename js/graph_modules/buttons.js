import * as misc from './misc.js';
import * as updates from './build_and_update.js';
import {checkValidity} from '../process.js';

export function makeButtons(nodes,links,graphSVG,graphVars,simulation,decodingData) {    
    var forwardButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    forwardButton
        .append('rect')
        .attr('class', 'button')
        .attr('x', graphVars.width-70)
        .attr('y', graphVars.height-70)
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
        .attr('x', graphVars.width-50)
        .attr('y', graphVars.height-40)
        .attr('pointer-events', 'none')
        .text('>');
    forwardButton.on('click', function() {
        stepForward(graphSVG,graphVars,simulation,decodingData)
    });

    var backButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    backButton
        .append('rect')
        .attr('x', graphVars.width-125)
        .attr('y', graphVars.height-70)
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
        .attr('x', graphVars.width-105)
        .attr('y', graphVars.height-40)
        .attr('pointer-events', 'none')
        .text('<');
    backButton.on('click', function() {
        stepBack(graphSVG,graphVars,simulation,decodingData)
    });

    var resetButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    resetButton
        .append('rect')
        .attr('x', graphVars.width-120)
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
        .attr('x', graphVars.width-88)
        .attr('y', 28)
        .attr('pointer-events', 'none')
        .text('Reset');
    resetButton.on('click', function() {
        resetGraph(nodes,links,graphSVG,graphVars,simulation,decodingData)
    });

    var chargeButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    chargeButton
        .append('rect')
        .attr('x', graphVars.width-120)
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
        .attr('x', graphVars.width-93)
        .attr('y', 58)
        .attr('pointer-events', 'none')
        .text('Charge');
    chargeButton.on('click', function() {
        adjustCharge(graphSVG,graphVars,simulation,decodingData)
    });

    var toggleButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    toggleButton
        .append('rect')
        .attr('x', graphVars.width-120)
        .attr('y', 70)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', function() {
            if (!graphVars.displayIDs) {
                return 'white';
            }
            else return '#ADD8E6';
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            if (!graphVars.displayIDs) {
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
        .attr('x', graphVars.width-105)
        .attr('y', 88)
        .attr('pointer-events', 'none')
        .text('Toggle IDs');
    toggleButton.on('click', function() {
        graphVars.displayIDs = !graphVars.displayIDs
    });

    var swapButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    swapButton
        .append('rect')
        .attr('x', graphVars.width-120)
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
        .attr('x', graphVars.width-112)
        .attr('y', 118)
        .attr('pointer-events', 'none')
        .text('Swap colours');
    swapButton.on('click', function() {
        swapXZcolours(graphVars);
    });

    var lockButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    lockButton
        .append('rect')
        .attr('x', graphVars.width-120)
        .attr('y', 130)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', function() {
            if (!graphVars.locked) {
                return 'white';
            }
            else return '#ADD8E6';
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            if (!graphVars.locked) {
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
        .attr('x', graphVars.width-105)
        .attr('y', 148)
        .attr('pointer-events', 'none')
        .text('Lock nodes');
    lockButton.on('click', function() {
        lockNodes(graphVars);
    });

    var loadButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    loadButton
        .append('rect')
        .attr('x', graphVars.width-120)
        .attr('y', 160)
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
    loadButton
        .append('text')
        .attr('class', 'button')
        .attr('x', graphVars.width-100)
        .attr('y', 178)
        .attr('pointer-events', 'none')
        .text('Load data');
    loadButton.on('click', function() {
        decodingData.errorX = window.errorX;
        decodingData.errorZ = window.errorZ;
        decodingData.syndromeX = window.syndromeX;
        decodingData.syndromeZ = window.syndromeZ;
        nSteps = checkValidity(window.HX,window.HZ,
            decodingData.errorX,decodingData.errorZ,
            decodingData.syndromeX,decodingData.syndromeZ);
        graphVars.timestep = 0;
        misc.makeEmptyArrays(decodingData,nodes,links);
        updates.update(graphSVG,graphVars,simulation,decodingData);
        });
}

export function stepForward(graphSVG,graphVars,simulation,decodingData) {
    if (graphVars.timestep < (graphVars.nSteps-1)) {
        graphVars.timestep++;
        updates.update(graphSVG,graphVars,simulation,decodingData);
    }
}

export function stepBack(graphSVG,graphVars,simulation,decodingData) {
    if (graphVars.timestep > 0) {
        graphVars.timestep--;
        updates.update(graphSVG,graphVars,simulation,decodingData);
    }
}

export function resetGraph(nodes,links,graphSVG,graphVars,simulation,decodingData) {
    while (graphVars.activeNodes.length > 0) {
        updates.removeNode(graphVars.activeNodes[0].id,graphSVG,graphVars,simulation,decodingData);
    }
    updates.buildGraph(nodes,links,graphSVG,graphVars,simulation,decodingData);
}

export function adjustCharge(graphSVG,graphVars,simulation,decodingData) {
    let newCharge = window.prompt('Enter new charge value (default is -20)');
    if (!(newCharge === null) && !(newCharge === '')) {
        graphVars.charge = newCharge;
        simulation.force('charge').strength(graphVars.charge);
        updates.update(graphSVG,graphVars,simulation,decodingData);
    }
}

export function swapXZcolours(graphVars) {
    var csslink = document.getElementsByTagName('link')[0];
    if (!graphVars.swappedXZ) {
        csslink.href = 'css/style_swapped.css';
        graphVars.swappedXZ = true;
    }
    else {
        csslink.href = 'css/style.css';
        graphVars.swappedXZ = false;
    }
}

export function lockNodes(graphVars) {
    graphVars.locked = !graphVars.locked;
    for (var i=0; i<graphVars.activeNodes.length; i++) {
        if (graphVars.locked) {
            graphVars.activeNodes[i].fx = graphVars.activeNodes[i].x;
            graphVars.activeNodes[i].fy = graphVars.activeNodes[i].y;
        }
        else {
            graphVars.activeNodes[i].fx = null;
            graphVars.activeNodes[i].fy = null;
        }
    }
}
