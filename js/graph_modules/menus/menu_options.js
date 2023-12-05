import * as menuFunctions from './menu_functions.js';

export function whichMenu(graphVars) {
    var qubitSelected = false;
    var stabSelected = false;
    for (var i=0; i<graphVars.selectedNodes.length; i++) {
        if (graphVars.selectedNodes[i][0] === 'q') {
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

export var qubitMenu = [
    {
        label: 'Hide selection',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.hideSelection(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Restrict to selection',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToSelection(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Restrict to X neighbourhood',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToNeighbourhood(graphSVG, graphVars, simulation, decodingData, 'x');}
    },
    {
        label: 'Restrict to Z neighbourhood',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToNeighbourhood(graphSVG, graphVars, simulation, decodingData, 'z');}
    },
    {
        label: 'Restrict to neighbourhood',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Select all X neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectNeighbourhood(graphSVG, graphVars, simulation, decodingData, 'x');}
    },
    {
        label: 'Select all Z neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectNeighbourhood(graphSVG, graphVars, simulation, decodingData, 'z');}
    },
    {
        label: 'Select all neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Select connected component',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectComponent(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Display all X neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.displayNeighbourhood(graphSVG, graphVars, simulation, decodingData, 'x');}
    },
    {
        label: 'Display all Z neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.displayNeighbourhood(graphSVG, graphVars, simulation, decodingData, 'z');}
    },
    {
        label: 'Display all neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.displayNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    }
];

export var stabMenu = [
    {
        label: 'Hide selection',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.hideSelection(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Restrict to selection',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToSelection(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Restrict to support',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Display full support',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.displayNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Select neighbourhood',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Select connected component',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectComponent(graphSVG, graphVars, simulation, decodingData);}
    }
];

export var genericMenu = [
    {
        label: 'Hide qubits',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.hideSelection(graphSVG, graphVars, simulation, decodingData,'q');}
    },
    {
        label: 'Hide X stabilisers',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.hideSelection(graphSVG, graphVars, simulation, decodingData,'x');}
    },
    {
        label: 'Hide Z stabilisers',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.hideSelection(graphSVG, graphVars, simulation, decodingData,'z');}
    },
    {
        label: 'Hide selection',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.hideSelection(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Restrict to selection',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToSelection(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Restrict to neighbourhood',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.restrictToNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Display all neighbours',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.displayNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Select neighbourhood',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectNeighbourhood(graphSVG, graphVars, simulation, decodingData);}
    },
    {
        label: 'Select connected component',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectComponent(graphSVG, graphVars, simulation, decodingData);}
    }
];

export var emptyMenu = [
    {
        label: 'Select all qubits',
        action: function(graphSVG,graphVars,simulation,decodingData) {
            menuFunctions.selectEvery(graphSVG,graphVars,simulation,decodingData,'q');}
    },
    {
        label: 'Select all X error qubits',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectEvery(graphSVG, graphVars, simulation, decodingData,'qx');}
    },
    {
        label: 'Select all Z error qubits',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectEvery(graphSVG, graphVars, simulation, decodingData,'qz');}
    },
    {
        label: 'Select all Y error qubits',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectEvery(graphSVG, graphVars, simulation, decodingData,'qy');}
    },
    {
        label: 'Select all X stabilisers',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectEvery(graphSVG, graphVars, simulation, decodingData,'x');}
    },
    {
        label: 'Select all Z stabilisers',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectEvery(graphSVG, graphVars, simulation, decodingData,'z');}
    },
    {
        label: 'Select everything',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectEvery(graphSVG, graphVars, simulation, decodingData,'');}
    },
    {
        label: 'Select all pendant nodes',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectByDegree(graphSVG, graphVars, simulation, decodingData,1);}
    },
    {
        label: 'Select all isolated nodes',
        action: function(graphSVG, graphVars, simulation, decodingData) {
            menuFunctions.selectByDegree(graphSVG, graphVars, simulation, decodingData,0);}
    }
]
