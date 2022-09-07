import {tannerGraph} from './graph.mjs';
import {processPCM} from './processPCM.mjs';
import {parse} from './lib/csv/index.js';

var HX;
var HZ;
var error;
var syndrome;
var nodes;
var links;
var graphSVG = d3.select('svg');

document.getElementById('inputHX')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {HX = parse(fr.result);}
        fr.readAsText(this.files[0]);
    });
document.getElementById('inputHZ')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {HZ = parse(fr.result);}
        fr.readAsText(this.files[0]);
    });
document.getElementById('inputError')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {error = parse(fr.result);}
        fr.readAsText(this.files[0]);
    });
document.getElementById('inputSyndrome')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {syndrome = parse(fr.result);}
        fr.readAsText(this.files[0]);
    }); 
document.getElementById('draw')
    .addEventListener('click', async function() {
        nodes = [];
        links = [];
        const validity = processPCM(HX,HZ,nodes,links);
        if (validity === true) {
            var code = new tannerGraph(graphSVG,nodes,links,error,syndrome);
        }
        else if (validity === false) {
            graphSVG.append('text')
                    .text('Error: X and Z parity check matrices must have the same number of columns');
        }
    });
