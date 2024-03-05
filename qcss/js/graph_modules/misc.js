export function displayNodeInfo(event, d, graphBundle) {
    if (graphBundle.displayIDs) {
        const id = d.id;
        var infoPopup = d3
            .select('svg')
            .append('g')
            .attr('class', 'infoPopup');

        infoPopup
            .append('rect')
            .attr('class', 'infoPopup')
            .attr('x', event.pageX)
            .attr('y', event.pageY)
            .attr('width', function() {
                return 10 + 10*(id.length) + 5;
            })
            .attr('height', '30')
            .attr('fill', 'white');

        infoPopup
            .append('text')
            .attr('class', 'infoPopup')
            .attr('x', function() {
                return event.pageX + 10;
            })
            .attr('y', function() {
                return event.pageY + 20;
            })
            .text(id);
    }
}

export function keepSelected(event) {
    if (event.target.nodeName === 'rect') {
        return true;
    }
    else if (event.shiftKey) {
        return true;
    }
    else if (d3.select(event.target).attr('class') === 'contextMenuItem') {
        return true;
    }
}

export function makeEmptyArrays(graphBundle) {
    if (graphBundle.errorX === undefined) {
        graphBundle.errorX = [];
        for (var i=0; i<(graphBundle.nSteps+1); i++) {
            graphBundle.errorX.push([]);
            for (var j=0; j<graphBundle.nodes.length; j++) {
                graphBundle.errorX[i].push('0');
            }
        }
    }

    if (graphBundle.errorZ === undefined) {
        graphBundle.errorZ = [];
        for (var i=0; i<(graphBundle.nSteps+1); i++) {
            graphBundle.errorZ.push([]);
            for (var j=0; j<graphBundle.nodes.length; j++) {
                graphBundle.errorZ[i].push('0');
            }
        }
    }
        
    if (graphBundle.syndromeX === undefined) {
        graphBundle.syndromeX = [];
        for (var i=0; i<(graphBundle.nSteps+1); i++) {
            graphBundle.syndromeX.push([]);
            for (var j=0; j<graphBundle.nodes.length; j++) {
                graphBundle.syndromeX[i].push('0');
            }
        }
    }
       
    if (graphBundle.syndromeZ === undefined) {
        graphBundle.syndromeZ = [];
        for (var i=0; i<(graphBundle.nSteps+1); i++) {
            graphBundle.syndromeZ.push([]);
            for (var j=0; j<graphBundle.nodes.length; j++) {
                graphBundle.syndromeZ[i].push('0');
            }
        }
    }
}
