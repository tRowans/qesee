import {makeGraphBundle,interactiveGraph} from './graph.js';
import {processDEM,processData,checkValidity} from './process.js';
import {parse} from './lib/index.js';
        
document.getElementById('inputDEM')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {window.DEM = fr.result;}
            fr.readAsText(this.files[0]);
        }
        else window.DEM = undefined;
    });
document.getElementById('inputSyndrome')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {window.syndrome = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else window.syndrome = undefined;
    });
document.getElementById('inputCorrection')
    .addEventListener('change', function() {
        if (this.files.length) {
            var fr = new FileReader();
            fr.onload = function() {window.correction = parse(fr.result);}
            fr.readAsText(this.files[0]);
        }
        else window.correction = undefined;
    });
document.getElementById('draw')
    .addEventListener('click', async function() {
        var graphBundle = makeGraphBundle(d3.select('svg'));
        var demMap = [];
        var detectorShift = 0;
        ({demMap, detectorShift} = processDEM(window.DEM.split('\n'),demMap,detectorShift));
        var valid = processData(graphBundle,demMap);
        window.nSteps = checkValidity(demMap,window.syndrome,window.correction);
        if (valid && nSteps !== -1) {
            var code = new interactiveGraph(graphBundle);
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
                linkStyles = linkStyles + ' stroke="black"';
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
