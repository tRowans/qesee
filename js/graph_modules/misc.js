export function displayNodeInfo(event, d, graphVars) {
    if (graphVars.displayIDs) {
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

export function makeEmptyArrays(decodingData, nodes, links) {
    if (decodingData.errorX === undefined) {
        decodingData.errorX = [];
        for (var i=0; i<(nSteps+1); i++) {
            decodingData.errorX.push([]);
            for (var j=0; j<nodes.length; j++) {
                decodingData.errorX[i].push('0');
            }
        }
    }

    if (decodingData.errorZ === undefined) {
        decodingData.errorZ = [];
        for (var i=0; i<(nSteps+1); i++) {
            decodingData.errorZ.push([]);
            for (var j=0; j<nodes.length; j++) {
                decodingData.errorZ[i].push('0');
            }
        }
    }
        
    if (decodingData.syndromeX === undefined) {
        decodingData.syndromeX = [];
        for (var i=0; i<(nSteps+1); i++) {
            decodingData.syndromeX.push([]);
            for (var j=0; j<nodes.length; j++) {
                decodingData.syndromeX[i].push('0');
            }
        }
    }
       
    if (decodingData.syndromeZ === undefined) {
        decodingData.syndromeZ = [];
        for (var i=0; i<(nSteps+1); i++) {
            decodingData.syndromeZ.push([]);
            for (var j=0; j<nodes.length; j++) {
                decodingData.syndromeZ[i].push('0');
            }
        }
    }
}
