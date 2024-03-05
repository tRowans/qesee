Quickstart Guide
================

**Step 1: Go to** https://trowans.github.io/qesee

You will be asked what kind of graph you would like to draw (CSS Tanner graph, non-CSS Tanner graph or detector error model graph).

**Step 2: Upload files**

To view a Tanner graph you will need to upload your code's parity check matrix (or matrices). For a detector error model graph you will need to upload an explained error model from Stim. These files must be formatted correctly (see :doc:`formatting`) or the graph will not be drawn.

You do not need to provide error/syndrome data in order to view the graph.

**Step 3: Click "Draw graph"**

A loading message will be displayed while your graph is being built (this may take a while for large graphs). If you cannot see the graph and no loading message is displayed then your files are probaly not formatted correctly (see :doc:`formatting`). 

Once the graph is done loading it will appear in the middle of the screen. Colour conventions are as follows

* *CSS codes*: Qubits are displayed as black circles, X stabilisers as blue squares and Z stabilisers as red squares.
* *non-CSS codes*: Qubits are displayed as black circles and stabilisers as white squares. Blue/green/red edges between stabilisers and qubits indicate that the support of that stabiliser on that qubit is Pauli X/Y/Z.
* *Detector error models*:Error mechanisms are displayed as black circles and detectors as red squares.

You can click on nodes to select them (shift-click to select multiple nodes), click and drag them to move them around or right-click for various contextual actions depending on what you have selected (see :doc:`context` for some notes on these). Using the buttons in the top right you can:

* Use the *Reset* button to redraw the graph. This is useful if you have hidden large parts of it and want to get them back.
* Use the *Charge* button to change the node separation (see :doc:`fdg` for more). 
* Use the *Toggle IDs* button to display node IDs when you hover over them. For Tanner graphs IDs are assigned based on ordering of qubits and stabilisers in the PCMs. For detector error models error information will also be displayed when hovering over error mechanism nodes.
* Use the *Swap colours* button to swap the colours associated to Pauli X and Z if you prefer the opposite convention.
* Use the *Lock nodes* button to freeze the nodes in their current positions (see :doc:`lock` for more).
* Use the *Load data* button to load new error/syndrome data without redrawing the graph (see :doc:`data` for more).

The arrows in the bottom right will not do anything unless you upload error/syndrome data. For more on this see :doc:`data`. 
