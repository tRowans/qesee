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
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {errorX = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else errorX = undefined;
    });
document.getElementById('inputZError')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {errorZ = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else errorZ = undefined;
    });
document.getElementById('inputXSyndrome')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {syndromeX = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else syndromeX = undefined;
    }); 
document.getElementById('inputZSyndrome')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {syndromeZ = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else syndromeZ = undefined;
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
            var errorMsg = '\n';
            if (!validity) {
                errorMsg = errorMsg + 'Error: X and Z parity check matrices must have the same number of columns\n';
            }
            if (nsteps === -1) {
                errorMsg = errorMsg + 'Error: error/syndrome data must have a consistent number of timesteps\n'
            }
            alert(errorMsg);
        }
    });

document.getElementById('download')
    .addEventListener('click', async function() {
        var svg = document.getElementById("svg");
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        console.log(source);
        const graphEnd = /<g\sclass="buttons"/.exec(source);
        source = source.substr(0,graphEnd.index) + '</svg>';
        console.log(source);
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph';
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a)
    });
