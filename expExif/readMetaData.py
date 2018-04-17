import PIL.Image
import PIL.ExifTags
import json
import glob
import sys
import os

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

def convertToJSON(JSONDict):
    FinalJSON = {}
    x = 0
    for fileData in JSONDict:
        FinalJSON[x] = JSONDict[fileData]
        x += 1
    jsonString = json.dumps(FinalJSON)
    return jsonString

def main():
    if(len(sys.argv) > 1):
        path = sys.argv[1]
    else:
        path = input("Please enter path to files: ")
    
    files = []

    for filename in glob.glob(os.path.join(path, '*.jpg')):
        files.append(filename)

    try:
        fileInfo = {}
        for image in files:
            fileInfo[image] = readInfo(image)
        
    except TypeError as e:
        print(e)
        print("Error: No Exif data found")

    locInfo = {}
    for exifData in fileInfo:      
        locInfo[fileInfo[exifData]['File Name']] = parseLocationInfo(fileInfo[exifData])

    timeInfo = {}
    for exifData in fileInfo:
        timeInfo[fileInfo[exifData]['File Name']] = fileInfo[exifData]['DateTime']    
    
    JSONStrings = {}
    for loc in locInfo:
        JSONStrings[loc] = wrap(locInfo[loc], timeInfo[loc], loc)

    print(convertToJSON(JSONStrings))
main()


