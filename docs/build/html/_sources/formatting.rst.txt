Formatting Files
================

Parity Check Matrices
---------------------

Parity check matrices uploaded to QEsee must be formatted as follows:

* The filetype should be .txt or .csv.
* There should be one row of the matrix per line of the file.
* Elements of each row should be separated by commas, **not** spaces, tabs, semicolons etc.
* For CSS PCMs all elements should be either (integer) 0 or 1. For non-CSS PCMs elements should be either (integer) 0 or 1/2/3, corresponding to stabilisers acting on qubits as Pauli X/Y/Z.

Examples of properly formatted PCMs for distance 3 CSS and XZZX rotated surface codes can be found at https://github.com/tRowans/qesee/tree/main/dat/ in the `qcss` and `qncss` directories respectively. 

A simple python script for converting (most) non-integer or non-comma-separated PCM files to the correct format can be found at https://github.com/tRowans/qesee/tree/main/tools/ and can be run as 

.. code-block:: console

   $ python3 to_correct_format.py [your_filename]

Error and Syndrome Data
-----------------------

The formatting rules are largely identical to the rules for PCMs described above. Explicitly:

* The filetype should be .txt or .csv.
* There should be one error/syndrome vector (corresponding to an error/syndrome configuration at a particular timestep) per line of the file.
* Elements of each row should be separated by commas.
* All elements should be either (integer) 0 or 1 for CSS codes and non-CSS code syndromes or (integer) 0 or 1/2/3 for non-CSS code errors.

For CSS codes, X error, Z error, X stabiliser syndrome and Z stabiliser syndrome data must all be stored in their own files and uploaded separately. For non-CSS codes you only need to provide one error and one syndrome file. 

As above, examples of correctly formatted error and syndrome files can be found at https://github.com/tRowans/qesee/tree/main/dat/.

Detector Error Models
---------------------

The input to the DEM drawing tool should be an explained error model from Stim. To obtain this file you can add the following code to the python file containing your Stim circuit

.. code-block::

    explained_errors = circuit.explain_detector_error_model_errors(
        reduce_to_one_representative_error=True)

    with open('exp_dem.txt', 'w') as f:
        for error in explained_errors:
            f.write(str(error))

where `circuit` is the Stim circuit object whose detector error model you would like to visualise. Note that QEsee will not work correctly if you upload a detector error model rather than an explained error model, or if you upload an explained model with `reduce_to_one_representative_error=False`

You can also upload and visualise observed detector syndromes, or corrections calculated for these syndromes. These should be formatted in the same way as above, i.e.

* The filetype should be .txt or .csv.
* There should be one syndrome or correction vector (corresponding to all detector outcomes or the corresponding correction from a particular shot) per line of the file.
* Elements of each row should be separated by commas.
* All elements should be either (integer) 0 or 1. 

Examples of correctly formatted detector error model, syndrome and correction files for five measurement rounds of a distance 3 repetition code can be found at https://github.com/tRowans/qesee/tree/main/dat/dem/.
