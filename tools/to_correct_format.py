import sys
import numpy as np

if len(sys.argv) != 2:
    sys.exit("Invalid number of arguments. Please provide a path to the file to be converted")
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
                print("Unable to parse CSV file. Are you using a delimiter other than comma, space, semicolon or tab?\nIf so, you will need to change to one of these and then run this script again.\nYou can do this easily by typing\n\nsed 's/[your_delimiter]/,/g' [your_filename] > [your_new_filename]\n\nwhere [your_filename] and [your_new_filename] MUST BE DIFFERENT or the contents of your file may be deleted.\n[your_new_filename] will contain the same contents as [your_filename]\nbut with all instances of [your_delimiter] replaced with ','.\n\nIf you would like to overwrite the contents of your original file you can do this with\n\nsed -i 's/[your_delimiter]/,/g' [your_filename]\n\non linux or\n\nsed -i '' 's/[your_delimiter]/,/g' [your_filename]\n\non macOS.")
                sys.exit()

np.savetxt("formatted_"+fpath, x, fmt='%i', delimiter=',')
