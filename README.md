# Humans scewed logorithmic?

### premise

We came across these websites claiming to have experiments that show humans naturally tend to process things natually as logorithmic rather than naturally linear. While these claims were mainly claiming pre-k being naturally logorithmic, we wanted to see if normal people like us wpi stem folks still skew logorithmically. 

We designed an experiment to have people guess the value of a point on a number line from 0 to 700. The hope being if we still thought logorithmically, then the data would follow a more logorithmic trend instead of a strictly linear trend. 

### dataCollection

The sample data was taken from victems unfortunate enough to be in the library after midnight. 

The process (still available on the hosted site) involved viewing a point on a number line from 0 to 700. You input your guess and another random point shows up. Each individual's data is collected locally where we integrate it into the master data sheet manually. 

### dataProcessing
We plot the actual numbers on the y-axis, and the guessed numbers on the x-axis. 

Then (with some help from online tools) we calculated the linear and logorithmic regressions of each individual's data. Using the regression formulas, we can not only look at the lines of best fit, we have r values which determine how well the lines of best fit fit. 

We went into this process thinking there wouldn't be any difference, and it would cut and dry end up being linear throughout. We were dissapointed (in a thrilling way) to find several individuals where the logorithmic best fit had a better corrolation than the linear corrolation. 

### dataVisualization

Using d3, the interactable graph is viewable at https://gibsonphillips.github.io/a3-Experiment/visuals.html. The different checkboxes allow comparisons of different trials with their lines of best fit. 

The graph on the right displays cm error of the data at 1-100, 101-200, 201-300, etc. 
There are many takaways to infer here, but I will refrain from diving too deep into the data could be too limited I will say the amount of corrolation is indicative of a enough corrolation to warrent a much larger study on a larger scale. 

When all of the data is compiled together there isn't nearly as much corrolation for logorithmic regression with still a pretty good corrolation for linear regression. 

![cleveland equation](img/cleveland-equation.png)

### design and technical acheivements

This is an interactive graph overlaying as many as 11 layers of data at once. While you would probably never want to see them all at once, it's fun to compare each different trial along with the r values. 

We chose to have the r Values next to the checkboxes as to easily assess which ones would be most interesting to examine further. 

https://gibsonphillips.github.io/a3-Experiment/visuals.html
Concise description and screenshot of your experiment.
Description of the technical achievements you attempted with this project.
Description of the design achievements you attempted with this project.
