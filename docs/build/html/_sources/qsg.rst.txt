Quickstart Guide
================

To quickly and easily view your code's Tanner graph, follow these steps:

**Step 1: Go to** https://trowans.github.io/qesee

**Step 2: Upload your X and Z parity check matrices**

PCMs must be formatted correctly (see :doc:`formatting`) or the graph will not be drawn.

You must upload both an X and Z PCM to view the graph. If you only want to view the X/Z stabiliser subgraph then you can easily hide the unwanted check nodes later. You do not need to provide error/syndrome data in order to view the graph.

**Step 3: Click "Draw graph"**

A loading message will be displayed while your graph is being built (this may take a while for large graphs). If you cannot see the graph and no loading message is displayed then your PCMs are probaly not formatted correctly (see :doc:`formatting`). 

Once the graph is done loading it will appear in the middle of the screen. Qubits are displayed as black circles, X stabilisers as blue squares and Z stabilisers as red squares. You can click on nodes to select them (shift-click to select multiple nodes), click and drag them to move them around or right-click for various contextual actions depending on what you have selected (see :doc:`context` for some notes on these). Using the buttons in the top right you can:

* Use the *Reset* button to redraw the graph. This is useful if you have hidden large parts of it and want to get them back.
* Use the *Charge* button to change the node separation (see :doc:`fdg` for more). 
* Use the *Toggle IDs* button to display node IDs when you hover over them. IDs are assigned based on ordering of qubits and stabilisers in the PCMs.
* Use the *Swap colours* button to swap the colouring of X and Z stabilisers if you prefer the opposite convention.
* Use the *Lock nodes* button to freeze the nodes in their current positions (see :doc:`lock` for more).
* Use the *Load data* button to load new error/syndrome data without redrawing the graph (see :doc:`data` for more).

The arrows in the bottom right will not do anything unless you upload error/syndrome data. For more on this see :doc:`data`. 
