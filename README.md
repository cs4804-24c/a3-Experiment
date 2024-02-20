Assignment 3 - Replicating a Classic Experiment  
===

Requirements
---

- Working link to the experiment hosted on gh-pages or some other site.
    1. http://geospatialmqptesting.dyn.wpi.edu:3000/bar_vis/
    2. http://geospatialmqptesting.dyn.wpi.edu:3000/scatter_vis/
    3. http://geospatialmqptesting.dyn.wpi.edu:3000/shotchart/

- Concise description and screenshot of your experiment.

![](/img/barchart.png)
![](/img/scatterchart.png)
![](/img/shotchart.png)

In this experiment, we took NBA player shooting data and plotted it on three different visualizations (Bar chart, Scatter chart, and a shot chart). We then had users enter what they thought the average point per game was based on the visualization provided. Ultimately, there were 20 estimates inputted for each chart from 10 people, giving us 200 entries of data per visualization. After data collection, we ended up cleaning the data as there were some results that were obviously random (one user simply input 1 to 20 in order for their guess). We then calculated the percent difference to determine which visualizations produced the most accurate estimates (The original error formula used in the Cleveland-McGill paper would not be accurate over the range of possible point values, since participants were asked to report an absolute value as opposed to a relative percent difference). 

The formula used for percent error was: abs(a-b)/(b)*100+1/8. 

After this, log2error was calculated using log2(percent_error), and -3 values were replaced with zeros as recommended.

After calculating the log2error, we were able to rank the charts as the following: 

1. Scatter plot (3.952)
2. Bar chart (4.587)
3. Shot chart (4.689)

The code found in dataprocessing.r was then used to generate the following diagram for the results, including bootstrapped 95% confidence intervals.

![](/img/error-graph.png)

There are a few things to note here. Firstly, the log2error here is much greater than we see in the classic Cleveland-McGill experiments. This is probably because guessing the average value when given any visualization is going to be a lot harder than guessing the percent difference as Cleveland-McGill tested. Another thing to note is how the shotchart has a considerably wider 95% CI than the other two chart types. This makes sense, as someone with basketball knowledge is probably going to do better with this type of vis compared to someone unfamiliar with basketball. Finally, given that this is a log scale, the scatter plot is significantly better than the other two visualizations, which the team expected given that the scatter plot has lines connecting the data points which we suspected would make guessing the averages a lot easier.

- Description of the technical achievements you attempted with this project.
    - Wrote a web server in Node.js using Express.js to handle submissions of user estimate which wrote their estimate and actual value to a given CSV
    - Retrieved NBA stat data dynamically using the NBA Stats API. This utilized the web server to bypass CORS limitations.
    - Deployed the web server and charts to a local PC to avoid having the web server being blocked from the NBA API on well known hosting services (ex. AWS, Glitch)

- Description of the design achievements you attempted with this project.
    - Plotted shots taken from the NBA API on an SVG
    - Drew the lines of a basketball court on an SVG (3 point line, paint line, basketball net, etc.)
    - Filter down shot chart by games played
    - Click on shots to view a video clip of the shot taken
