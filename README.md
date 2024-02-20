Assignment 3 - Replicating a Classic Experiment
===
### a3-AudreyMongillo-ConnorEhrensperger-AlyshaCreelman

# GitHub Pages Link
https://audreymongillo.github.io/a3-Experiment/index.html

# Description
For our experiment we decided to implement our own version of the Cleveland and McGill study. We tested 4 different 
types of charts to determine which had the least error when predicting the percentage of size. We tested bar charts, 
horizontal bar charts, packed circles, and stacked bar charts. We tested our experiment on 11 different participants, 
obtaining 220 total trials for each type of chart. Based on the average log2 error from the trails, the charts best 
to worst are as follows: 1. Horizontal bar chart 2. Bar chart 3. Packed circles 4. Stacked bar chart

# Tested Visualizations

### Horizontal Bar Chart
![Screenshot 2024-02-16 at 3.56.27 PM.png](img%2FScreenshot%202024-02-16%20at%203.56.27%20PM.png)
### Bar Chart 
![Screenshot 2024-02-16 at 3.56.43 PM.png](img%2FScreenshot%202024-02-16%20at%203.56.43%20PM.png)
### Packed Circles
![Screenshot 2024-02-16 at 3.57.02 PM.png](img%2FScreenshot%202024-02-16%20at%203.57.02%20PM.png)
### Stacked Bar Chart
![Screenshot 2024-02-16 at 3.56.07 PM.png](img%2FScreenshot%202024-02-16%20at%203.56.07%20PM.png)

# Master File Link
https://wpi0-my.sharepoint.com/:x:/g/personal/ajmongillo_wpi_edu/EaM53PTMraxCtOLry1bncxwBgrGefarzwj_1348wbfjB5w?e=FJsJ8v

# Results 
### Chart
![Screenshot 2024-02-16 at 4.01.33 PM.png](img%2FScreenshot%202024-02-16%20at%204.01.33%20PM.png)
### Bar Graph of Log2 Average with Bootstrapped 95% Confidence Intervals
![Screenshot 2024-02-18 at 6.04.03 PM.png](img%2FScreenshot%202024-02-18%20at%206.04.03%20PM.png)
### Cleveland and McGill Graph of Log2 Average with Bootstrapped 95% Confidence Intervals
![Screenshot 2024-02-18 at 11.21.57 PM.png](img%2FScreenshot%202024-02-18%20at%2011.21.57%20PM.png)

# Technical Achievements
- We did an extra chart type. We added a packed circle graph, which is something we had not
yet had much experience implementing. By adding this extra graph, we were able to see how more types of graphs compared 
to each other. We were also able to see how well users can spot the difference in area instead of just height. Using 
bar graphs tested mostly the users ability to determine how different heights compared to each other, but by using 
circles, we were able to test area as well.
- The packed circle graph is dynamic. When the graph first appears on the screen, the circles start near the middle and move out
to the appropriate places. 
- We connected the "Next" button to the
enter key on the keyboard. Instead of having to click next after each trial, users are able to just click the enter 
button to move on to the next one.
- We added a "Results" button at the end of the 
experiment that, when clicked, automatically generates a bar graph showing the individual user's results for each 
type of graph along with a table of the error values. The user is able to click back from this screen and click the 
"Download" button to generate a unique csv file with their name as the file name.
- Our background screen includes an external image that links to a site where the original Cleveland and McGill paper can be accessed.

# Design Achievements
- We added a background color and a number of different fonts to make each screen more visually appealing for the user. 
- Font types and colors were customized for each screen and matched an overall theme.
- We added a tab at the top of the screen, which changes the color of the words when the user hovers over them. 
- We added a background tab to the start page of our experiment. Users are able to navigate to 
the background tab to learn more about our experiment, where the experiment came from, and what we plan on doing with 
the data.
- At the end of our 
experiment, our results page is designed to show the user a graph of their own results and a breakdown of the average 
log2 error they got for each type of graph in a way that is clean and simple. This allows the user to get instant feedback on how they did and gives them 
an initial idea as to what the results of the experiment may be. 

# Resources

- Used in the creation of the packed circle graph: https://d3-graph-gallery.com/graph/circularpacking_basic.html

- ChatGPT was used for some minor debugging and understanding how to style different screens.






