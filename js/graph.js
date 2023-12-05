import {checkValidity} from './process.js';
import * as buttons from './graph_modules/buttons.js';
import * as updates from './graph_modules/build_and_update.js';
import * as misc from './graph_modules/misc.js';
import {createContextMenu} from './graph_modules/menus/create_menu.js';
import * as menuOptions from './graph_modules/menus/menu_options.js';

export function tannerGraph(graphSVG,nodes,links) {

    var graphVars = {
        width: window.innerWidth-20,
        height: 0.8*window.innerHeight,

        timestep: 0,
        nSteps: window.nSteps,
        charge: -20,
        displayIDs: false,
        swappedXZ: false,
        locked: false,

        activeNodes: [],
        activeLinks: [],
        selectedNodes: [],
        nodeNeighbours: {},

        stepCounter: null
    };

    var decodingData = {
        errorX: window.errorX,
        errorZ: window.errorZ,
        syndromeX: window.syndromeX,
        syndromeZ: window.syndromeZ
    };
    
    //add all-zero error and syndrome arrays if none provided
    //these arrays are nodes.length long which is the number
    //of qubits + all stabilisers, so longer than the real arrays
    //would be, but this doesn't really matter.
    misc.makeEmptyArrays(decodingData, nodes, links);

    graphSVG
        .attr('width', graphVars.width)
        .attr('height', graphVars.height);

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
        .attr('width', graphVars.width)
        .attr('height', graphVars.height)
        .attr('stroke', 'black')
        .attr('fill', 'none');

    graphVars.stepCounter = d3
        .select('.timestep')
        .append('text')
        .attr('x', '15')
        .attr('y', '15')
   
    var simulation = d3
        .forceSimulation()
        .force('link', d3.forceLink()
            .links(graphVars.activeLinks)
            .id(function(d) {return d.id;}))
        .force('charge', d3.forceManyBody().strength(graphVars.charge))
        .force('center', d3.forceCenter(graphVars.width/2, graphVars.height/2));

    buttons.makeButtons(nodes,links,graphSVG,graphVars,simulation,decodingData)

    d3.select('svg')
        .on('click', function(event) {
            if (!misc.keepSelected(event)) {
                while (graphVars.selectedNodes.length > 0) {
                    updates.removeFromSelected(graphVars.selectedNodes[0],
                        graphSVG,graphVars,simulation,decodingData);
                }
            }
            d3.selectAll('.contextMenu').remove();
        })
        .on('contextmenu', function(event) {
            var menuChoice = menuOptions.whichMenu(graphVars);
            if (menuChoice === 'q') {
                createContextMenu(event, menuOptions.qubitMenu, graphSVG, graphVars, simulation, decodingData);
            }
            else if (menuChoice === 's') {
                createContextMenu(event, menuOptions.stabMenu, graphSVG, graphVars, simulation, decodingData);
            }
            else if (menuChoice === 'g') {
                createContextMenu(event, menuOptions.genericMenu, graphSVG, graphVars, simulation, decodingData);
            }
            else {
                createContextMenu(event, menuOptions.emptyMenu, graphSVG, graphVars, simulation, decodingData);
            };
        });

    d3.select('body')
        .on('keypress', function(event) {
            if (event.keyCode == 106) {
                buttons.stepBack(graphSVG,graphVars,simulation,decodingData);
            }
            else if (event.keyCode == 107) {
                buttons.stepForward(graphSVG,graphVars,simulation,decodingData);
            };
        });
    
    graphSVG.append('text')
        .text('Loading...')
        .attr('class', 'loadingMessage')
        .attr('font-size', '48px')
        .attr('x', graphVars.width/2-graphVars.width*0.1)
        .attr('y', graphVars.height/2);
    setTimeout(function() {
        updates.buildNeighbours(nodes,links,graphVars);
        updates.buildGraph(nodes,links,graphSVG,graphVars,simulation,decodingData);
        graphSVG.select('.loadingMessage').remove();
        updates.update(graphSVG,graphVars,simulation,decodingData);
    }, 0);
}
