function menuFactory(openMenu, menuItems, graphSVG, graphVars, simulation, decodingData) {
    d3.select('svg').selectAll('.contextMenu').remove();

    var menu = d3
        .select('svg')
        .append('g')
        .attr('class', 'contextMenu');

    var menuItem = menu
        .selectAll('g')
        .data(menuItems)
        .enter()
        .append('g')
        .attr('class', 'contextMenuItem');

    menuItem
        .append('rect')
        .attr('class', 'contextMenuItem')
        .attr('x', openMenu.pageX)
        .attr('y', function(d, i) {
            return openMenu.pageY + i*30;
        })
        .attr('width', '200')
        .attr('height', '30')
        .attr('stroke', 'black')
        .attr('fill', 'white')
        .on('mouseover', function() {
            d3.select(this)
                .attr('fill', '#F8F0E3');
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('fill', 'white');
        });

    menuItem
        .append('text')
        .attr('class', 'contextMenuItem')
        .attr('x', function(d, i) {
            return openMenu.pageX + 10;
        })
        .attr('y', function(d, i) {
            return openMenu.pageY + i*30 + 20;
        })
        .attr('pointer-events', 'none')
        .text(function(d) {return d.label;});

    menuItem.on('click', function() {
        d3.select(this).data()[0].action(graphSVG,graphVars,simulation,decodingData);
    });
}

export function createContextMenu(openMenu, menuItems, graphSVG, graphVars, simulation, decodingData) {
    menuFactory(openMenu, menuItems, graphSVG, graphVars, simulation, decodingData);
    openMenu.preventDefault();
}
