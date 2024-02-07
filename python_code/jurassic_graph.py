# -*- coding: utf-8 -*-
"""
Created on Wed Feb  7 11:10:30 2024

Code with functions for generating graphs for Jarassic Mark experiment.
Must be in same folder as assocaited .json files

@author: samda
"""
import matplotlib.pyplot as plt
from matplotlib.ticker import FixedLocator
import json
import random


def quadrant_check(x, y):
    '''
    Function takes a (x,y) point and returns what quadrant the point is in.
    0 is considered positive for this function (ex. a point a (0,0) would be 
    considered to be in quadrant 1).

    Parameters
    ----------
    x : float
        x loation of point.
    y : float
        y location of point.

    Returns
    -------
    q : int
        Quadrant point is located in (1, 2, 3 , or 4).
    '''
    if x >= 0:
        if y >= 0: q = 1
        else: q = 4
    else:
        if y >= 0: q = 2
        else: q = 3
    
    return q


class jurassic_graph:
    
    def __init__(self, data_json, dino_json, **kwargs):
        '''
        Function generates a jurassic_graph object.
        
        Perameters
        ----------
        data_json: String
            Name or file path to .json file holding graph data
        dino_json: String
            Name or file path to .json file holding datasaurus graph data
        **kwargs:
            shuffle: Boolean
                If False, does not shuffle list of points. By default the lists
                are shuffled
        '''
        random.seed()
        
        #Keeps track of next index of the next graph to generate
        self.graph_index = 0
        
        #Open .json file
        with open(data_json, 'r') as openfile:
            json_data = json.load(openfile)
        
        x_list = json_data[0]
        y_list = json_data[1]
        shuffle_check = True
        
        #Default option is to shuffle lists, but can specify not to
        if 'shuffle' in kwargs:
            if kwargs['shuffle'] == False:
                shuffle_check = False
        
        if shuffle_check:    
            #Ensures that the x and y lists stayed paired even when shuffled
            collation_shuffler = list(zip(x_list, y_list))
            random.shuffle(collation_shuffler)

            x_list, y_list = zip(*collation_shuffler)
        
        self.x_collated = x_list
        self.y_collated = y_list
        
        #Open .json file
        with open(dino_json, 'r') as openfile:
            json_dino = json.load(openfile)

        self.x_dino = json_dino[0]
        self.y_dino = json_dino[1]


        #Generates figure objects and attaches it to self
        self.fig, self.ax = plt.subplots(1,1)
        self.fig.set_size_inches(5,5)
        self.fig.tight_layout(rect=[0, 0.03, 1, 0.95])


    def increment(self):
        '''
        Function shifts or resets graph_index
        '''
        self.graph_index += 1
        if self.graph_index > len(self.x_collated):
            self.graph_index = 0


    def make_graph(self, form, dino, **kwargs):
        '''
        Function generates graphs based on the given .json data

        Parameters
        ----------
        form : int
            Specifies form graph is to take. If 0 forward / of x points 
            (quadrants 1,3) in blue, if 1 is \ (quadrants 2,4) of blue x points,
            if 2 makes 3 random quadrants of x points, if 3 makes 1 random 
            quadrant have blue x point. Quadranst without blue x points have
            blue circles instead.
        dino : boolean
            If True, datasaurus data used for green points. Otherwise takes next
            set of graph points and plots green circles.
        **kwargs : Can specify graph used for the blue or green points. 
                Currently there are 50 graphs, so use indexes between 0 and 49
                unless different data is used.    
            b_points: int
                Specifies data to use for blue points.
            g_points: int
                Specifies data to use for green points. If dino is True, the 
                dino graph takes preference.
        '''
        #Gets data for blue points
        b_x_data = self.x_collated[self.graph_index]
        b_y_data = self.y_collated[self.graph_index]
        
        #If b_points in kwargs uses them instead
        if 'b_points' in kwargs:
            b_x_data = self.x_collated[kwargs['b_points']]
            b_y_data = self.y_collated[kwargs['b_points']]
        #Doesn't incriment if b_points used
        else: self.increment()
        
        
        #Gets data for green points
        g_x_data = self.x_collated[self.graph_index]
        g_y_data = self.y_collated[self.graph_index]
        
        #If dino True uses it for green data points
        if dino == True:
            g_x_data = self.x_dino
            g_y_data = self.y_dino
        #Else if g_points in kwargs uses them
        elif 'b_points' in kwargs:
            b_x_data = self.x_collated[kwargs['b_points']]
            b_y_data = self.y_collated[kwargs['b_points']]
        #Doesn't incriment if dino points or g_points are used
        else: self.increment()
        
        
        #Generates information for form of graph
        cross_quadrants = []
        # / of x marks, quadrants 1 and 3
        if form == 0: cross_quadrants = [1, 3]
        # \ of x marks, quadrants 2 and 4
        elif form == 1: cross_quadrants = [2, 4]
        #3 random quadrants have x marks
        elif form == 2:
            open_q = random.randint(1,4)
            temp_list = [1, 2, 3, 4]
            for item in temp_list:
                if item != open_q: cross_quadrants.append(item)
        #1 random quadrant has x marks
        else: cross_quadrants.append(random.randint(1,4))
        
        
        #Generates graphs, green points then blue points on top
        self.ax.clear()      
        
        #plot green points
        self.ax.scatter(g_x_data, g_y_data, s=80, facecolors='none', edgecolors='green')
        
        #plot blue points
        #Runs for every point in the b_x_data and b_y_data paired lists
        for i in range(len(b_x_data)):
            x = b_x_data[i]
            y = b_y_data[i]
            
            #Checks quadrant point is in
            quad = quadrant_check(x, y)
            
            #If True, indicates if cross is to be plotted
            if quad in cross_quadrants:
                self.ax.scatter(x, y, s=80, marker='x', facecolors='blue')
            else:
                self.ax.scatter(x, y, s=80, facecolors='none', edgecolors='blue')
        
        
        #Display graphs
        self.ax.set_xlim(-3,3)
        self.ax.set_ylim(-3,3)
        
        self.ax.axhline(0, linestyle='-', color='k') # horizontal lines
        self.ax.axvline(0, linestyle='-', color='k') # vertical lines
        
        plt.show()