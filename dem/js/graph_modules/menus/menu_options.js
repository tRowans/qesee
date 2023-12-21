import * as menuFunctions from './menu_functions.js';

export function whichMenu(graphBundle) {
    var errorSelected = false;
    var detectorSelected = false;
    for (var i=0; i<graphBundle.selectedNodes.length; i++) {
        if (graphBundle.selectedNodes[i][0] === 'e') {
            errorSelected = true;
        }
        else {detectorSelected = true;}
    }
    if (errorSelected ^ detectorSelected) {
        return 'o'; // = one node type
    }
    else if (errorSelected && detectorSelected) {
        return 't'; // = two node types
    }
    else return 'e'; // = empty
}

export var oneTypeMenu = [
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
        label: 'Display full neighbourhood',
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

export var twoTypesMenu = [
    {
        label: 'Hide errors',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle,'e');}
    },
    {
        label: 'Hide detectors',
        action: function(graphBundle) {
            menuFunctions.hideSelection(graphBundle,'d');}
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
        label: 'Select all errors',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'e');}
    },
    {
        label: 'Select correction',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'e1');}
    },
    {
        label: 'Select all detectors',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'d');}
    },
    {
        label: 'Select all active detectors',
        action: function(graphBundle) {
            menuFunctions.selectEvery(graphBundle,'d1');}
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
