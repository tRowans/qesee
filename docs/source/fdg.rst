About the Force-Directed Graph
==============================

QEsee draws graphs using a *force-directed* simulation provided by the `D3.js <d3js.org>`_ library. This is a simple physics simulation in which the positions of the nodes in the graph are dictated by the following forces:

* A repulsive force between each pair of nodes.
* An attractive force between each node and the centre of the image.
* A constraint force between each pair of linked (i.e. connected by an edge in the graph) nodes which tries to maintain a certain separation between these nodes.

Additionally, the nodes are constrained to exist within the bounding box indicated by the black square around the image.

You can shrink or expand the space occupied by a graph by modifying the strength of the repulsive force between nodes (forcing them further apart or allowing them to move closer together). To do this, click the “charge” button and then enter a new value for the force strength when prompted. Negative values are repulsive and positive values are attractive, with larger values corresponding to stronger forces. There is no physical collision force between the nodes in the simulation (they are kept from overlapping only by their mutual repulsion) so it is not recommended to set the charge force to a positive number. 

Due to the nature of the simulation, the nodes of the graph will naturally try to settle into a low-energy configuration which can reveal information about the structure of the code. The simulation does not run constantly and after a few seconds of no interaction the node positions will freeze, but you can perturb the graph to continue forcing the system towards a ground state by clicking/dragging nodes or (if you have uploaded any) stepping back or forward through error/syndrome data. 

One downside of the force-directed layout is that disjoint subgraphs will repel each other and can end up squashed against opposite sides of the bounding box, especially if both contain a large number of nodes. This effect can be mitigated by reducing the charge strength, but in general it is not advisable to try and display disjoint subgraphs where the node count of one or both graphs is large.
