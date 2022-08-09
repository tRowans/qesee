import {tannerGraph} from './graph.mjs';

var graphSVG = d3.select('svg');
d3.json("js/dat/sc.json").then(function(graphData) {
    var code = new tannerGraph(graphSVG,graphData.nodes,graphData.links);
});
