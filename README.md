# Humans scewed logarithmic?

### premise

We came across these websites claiming to have experiments that show humans naturally tend to process things natually as logarithmic rather than naturally linear. While these claims were mainly claiming pre-k being naturally logarithmic, we wanted to see if normal people like us WPI STEM folks still skew logarithmically. 

We designed an experiment to have people guess the value of a point on a number line from 0 to 700. The hope being if we still thought logarithmically, then the data would follow a more logarithmic trend instead of a strictly linear trend. 

### dataCollection

The sample data was taken from victims unfortunate enough to be in the library after midnight. 

The process (still available on the hosted site) involved viewing a point on a number line from 0 to 700. You input your guess and another random point shows up. Each individual's data is collected locally where we integrate it into the master data sheet manually. 

### dataProcessing
We plot the actual numbers on the y-axis, and the guessed numbers on the x-axis. 

Then (with some help from online tools) we calculated the linear and logarithmic regressions of each individual's data. Using the regression formulas, not only can we look at the lines of best fit, but we can also calculate the r values which determine how well the lines of best fit fit. 

We went into this process thinking there wouldn't be any difference, and it would end up being linear throughout. We were disappointed (in a thrilling way) to find several individuals where the logarithmic best fit had a better correlation than the linear best fit. 

### dataVisualization

Using d3, the interactable graph is viewable at https://gibsonphillips.github.io/a3-Experiment/visuals.html. The different checkboxes allow comparisons of different trials with their lines of best fit. 

The graph on the right displays cm error of the data at 1-100, 101-200, 201-300, etc. 
There are many takaways to infer here, but I will refrain from diving too deep into the data. I will say the amount of correlation is indicative of a enough correlation to warrent a much larger study on a larger scale. 

When all of the data is compiled together there isn't nearly as much correlation for logarithmic regression with still a pretty good correlation for linear regression. 

![cleveland equation](img/cleveland-equation.png)

### design and technical acheivements

This is an interactive graph overlaying as many as 11 separately colored layers of data at once. While you would probably never want to see them all at once, it's interesting to compare each different trial along with the r values. 

We chose to have the r Values next to the checkboxes as to easily assess which ones would be most interesting to examine further. 

https://gibsonphillips.github.io/a3-Experiment/visuals.html

References:
https://stackoverflow.com/questions/11189284/d3-axis-labeling
https://stackoverflow.com/questions/30058750/how-to-code-checkbox-checked-unchecked-behavior-in-d3-js
https://stackoverflow.com/questions/34472192/linking-html-checkbox-to-javascript
https://website.education.wisc.edu/~swu28/d3t/visualization.html
https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
https://chat.openai.com/
ChatGPT was used to assist in Debugging