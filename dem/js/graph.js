import * as buttons from './graph_modules/buttons.js';
import * as updates from './graph_modules/build_and_update.js';
import * as misc from './graph_modules/misc.js';
import {createContextMenu} from './graph_modules/menus/create_menu.js';
import * as menuOptions from './graph_modules/menus/menu_options.js';

export function makeGraphBundle(svg) {

    //big object for storing graph svg, simulation, variables and data etc
    var graphBundle = {
        svg: svg,
        nodes: [],
        links: [],
        
        width: window.innerWidth-20,
        height: 0.8*window.innerHeight,
        
        charge: -20,
        displayIDs: false,
        swappedXZ: false,
        locked: false,

        activeNodes: [],
        activeLinks: [],
        selectedNodes: [],
        nodeNeighbours: {},

        syndrome: window.syndrome,
        correction: window.correction,

        demData: [] //ExplainedError info for each error
    };
    
    //set up SVG
    graphBundle.svg
        .attr('width', graphBundle.width)
        .attr('height', graphBundle.height);

    graphBundle.svg
        .selectAll('g')
        .remove();
    
    graphBundle.svg
        .append('g')
        .attr('class', 'links');
    graphBundle.svg
        .append('g')
        .attr('class', 'nodes');
    
    graphBundle.svg
        .append('g')
        .attr('class', 'buttons');
    graphBundle.svg
        .append('g')
        .attr('class', 'timestep');
    
    graphBundle.svg
        .append('g')
        .attr('class', 'border')
        .append('rect')
        .attr('class', 'border')
        .attr('width', graphBundle.width)
        .attr('height', graphBundle.height)
        .attr('stroke', 'black')
        .attr('fill', 'none');

    graphBundle.stepCounter = d3
        .select('.timestep')
        .append('text')
        .attr('x', '15')
        .attr('y', '15')
        .attr('fill', 'white');
  
    return graphBundle;
}

export function interactiveGraph(graphBundle) {

    //set step info
    graphBundle.timestep = 0;
    graphBundle.nSteps = window.nSteps;

    //add all-zero error and syndrome arrays if none provided
    //these arrays are nodes.length long which is the number
    //of qubits + all stabilisers, so longer than the real arrays
    //would be, but this doesn't really matter.
    misc.makeEmptyArrays(graphBundle);

    //start simulation
    graphBundle.simulation = d3
        .forceSimulation()
        .force('link', d3.forceLink()
            .links(graphBundle.activeLinks)
            .id(function(d) {return d.id;}))
        .force('charge', d3.forceManyBody().strength(graphBundle.charge))
        .force('center', d3.forceCenter(graphBundle.width/2, graphBundle.height/2));

    //make buttons for svg (needs to come after simulation is initialised
    //because buttons interact with simulation)
    buttons.makeButtons(graphBundle);

    //bind clicks and button presses to relevant actions
    d3.select('svg')
        .on('click', function(event) {
            if (!misc.keepSelected(event)) {
                while (graphBundle.selectedNodes.length > 0) {
                    updates.removeFromSelected(graphBundle.selectedNodes[0],graphBundle);
                }
            }
            d3.selectAll('.contextMenu').remove();
        })
        .on('contextmenu', function(event) {
            var menuChoice = menuOptions.whichMenu(graphBundle);
            if (menuChoice === 'o') {
                createContextMenu(event, menuOptions.oneTypeMenu, graphBundle);
            }
            else if (menuChoice === 't') {
                createContextMenu(event, menuOptions.twoTypesMenu, graphBundle);
            }
            else {
                createContextMenu(event, menuOptions.emptyMenu, graphBundle);
            };
        });

    d3.select('body')
        .on('keypress', function(event) {
            if (event.keyCode == 106) {
                buttons.stepBack(graphBundle);
            }
            else if (event.keyCode == 107) {
                buttons.stepForward(graphBundle);
            };
        });

    //build and draw graph 
    graphBundle.svg.append('text')
        .text('Loading...')
        .attr('class', 'loadingMessage')
        .attr('font-size', '48px')
        .attr('x', graphBundle.width/2-graphBundle.width*0.1)
        .attr('y', graphBundle.height/2);
    setTimeout(function() {
        updates.buildNeighbours(graphBundle);
        updates.buildGraph(graphBundle);
        graphBundle.svg.select('.loadingMessage').remove();
        updates.update(graphBundle);
    }, 0);
}
