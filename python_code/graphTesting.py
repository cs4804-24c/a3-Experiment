# -*- coding: utf-8 -*-
"""
Created on Wed Feb  7 11:50:56 2024

File for testing jarassic_graph

@author: samda
"""

import random
import matplotlib.pyplot as plt
import jurassic_graph

datafile = "02_margin_data.json"
dinofile = "datasaurus_data.json"

myGraph = jurassic_graph.jurassic_graph(datafile, dinofile)

#myGraph.make_graph(0, False)
#myGraph.make_graph(1, True)
#myGraph.make_graph(2, False)
#myGraph.make_graph(3, False)
