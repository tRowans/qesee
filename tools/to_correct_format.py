import sys
import numpy as np

if len(sys.argv) != 2:
    sys.exit("Please provide path to file to be reformatted")
fpath = sys.argv[1]
try:
    x = np.loadtxt(fpath,delimiter=',')
except ValueError:
    try:
        x = np.loadtxt(fpath,delimiter=' ')
    except ValueError:
        try:
            x = np.loadtxt(fpath,delimiter=';')
        except ValueError:
            try:
                x = np.loadtxt(fpath,delimiter='\t')
            except ValueError:
                print("Unable to parse CSV file. Are you using a delimiter other than comma, space, semicolon or tab?\nIf so, you will need to change to one of these and then run this script again.\nYou can do this easily by using\n\nvim [filename]\n\nto open your CSV file and then typing\n\n:%s/[your delimiter]/,/g\n\nwhich will change all [your delimiter]s to \',\'")
                sys.exit()

np.savetxt(fpath, x, fmt='%i', delimiter=',')
