Displaying Error and Syndrome Data
==================================

Error and syndrome data from decoding simulations can be uploaded using the buttons at the bottom of the screen. This data can be uploaded either before drawing the graph (in which case it will be automatically displayed once the graph is drawn) or afterwards (in which case you will need to click the "load data" button to update the displayed data). Error and syndrome data files must be formatted correctly (see :doc:`formatting`). 

Any combination of X error, Z error, X stabiliser syndrome and Z stabiliser syndrome data can be uploaded and viewed, but if you upload multiple files they must all have the same number of rows (corresponding to the same number of simulation timesteps to be visualised). Attempting to upload and view files with different numbers of rows will result in an error. 

Qubits with X/Y/Z errors will be drawn with a thick blue/green/red border. Stabilisers with a measurement outcome of -1 will be drawn with a thick black border. If a qubit with an X error is connected to a -1 Z stabiliser they will be linked by a thick blue edge (and similarly for Z errors and X stabilisers). X/Z colours can be swapped using the "Swap colours" button.

You can step forwards and backwards through simulation data using the arrow buttons in the bottom right of the image, or using j (back) and k (forward). This may be more convenient if you wish to fast-forward/rewind through many timesteps as you can hold down j/k to move quickly through the data. The index of the currently displayed timestep and the total number of timesteps are displayed in the top left. 
