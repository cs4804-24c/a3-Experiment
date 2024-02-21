# -*- coding: utf-8 -*-
"""
Created on Fri Feb 16 09:06:48 2024

File used to take generated data and reformat it for proper usage as a .json 
file

@author: samda
"""

import jurassic_graph as jg
import json


file = "datasaurus_data.json"


with open(file, 'r') as openfile:
    json_data = json.load(openfile)

#list of x and y lists
x_list = json_data[0]
y_list = json_data[1]

#--------- Section added to convert dinosaurus
graph = {
    "x": x_list,
    "y": y_list,
    }
#---------

'''
#where output will be built
outputList = []

#runs for each pair of xy lists (graphs)
for i in range(len(x_list)):
    quadrantList = []
    
    #gets list of x and y coords for this particualr graph
    x = x_list[i]
    y = y_list[i]
    
    #builds quadrant list, finding quadrant associated with each xy pair
    for j in range(len(x)):
        quadrantList.append(jg.quadrant_check(x[j], y[j]))
        
    graph = {
        "x": x,
        "y": y,
        "quadrant": quadrantList
        }
    
    outputList.append(graph)
'''

#graph replaced outputList to convert dionosaurus data
json_object = json.dumps(graph)

with open("reformated_dino_data.json", "w") as outfile:
    outfile.write(json_object)