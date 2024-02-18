Assignment 3 - Replicating a Classic Experiment
===
###### a3-AudreyMongillo-ConnorEhrensperger-AlyshaCreelman

# GitHub Pages Link
https://audreymongillo.github.io/a3-Experiment/index.html

# Description

# Tested Visualizations
### Bar Chart 
![Screenshot 2024-02-16 at 3.56.43 PM.png](img%2FScreenshot%202024-02-16%20at%203.56.43%20PM.png)
### Horizontal Bar Chart 
![Screenshot 2024-02-16 at 3.56.27 PM.png](img%2FScreenshot%202024-02-16%20at%203.56.27%20PM.png)
### Packed Circles
![Screenshot 2024-02-16 at 3.57.02 PM.png](img%2FScreenshot%202024-02-16%20at%203.57.02%20PM.png)
### Stacked Bar CHart
![Screenshot 2024-02-16 at 3.56.07 PM.png](img%2FScreenshot%202024-02-16%20at%203.56.07%20PM.png)

# Master File Link
https://wpi0-my.sharepoint.com/:x:/g/personal/ajmongillo_wpi_edu/EaM53PTMraxCtOLry1bncxwBgrGefarzwj_1348wbfjB5w?e=FJsJ8v

# Results 
![Screenshot 2024-02-16 at 4.01.33 PM.png](img%2FScreenshot%202024-02-16%20at%204.01.33%20PM.png)
![Screenshot 2024-02-16 at 4.02.32 PM.png](img%2FScreenshot%202024-02-16%20at%204.02.32%20PM.png)

# Technical Achievements

# Design Achievements



Requirements
---

** DATA SCIENTISTS! IT IS YOUR TIME TO SHINE **


- Produce a README with figures that shows the visualizations you tested and results, ordered by best performance to worst performance. Follow the modern Cleveland-McGill figure below -- though note that using names instead of icons is fine.
- To obtain the ranking, calculate and report the average log2Error for each visualization across all trials and participants. This should be straightforward to do in a spreadsheet.
- Use Bootstrapped 95\% confidence intervals for your error upper and lower bounds. Include these in your figures. Bootstrapped confidence intervals are easily implemented in R + ggplot2 using the `stat_summary` geom. You can also use Excel, Python, or many many other tools. Bootstrapped 95% CIs are **very** useful in modern experiment practice.
- Include example images of each visualization as they appeared in your experiment (i.e. if you used a pie chart show the actual pie chart you used in the experiment along with the markings, not an example from Google Images).

## General Requirements
- Concise description and screenshot of your experiment.


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






