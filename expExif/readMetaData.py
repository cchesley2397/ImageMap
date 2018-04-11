import PIL.Image
import PIL.ExifTags
import json

def readInfo(filename):
    img = PIL.Image.open(filename)
    exif = {
        PIL.ExifTags.TAGS[k]: v
        for k, v in img._getexif().items()
        if k in PIL.ExifTags.TAGS
    }
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

def convertToJSON(locationInfo):
    loc = {}
    loc['NDegree'] = locationInfo[0][0]
    loc['NMin'] = locationInfo[0][1]
    loc['NSec'] = locationInfo[0][2]
    loc['WDegree'] = locationInfo[1][0]
    loc['WMin'] = locationInfo[1][1]
    loc['Wsec'] = locationInfo[1][2]
    jsonString = json.dumps(loc)
    return jsonString

def main():
    filename = "random.jpg"
    #filename = input("Please enter a filename: ")
    try:
        fileInfo = readInfo(filename)
    except TypeError as e:
        print(e)
        print("Error: No Exif data found")
    locInfo = parseLocationInfo(fileInfo)
    print(convertToJSON(locInfo))

main()


