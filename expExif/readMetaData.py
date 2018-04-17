import PIL.Image
import PIL.ExifTags
import json
import glob
import sys
import os

#input:  The path and name of a file
#output: Dictionary containing EXIF data
#
#readInfo extracts all the EXIF data from
#a specified file and returns it within
#a dictionary 
def readInfo(filename):
    img = PIL.Image.open(filename)
    exif = {
        PIL.ExifTags.TAGS[k]: v
        for k, v in img._getexif().items()
        if k in PIL.ExifTags.TAGS
    }
    name = filename.split('/')
    exif['File Name'] = name[-1]
    return exif

#input:  Dictionary containing EXIF data
#output: List containing location data within two Dictionaries
#
#parseLocationInfo extracts the location
#data from a a dictionary conatining EXIF
#data and stores it in as a 2D array
#One for North coordinates
#and one for West coordinates
def parseLocationInfo(ExifDict):
    toReturn = []
    try:
        LocationDict = ExifDict["GPSInfo"]
        assert(LocationDict[1] == "N")
        assert(LocationDict[3] == "W")
        northArray = []
        westArray =[]
        for tup in LocationDict[2]:
            northArray.append(tup[0]/tup[1])
        for tup in LocationDict[4]:
            westArray.append(tup[0]/tup[1])
        toReturn.append(northArray)
        toReturn.append(westArray)
    except:
        print("Oopsie")
    return toReturn

#input:  There are three inputs to this function
#         locationInfo - A 2D array with location data
#         timeInfo - A string with the files time and date
#         fileName - The name of the file
#output: Dictionary containing the provided data
#
#wrap takes three inputs and stores them within a dictionary.
#this dicitionary is later going to be stored with others in
#a larger dictionary that will be converted to JSON
def wrap(locationInfo, timeInfo, fileName):    
    data = {}
    data['FileName'] = fileName
    loc = {}
    loc['NDegree'] = locationInfo[0][0]
    loc['NMin'] = locationInfo[0][1]
    loc['NSec'] = locationInfo[0][2]
    loc['WDegree'] = locationInfo[1][0]
    loc['WMin'] = locationInfo[1][1]
    loc['Wsec'] = locationInfo[1][2]
    data['LocationData'] = loc
    data['DateTime'] = timeInfo
    return data

#input:  Dictionary containing other dictionaries with specified EXIF data
#output: JSON formated string
#
#convertToJSON takes a dictionary and converts its contents
#into a JSON formated string
def convertToJSON(JSONDict):
    FinalJSON = {}
    x = 0
    for fileData in JSONDict:
        FinalJSON[x] = JSONDict[fileData]
        x += 1
    jsonString = json.dumps(FinalJSON)
    return jsonString

#input:  The absolute path to a dictionary containing JPGs
#output: JSON formated string
#
#This program parses a dictionary for JPGs. It then extracts
#the EXIF data and parses it to find the location and time
#information. Once it has this it stores it in a dictionary 
#along with the file name. This dictionary is then converted 
#into a JSON formated string to be used by another application.
def main():
    #check if an arguement was give
    if(len(sys.argv) > 1):
        path = sys.argv[1]
    else:
	#if no arguement given request a path
        path = input("Please enter path to files: ")
    
#obtain a list of JPGs from the specified directory
    files = [] 
    for filename in glob.glob(os.path.join(path, '*.jpg')):
        files.append(filename)

#Extract and store the EXIF data for each file
    try:
        fileInfo = {}
        for image in files:
            fileInfo[image] = readInfo(image)
        
    except TypeError as e:
        print(e)
        print("Error: No Exif data found")

#Extract and store location information
    locInfo = {}
    for exifData in fileInfo:      
        locInfo[fileInfo[exifData]['File Name']] = parseLocationInfo(fileInfo[exifData])

#Extract and store time information
    timeInfo = {}
    for exifData in fileInfo:
        timeInfo[fileInfo[exifData]['File Name']] = fileInfo[exifData]['DateTime']    

#Store all extracted data in a single dictionary and convert to JSON formated string
    JSONStrings = {}
    for loc in locInfo:
        JSONStrings[loc] = wrap(locInfo[loc], timeInfo[loc], loc)

    print(convertToJSON(JSONStrings))
main()


