import {tannerGraph} from './graph.js';
import {processData} from './process.js';
import {parse} from './lib/index.js';

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
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {HX = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else HX = undefined;
    });
document.getElementById('inputHZ')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {HZ = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else HZ = undefined;
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
        const nsteps = processData(nodes,links,HX,HZ,errorX,errorZ,syndromeX,syndromeZ);
        if (nsteps !== -1) {
            var code = new tannerGraph(graphSVG,nodes,links,
                        errorX,errorZ,syndromeX,syndromeZ,nsteps);
        }
    });

document.getElementById('download')
    .addEventListener('click', async function() {
        var svg = document.getElementById("svg");
        var source = '<svg xmlns="http://www.w3.org/2000/svg" width="' + svg.getAttribute('width') + '" height="' + svg.getAttribute('height') + '">';
        var serializer = new XMLSerializer();
        var linkList = svg.childNodes[0].childNodes;
        for (var i=0; i<linkList.length; ++i) {
            var linkSource = serializer.serializeToString(linkList[i]);
            linkSource = linkSource.replace(/line\sxmlns="http\:\/\/www\.w3\.org\/2000\/svg"/, 'line');
            var styleDef = window.getComputedStyle(linkList[i]);
            var linkStyles = '';
            if (linkSource.match(/noErr/)) {
                linkStyles = linkStyles + ' stroke="gray"';
            }
            else {
                linkStyles = linkStyles + ' stroke="' + styleDef['stroke'] + '"';
            }
            linkStyles = (linkStyles + ' stroke-opacity="' + styleDef['stroke-opacity'] + '"'
                                     + ' stroke-width="' + styleDef['stroke-width'] + '"');
            linkSource = linkSource.replace(/\/>/, linkStyles + '/>');
            source = source + linkSource;
        }
        var nodeList = svg.childNodes[1].childNodes;
        for (var i=0; i<nodeList.length; ++i) {
            var nodeSource = serializer.serializeToString(nodeList[i]);
            nodeSource = nodeSource.replace(/rect\sxmlns="http\:\/\/www\.w3\.org\/2000\/svg"/, 'rect');
            var styleDef = window.getComputedStyle(nodeList[i]);
            var nodeStyles = '';
            var nodeStyles = (' stroke="' + styleDef['stroke']  + '"'
                            + ' stroke-width="' + styleDef['stroke-width'] + '"'
                            + ' fill="' + styleDef['fill']) + '"';
            nodeSource = nodeSource.replace(/\/>/, nodeStyles + '/>');
            source = source + nodeSource;
        }
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source + '</svg>';
        var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph';
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a)
    });
