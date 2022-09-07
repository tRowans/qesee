export function processPCM(HX,HZ,nodes,links) {
    if (HX[0].length !== HX[1].length) return false;
    
    for (var i=0; i<HX.length; i++) {
        var stab = {'id': 'x'+i};
        nodes.push(stab);
        for (var j=0; j<HX[i].length; j++) {
            if (i === 0) {
                var qubit = {'id': 'q'+j};
                nodes.push(qubit);
            }
            if (HX[i][j] === '1') {
                var link = {'source': 'x'+i, 'target': 'q'+j};
                links.push(link);
            }
        }
    }
    for (var i=0; i<HZ.length; i++) {
        var stab = {'id': 'z'+i};
        nodes.push(stab);
        for (var j=0; j<HZ[i].length; j++) {
            if (HZ[i][j] === '1') {
                var link = {'source': 'z'+i, 'target': 'q'+j};
                links.push(link);
            }
        }
    }

    return true;
}
