Displaying Simulation Data
==========================

Data from decoding simulations can be uploaded using the buttons at the bottom of the screen. This data can be uploaded either before drawing the graph (in which case it will be automatically displayed once the graph is drawn) or afterwards (in which case you will need to click the "load data" button to update the displayed data). Data files must be formatted correctly (see :doc:`formatting`). 

You can step forwards and backwards through simulation data using the arrow buttons in the bottom right of the image, or using j (back) and k (forward). This may be more convenient if you wish to step forwards/backwards through many steps as you can hold down j/k to move quickly through the data. The index of the currently displayed step and the total number of steps are displayed in the top left. 

Any combination of error/correction and syndrome data can be uploaded and viewed, but if you upload multiple files they must all have the same number of rows (corresponding to the same number of steps to be visualised). Attempting to upload and view files with different numbers of rows will result in an error.

**Tanner Graphs**

Qubits with X/Y/Z errors will be drawn with a thick blue/green/red border. Stabilisers with a measurement outcome of -1 will be drawn with a thick black border. Edges connecting qubits with errors to -1 stabilisers that detect these errors will be drawn as thick blue/green/red edges depending on whether the stabiliser acts on the qubit as Pauli X/Y/Z. For non-CSS codes the colours used to draw these edges are brighter than the colours used to draw edges in the error free case.

**Detector Graphs**

Detectors which detect errors will be drawn with a thick black border. Error mechanisms identified as the cause of these syndromes by the decoder will be drawn with a thick red border and connected to corresponding detectors by thick red edges. 

When *Toggle IDs* is turned on, hovering over error mechanism nodes will show information about this error. The information has the following format

e **i** = **P_1jP_2k...** from [**MECHANISM(p) a, b,...**] at t = **T**

where 

* **i** is the index of the error mechanism. This is based on the ordering of error mechanisms in the uploaded error model file, which in turn should be based on the ordering of error mechanisms assigned by Stim (unless you have obtained this file in some strange way). 
* **P_1jP_2k...** is a representative Pauli operator for the error mechanism, with **P_m** = X/Y/Z and **j**, **k**, etc the indices of the qubits these operators act on.
* **MECHANISM(p) a, b,...** is the Stim error mechanism (X_ERROR, DEPOLARISE1, etc) responsible for the error, acting on qubits **a, b,...** with probability **p**.
* **T** is the TICK at which the error mechanism occurs.
