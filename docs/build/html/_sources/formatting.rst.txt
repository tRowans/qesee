Formatting Files
================

Parity Check Matrices
---------------------

Parity check matrices uploaded to QEsee must be formatted as follows:

* The filetype should be .txt or .csv.
* There should be one row of the matrix per line of the file.
* Elements of each row should be separated by commas, **not** spaces, tabs, semicolons etc.
* All elements should be either (integer) 0 or 1.

Examples of properly formatted PCMs for a distance 3 surface code can be found at https://github.com/tRowans/qesee/tree/main/dat/. 

A simple python script for converting (most) non-integer or non-comma-separated PCM files to the correct format can be found at https://github.com/tRowans/qesee/tree/main/tools/ and can be run as 

.. code-block:: console

   $ python3 to_correct_format.py [your_filename]

Error and Syndrome Data
-----------------------

X error, Z error, X stabiliser syndrome and Z stabiliser syndrome data must all be stored in their own files and uploaded separately. The formatting rules are largely identical to the rules for PCMs described above. Explicitly:

* The filetype should be .txt or .csv.
* There should be one error/syndrome vector (corresponding to an error/syndrome configuration at a particular timestep) per line of the file.
* Elements of each row should be separated by commas.
* All elements should be either (integer) 0 or 1.

As above, examples of correctly formatted error and syndrome files can be found at https://github.com/tRowans/qesee/tree/main/dat.
