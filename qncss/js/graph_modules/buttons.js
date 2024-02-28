import * as misc from './misc.js';
import * as updates from './build_and_update.js';
import {checkValidity} from '../process.js';

export function makeButtons(graphBundle) {
    var forwardButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    forwardButton
        .append('rect')
        .attr('class', 'button')
        .attr('x', graphBundle.width-70)
        .attr('y', graphBundle.height-70)
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
        .attr('x', graphBundle.width-50)
        .attr('y', graphBundle.height-40)
        .attr('pointer-events', 'none')
        .text('>');
    forwardButton.on('click', function() {
        stepForward(graphBundle);
    });

    var backButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    backButton
        .append('rect')
        .attr('x', graphBundle.width-125)
        .attr('y', graphBundle.height-70)
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
        .attr('x', graphBundle.width-105)
        .attr('y', graphBundle.height-40)
        .attr('pointer-events', 'none')
        .text('<');
    backButton.on('click', function() {
        stepBack(graphBundle);
    });

    var resetButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    resetButton
        .append('rect')
        .attr('x', graphBundle.width-120)
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
        .attr('x', graphBundle.width-88)
        .attr('y', 28)
        .attr('pointer-events', 'none')
        .text('Reset');
    resetButton.on('click', function() {
        resetGraph(graphBundle);
    });

    var chargeButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    chargeButton
        .append('rect')
        .attr('x', graphBundle.width-120)
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
        .attr('x', graphBundle.width-93)
        .attr('y', 58)
        .attr('pointer-events', 'none')
        .text('Charge');
    chargeButton.on('click', function() {
        adjustCharge(graphBundle);
    });

    var toggleButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    toggleButton
        .append('rect')
        .attr('x', graphBundle.width-120)
        .attr('y', 70)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', function() {
            if (!graphBundle.displayIDs) {
                return 'white';
            }
            else return '#ADD8E6';
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            if (!graphBundle.displayIDs) {
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
        .attr('x', graphBundle.width-105)
        .attr('y', 88)
        .attr('pointer-events', 'none')
        .text('Toggle IDs');
    toggleButton.on('click', function() {
        graphBundle.displayIDs = !graphBundle.displayIDs
    });

    var swapButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    swapButton
        .append('rect')
        .attr('x', graphBundle.width-120)
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
        .attr('x', graphBundle.width-112)
        .attr('y', 118)
        .attr('pointer-events', 'none')
        .text('Swap colours');
    swapButton.on('click', function() {
        swapXZcolours(graphBundle);
    });

    var lockButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    lockButton
        .append('rect')
        .attr('x', graphBundle.width-120)
        .attr('y', 130)
        .attr('width', '100')
        .attr('height', '25')
        .attr('stroke', 'black')
        .attr('fill', function() {
            if (!graphBundle.locked) {
                return 'white';
            }
            else return '#ADD8E6';
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            if (!graphBundle.locked) {
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
        .attr('x', graphBundle.width-105)
        .attr('y', 148)
        .attr('pointer-events', 'none')
        .text('Lock nodes');
    lockButton.on('click', function() {
        lockNodes(graphBundle);
    });

    var loadButton = d3
        .select('.buttons')
        .append('g')
        .attr('class', 'button');
    loadButton
        .append('rect')
        .attr('x', graphBundle.width-120)
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
        .attr('x', graphBundle.width-100)
        .attr('y', 178)
        .attr('pointer-events', 'none')
        .text('Load data');
    loadButton.on('click', function() {
        graphBundle.error = window.error;
        graphBundle.syndrome = window.syndrome;
        graphBundle.nSteps = checkValidity(window.H,
            graphBundle.error,graphBundle.syndrome);
        graphBundle.timestep = 0;
        misc.makeEmptyArrays(graphBundle);
        updates.update(graphBundle);
        });
}

export function stepForward(graphBundle) {
    if (graphBundle.timestep < (graphBundle.nSteps-1)) {
        graphBundle.timestep++;
        updates.update(graphBundle);
    }
}

export function stepBack(graphBundle) {
    if (graphBundle.timestep > 0) {
        graphBundle.timestep--;
        updates.update(graphBundle);
    }
}

export function resetGraph(graphBundle) {
    while (graphBundle.activeNodes.length > 0) {
        updates.removeNode(graphBundle.activeNodes[0].id,graphBundle);
    }
    updates.buildGraph(graphBundle);
}

export function adjustCharge(graphBundle) {
    let newCharge = window.prompt('Enter new charge value (default is -20)');
    if (!(newCharge === null) && !(newCharge === '')) {
        graphBundle.charge = newCharge;
        graphBundle.simulation.force('charge').strength(graphBundle.charge);
        updates.update(graphBundle);
    }
}

export function swapXZcolours(graphBundle) {
    var csslink = document.getElementsByTagName('link')[0];
    if (!graphBundle.swappedXZ) {
        csslink.href = 'css/style_swapped.css';
        graphBundle.swappedXZ = true;
    }
    else {
        csslink.href = 'css/style.css';
        graphBundle.swappedXZ = false;
    }
}

export function lockNodes(graphBundle) {
    graphBundle.locked = !graphBundle.locked;
    for (var i=0; i<graphBundle.activeNodes.length; i++) {
        if (graphBundle.locked) {
            graphBundle.activeNodes[i].fx = graphBundle.activeNodes[i].x;
            graphBundle.activeNodes[i].fy = graphBundle.activeNodes[i].y;
        }
        else {
            graphBundle.activeNodes[i].fx = null;
            graphBundle.activeNodes[i].fy = null;
        }
    }
}
