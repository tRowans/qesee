import {tannerGraph} from './graph.mjs';
import {processPCM} from './process.mjs';
import {checkSteps} from './process.mjs';
import {parse} from './lib/csv/index.js';

var HX;
var HZ;
var errorX;
var errorZ;
var syndromeX;
var syndromeZ;
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
document.getElementById('inputXError')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {errorX = parse(fr.result);}
        fr.readAsText(this.files[0]);
    });
document.getElementById('inputZError')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {errorZ = parse(fr.result);}
        fr.readAsText(this.files[0]);
    });
document.getElementById('inputXSyndrome')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {syndromeX = parse(fr.result);}
        fr.readAsText(this.files[0]);
    }); 
document.getElementById('inputZSyndrome')
    .addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {syndromeZ = parse(fr.result);}
        fr.readAsText(this.files[0]);
    }); 
document.getElementById('draw')
    .addEventListener('click', async function() {
        nodes = [];
        links = [];
        const validity = processPCM(HX,HZ,nodes,links);
        const nsteps = checkSteps(errorX,errorZ,syndromeX,syndromeZ);
        if (validity && (nsteps !== -1)) {
            var code = new tannerGraph(graphSVG,nodes,links,
                        errorX,errorZ,syndromeX,syndromeZ,nsteps);
        }
        else {
            var errorMsg = 'Error:'; 
            if (!validity) {
                errorMsg = errorMsg + 'X and Z parity check matrices must have the same number of columns';
            }
            if (equalSteps === -1) {
                errorMsg = errorMsg + 'error/syndrome data must have a consistent number of timesteps'
            }
            graphSVG.append('text')
                .text(errorMsg);
        }
    });
