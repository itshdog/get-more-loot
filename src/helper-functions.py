def loadFile():
    f = open("adjectives.txt", "r")
    output = []
    for line in f:
        if line != "" and line != "\n":
            output.append(line.replace("\n", ''))
    print(output)

def capList(items):
    for i in range(len(items)):
        items[i] = items[i].capitalize()
    print(items)
        

