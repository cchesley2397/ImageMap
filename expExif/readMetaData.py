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
    toReturn = ""
    try:
        LocationDict = ExifDict["GPSInfo"]
    except:
        pass #Cry
    return toReturn

def main():
    filename = "random.jpg"
    #filename = input("Please enter a filename: ")
    try:
        fileInfo = readInfo(filename)
    except TypeError as e:
        print(e)
        print("Error: No Exif data found")
    for key in fileInfo:
        print(str(key) + ": " + str(fileInfo[key]))

main()


