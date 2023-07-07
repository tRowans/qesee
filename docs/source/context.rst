Context Menu Notes
==================

Aside from dragging nodes around, most interaction with the graphs drawn by QEsee is done via context menus (opened with right-click). The options in these menus are designed to be simple and intuitive and should not require much explanation, but some clarification of possibly unclear points is provided here just in case.

When using "select all..." options only *visible* nodes will be selected, so e.g. "select all X stabilisers" will not select hidden X stabilisers. This is generally true for all selection functions as hidden nodes do not exist as objects in the simulation and are not simply invisible. 

With nothing selected you have the option to "select all pendant nodes" and "select all isolated nodes", which select all nodes with degree 1 and 0 respectively. These are useful for cleaning up the graph after showing/hiding a new set of nodes. 

"Restrict to selection" hides everything except selected nodes. "Restrict to (X/Z) neighbourhood" hides everything except selected nodes and (X/Z) nodes connected to selected nodes. 

"Display all (X/Z) neighbours" unhides all (X/Z) nodes connected to the selection. If these nodes are already all visible it does nothing.
