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
    if (graphBundle.error === undefined) {
        graphBundle.error = [];
        for (var i=0; i<(graphBundle.nSteps+1); i++) {
            graphBundle.error.push([]);
            for (var j=0; j<graphBundle.nodes.length; j++) {
                graphBundle.error[i].push('0');
            }
        }
    }
    if (graphBundle.syndrome === undefined) {
        graphBundle.syndrome = [];
        for (var i=0; i<(graphBundle.nSteps+1); i++) {
            graphBundle.syndrome.push([]);
            for (var j=0; j<graphBundle.nodes.length; j++) {
                graphBundle.syndrome[i].push('0');
            }
        }
    }
}
