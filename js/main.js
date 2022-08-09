import {tannerGraph} from './graph.mjs';
import {processPCM} from './processPCM.mjs';

var HX;
var HZ;
var nodes;
var links;
var graphSVG = d3.select('svg');

document.getElementById('inputHX')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {HX = fr.result;}
        fr.readAsText(this.files[0]);
    });
document.getElementById('inputHZ')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {HZ = fr.result;}
        fr.readAsText(this.files[0]);
    });
document.getElementById('draw')
    .addEventListener('click', function() {
        nodes = [];
        links = [];
        const validity = processPCM(HX,HZ,nodes,links);
        if (validity === true) {
            var code = new tannerGraph(graphSVG,nodes,links);
        }
        else if (validity === false) {
            graphSVG.append('text')
                    .text('Error: X and Z parity check matrices must have the same number of columns');
        }
    });
