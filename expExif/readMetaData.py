import PIL.Image
import PIL.ExifTags
import csv

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

def main():
    filename = "random.jpg"
    #filename = input("Please enter a filename: ")
    try:
        fileInfo = readInfo(filename)
    except TypeError as e:
        print(e)
        print("Error: No Exif data found")
    print(parseLocationInfo(fileInfo))

main()


