Assignment 3 - Replicating a Classic Experiment  
===

Experiment: This experiment is based off the paper "Jurassic Mark: Inattentional Bindness fo Datasaurus Reveals that Visualizations are Explored Not Seen". Specifically we attempted experiment 1: fiteration task. The idea behind this experiment is to focus on a specific mark (blue X's) in a sccaterplot while filtering out any other blue and green markers in the graph. Even within this experiment there are hidden images like a dinasaur which is tested to see if the particpant noticed it.

Data: The datasaurus graph was sourced from https://www.dropbox.com/sh/xaxpz3pm5r5awes/AADUbGVagF9i4RmM9JkPtviEa?dl=0. The data was translated to have a normal distribution, that is x and y means of 0 and x and y variance of 1. To limit the differences between the scatter point plots and the datasaurus graph, data for each scatter point plot was generated such that the graphs had the same number of points in each quadrant, the same mean*, and the same variance* as the datasaurus graph.

* Within a 0.02 margin of error from the datasaurus graph.

Firebase/Revisit:

Testing: In https://andrewsalls.github.io/study-a3/ is where the experiment was conducted. We were able to get 22 particpants to take part during this experiment. 

Visualizations: After the data was collected from the partipants 

Technical Achievements
- Generation of data for scatter plots that had the same number of points in each quadrant, the same mean, and the same variance as the datasaurus graph.
- Utilizing Revisit infrastructure to test our visualizations (including troubleshooting Revisit with Professor Harrison [CORS, ReCaptcha, etc.]
- Utilizing FireBase to store data and participant response from Revisit
- Utilizing Rowy (low-code backend) to manage database and export Firebase data to CSV for visualization creation


For this assignment you should aim to write everything from scratch. For experimentation it is often necessary to control all elements of the chart.
You should definitely *reference* demo programs from books or the web, and if you do please provide a References section with links at the end of your Readme.

Going Beyond Cleveland-McGill
---

