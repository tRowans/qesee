Known Issues and Future Features
================================

**Disclaimer: These things may eventually be included or they may not. No promises**

* Support for large codes: QEsee crashes when attempting to draw graphs larger than ~1000 nodes. I'm not sure if this is a limitation of QEsee's code or of D3 (see :doc:`fdg`), but if it is the latter then there may not be much that can be done. One option in this case would be to allow the drawing of only parts of the graph, so e.g. you could be given the option to draw only qubits with errors and their neighbourhoods, which would keep the number of nodes in the simulation to a more managable level. 

* Support for more error types: Displaying qubit erasures on the graph should be very easy (relevant qubits can just be greyed-out). For coherent errors the affected qubits could be highlighted, but whether this is useful or not is a different question. 

* Support for customising downloaded image: It would be nice to be able to choose node/link colours, styles, etc when downloading the graph as an SVG. 

You can open an issue on github if you have issues to report or features to suggest. 

QEsee is open-source, so if you would like to contribute to its development please feel free to do so, either by developing your own features/changes and opening a pull request or by getting in contact with me directly at thomas.scruby@oist.jp
