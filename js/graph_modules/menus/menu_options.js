import * as menuFunctions from './menu_functions.js';

export function whichMenu(graphBundle) {
    var qubitSelected = false;
    var stabSelected = false;
    for (var i=0; i<graphBundle.selectedNodes.length; i++) {
        if (graphBundle.selectedNodes[i][0] === 'q') {
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
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle);}
    },
    {
        label: 'Restrict to selection',
        action: function(graphBundle) {
            menuFunctions.restrictToSelection(graphBundle);}
    },
    {
        label: 'Restrict to X neighbourhood',
        action: function(graphBundle) {
            menuFunctions.restrictToNeighbourhood(graphBundle,'x');}
    },
    {
        label: 'Restrict to Z neighbourhood',
        action: function(graphBundle) {
            menuFunctions.restrictToNeighbourhood(graphBundle,'z');}
    },
    {
        label: 'Restrict to neighbourhood',
        action: function(graphBundle) {
            menuFunctions.restrictToNeighbourhood(graphBundle);}
    },
    {
        label: 'Select all X neighbours',
        action: function(graphBundle) {
            menuFunctions.selectNeighbourhood(graphBundle,'x');}
    },
    {
        label: 'Select all Z neighbours',
        action: function(graphBundle) {
            menuFunctions.selectNeighbourhood(graphBundle,'z');}
    },
    {
        label: 'Select all neighbours',
        action: function(graphBundle) {
            menuFunctions.selectNeighbourhood(graphBundle);}
    },
    {
        label: 'Select connected component',
        action: function(graphBundle) {
            menuFunctions.selectComponent(graphBundle);}
    },
    {
        label: 'Display all X neighbours',
        action: function(graphBundle) {
            menuFunctions.displayNeighbourhood(graphBundle,'x');}
    },
    {
        label: 'Display all Z neighbours',
        action: function(graphBundle) {
            menuFunctions.displayNeighbourhood(graphBundle,'z');}
    },
    {
        label: 'Display all neighbours',
        action: function(graphBundle) {
            menuFunctions.displayNeighbourhood(graphBundle);}
    }
];

export var stabMenu = [
    {
        label: 'Hide selection',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle);}
    },
    {
        label: 'Restrict to selection',
        action: function(graphBundle) {
            menuFunctions.restrictToSelection(graphBundle);}
    },
    {
        label: 'Restrict to support',
        action: function(graphBundle) {
            menuFunctions.restrictToNeighbourhood(graphBundle);}
    },
    {
        label: 'Display full support',
        action: function(graphBundle) {
            menuFunctions.displayNeighbourhood(graphBundle);}
    },
    {
        label: 'Select neighbourhood',
        action: function(graphBundle) {
            menuFunctions.selectNeighbourhood(graphBundle);}
    },
    {
        label: 'Select connected component',
        action: function(graphBundle) {
            menuFunctions.selectComponent(graphBundle);}
    }
];

export var genericMenu = [
    {
        label: 'Hide qubits',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle,'q');}
    },
    {
        label: 'Hide X stabilisers',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle,'x');}
    },
    {
        label: 'Hide Z stabilisers',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle,'z');}
    },
    {
        label: 'Hide selection',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle);}
    },
    {
        label: 'Restrict to selection',
        action: function(graphBundle) {
            menuFunctions.restrictToSelection(graphBundle);}
    },
    {
        label: 'Restrict to neighbourhood',
        action: function(graphBundle) {
            menuFunctions.restrictToNeighbourhood(graphBundle);}
    },
    {
        label: 'Display all neighbours',
        action: function(graphBundle) {
            menuFunctions.displayNeighbourhood(graphBundle);}
    },
    {
        label: 'Select neighbourhood',
        action: function(graphBundle) {
            menuFunctions.selectNeighbourhood(graphBundle);}
    },
    {
        label: 'Select connected component',
        action: function(graphBundle) {
            menuFunctions.selectComponent(graphBundle);}
    }
];

export var emptyMenu = [
    {
        label: 'Select all qubits',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'q');}
    },
    {
        label: 'Select all X error qubits',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'qx');}
    },
    {
        label: 'Select all Z error qubits',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'qz');}
    },
    {
        label: 'Select all Y error qubits',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'qy');}
    },
    {
        label: 'Select all X stabilisers',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'x');}
    },
    {
        label: 'Select all Z stabilisers',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'z');}
    },
    {
        label: 'Select everything',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'');}
    },
    {
        label: 'Select all pendant nodes',
        action: function(graphBundle) {
            menuFunctions.selectByDegree(graphBundle,1);}
    },
    {
        label: 'Select all isolated nodes',
        action: function(graphBundle) {
            menuFunctions.selectByDegree(graphBundle,0);}
    }
]
