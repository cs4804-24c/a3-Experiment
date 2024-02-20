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

In this experiment, we took NBA player shooting data and plotted it on three different visualizations (Bar chart, Scatter chart, and a shot chart). We then had users enter what they thought the average point per game was based on the visualization provided. Ultimately, there were 20 estimates inputted for each chart from 10 people, giving us 200 entries of data per visualization. We then calculated the percent difference to determine which visualizations produced the most accurate estimates (The original error formula used in the Cleveland-McGill paper would not be accurate over the range of possible point values). The formula is: abs(a-b)/((a+b)/2)*100+1/8

 After calculating the error, we were able to rank the charts as the following: 
1. Scatter plot
2. Shot chart
3. Bar chart

- Description of the technical achievements you attempted with this project.
    - Wrote a web server in Node.js using Express.js to handle submissions of user estimate which wrote their estimate and actual value to a given CSV
    - Retrieved NBA stat data dynamically using the NBA Stats API. This utilized the web server to bypass CORS limitations.
    - Deployed the web server and charts to a local PC to avoid having the web server being blocked from the NBA API on well known hosting services (ex. AWS, Glitch)

- Description of the design achievements you attempted with this project.
    - Plotted shots taken from the NBA API on an SVG
    - Drew the lines of a basketball court on an SVG (3 point line, paint line, basketball net, etc.)
    - Filter down shot chart by games played
    - Click on shots to view a video clip of the shot taken

Background
---

In 1984, William Cleveland and Robert McGill published the results of several controlled experiments that pitted bar charts against pies and stacked-bar variants. 
Their paper (http://www.cs.ubc.ca/~tmm/courses/cpsc533c-04-spr/readings/cleveland.pdf) (http://info.slis.indiana.edu/~katy/S637-S11/cleveland84.pdf) is considered a key paper in data visualization.
In particular, they ran a psychology-style experiment where users were shown a series of randomly-generated charts with two graphical elements marked like this:

![cleveland bar chart](img/cleveland-bar.png)

Participants were then asked, "What percentage is the smaller of the larger?". 
This was repeated hundreds of time with varying data and charts. 
By the end of the study, Cleveland and McGill had amassed a large dataset that looked like this:

![cleveland table](img/cleveland-table.png)

__Log-base-2 or "cm-error"__: The true percent is the actual percentage of the smaller to the larger, while the reported percent is what participants reported. 
Cleveland and McGill recognized that their analyses would be biased if they took `abs(ReportedPercent – TruePercent)` as their score for error. 
To compensate, they came up with a logarithmic scale for error with this equation:

![cleveland equation](img/cleveland-equation.png)

You’ll be implementing this error score as part of the lab. 
(Hint: it’s not a trick question, this is just to familiarize you with the experiment protocol). 
With this Cleveland-McGill error score you can better compare the performance of the charts you test to figure out which one performs the best.

As a baseline, compare your average Error scores to the following chart, which include both Cleveland and McGill’s results as well as more recent extensions of this experiment (lower error indicates better performance, and error bars are bootstrapped 95% confidence intervals (`http://en.wikipedia.org/wiki/Confidence_interval#Meaning_and_interpretation`)):

![cleveland results](img/cleveland-results.png)

GitHub Details
---

- Fork the GitHub Repository. You now have a copy associated with your username.
- Make changes to index.html to fulfill the project requirements. 
- Make sure your "master" branch matches your "gh-pages" branch. See the GitHub Guides referenced above if you need help.
- Edit this README.md with a link to your gh-pages site: e.g. http://YourUsernameGoesHere.github.io/Experiment/index.html
- Replace this file (README.md) with your writeup and Design/Technical achievements.
- To submit, make a [Pull Request](https://help.github.com/articles/using-pull-requests/) on the original repository.
- Name your submission using the following scheme: 
```
a3-FirstLastnameMember1-FirstLastnameMember2-FirstLastnameMember3-...
```
