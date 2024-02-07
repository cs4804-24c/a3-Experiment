# -*- coding: utf-8 -*-
"""
Created on Wed Feb  7 08:49:57 2024

Code for generating data for Jarassic Mark experiment and producing it
as a .json file.

@author: samda
"""
import numpy.random as random
import json
import pandas as pd
import statistics


'''
#For normalization of datasaurus

df = pd.read_csv("Datasaurus_data.csv", header=None)
df.values.tolist()

x_data = df[0]
y_data = df[1]

x_mean = 0
y_mean = 0

for x in x_data:
    x_mean += x
x_mean = x_mean / len(x_data)

for y in y_data:
    y_mean += y
y_mean = y_mean / len(y_data)

x_stdev = statistics.stdev(x_data, x_mean)
y_stdev = statistics.stdev(y_data, y_mean)

adjusted_x = []
adjusted_y = []

for i in range(142):
    adjusted_x.append((x_data[i] - x_mean) / x_stdev) 
    adjusted_y.append((y_data[i] - y_mean) / y_stdev)
'''

#for generation of other graphs
x_collated = []
y_collated = []

#index for random, increments each repeat of the while loop
r = 0

#Margin of deviation from distribution of ~N(0,1) allowed in x,y means and stdev
#Must be positive
x_margin = 0.02
y_margin = 0.02

#Continues until 50 valid graphs have been generated
while len(x_collated) < 50:
    random.seed(r)
    r += 1


    #quadrant 1 - 30 data points
    x_distribution_1 = random.normal(loc=0.0, scale=1.0, size=30)
    y_distribution_1 = random.normal(loc=0.0, scale=1.0, size=30)

    x_dist_1 = x_distribution_1.tolist()
    y_dist_1 = y_distribution_1.tolist()

    for i in range(len(x_dist_1)):
        x_dist_1[i] = abs(x_dist_1[i])
        y_dist_1[i] = abs(y_dist_1[i])


    #quadrant 2 - 37 data points
    x_distribution_2 = random.normal(loc=0.0, scale=1.0, size=37)
    y_distribution_2 = random.normal(loc=0.0, scale=1.0, size=37)

    x_dist_2 = x_distribution_2.tolist()
    y_dist_2 = y_distribution_2.tolist()

    for i in range(len(x_dist_2)):
        x_dist_2[i] = -abs(x_dist_2[i])
        y_dist_2[i] = abs(y_dist_2[i])


    #quadrant 3 - 38 data points
    x_distribution_3 = random.normal(loc=0.0, scale=1.0, size=38)
    y_distribution_3 = random.normal(loc=0.0, scale=1.0, size=38)

    x_dist_3 = x_distribution_3.tolist()
    y_dist_3 = y_distribution_3.tolist()

    for i in range(len(x_dist_3)):
        x_dist_3[i] = -abs(x_dist_3[i])
        y_dist_3[i] = -abs(y_dist_3[i])


    #quadrant 4 - 37 data points
    x_distribution_4 = random.normal(loc=0.0, scale=1.0, size=37)
    y_distribution_4 = random.normal(loc=0.0, scale=1.0, size=37)

    x_dist_4 = x_distribution_4.tolist()
    y_dist_4 = y_distribution_4.tolist()

    for i in range(len(x_dist_4)):
        x_dist_4[i] = abs(x_dist_4[i])
        y_dist_4[i] = -abs(y_dist_4[i])

    x_data = x_dist_1 + x_dist_2 + x_dist_3 + x_dist_4
    y_data = y_dist_1 + y_dist_2 + y_dist_3 + y_dist_4


    #Calculate statics of generated data points
    x_mean = 0
    y_mean = 0

    for x in x_data:
        x_mean += x
    x_mean = x_mean / len(x_data)

    for y in y_data:
        y_mean += y
    y_mean = y_mean / len(y_data)

    x_stdev = statistics.stdev(x_data, x_mean)
    y_stdev = statistics.stdev(y_data, y_mean)
    
    
    #Check if statistics are in close enough margin, conintue to next random seed if not
    if abs(x_mean) > x_margin: continue
    if abs(y_mean) > y_margin: continue
    if abs(1 - x_stdev) > x_margin: continue
    if abs(1 - y_stdev) > y_margin: continue

    
    #Record data
    x_collated.append(x_data)
    y_collated.append(y_data)


#Write to .json file
all_data = [x_collated, y_collated]

json_object = json.dumps(all_data, indent=4)

with open("02_margin_data.json", "w") as outfile:
    outfile.write(json_object)