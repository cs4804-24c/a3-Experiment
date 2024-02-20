Assignment 3 - Replicating a Classic Experiment  
===

Experiment: This experiment is based off the paper "Jurassic Mark: Inattentional Bindness fo Datasaurus Reveals that Visualizations are Explored Not Seen". Specifically we attempted experiment 1: fiteration task. The idea behind this experiment is to focus on a specific mark (blue X's) in a sccaterplot while filtering out any other blue and green markers in the graph. Even within this experiment there are hidden images like a dinosaur which is tested to see if the particpant noticed it.

Data: The datasaurus graph was sourced from https://www.dropbox.com/sh/xaxpz3pm5r5awes/AADUbGVagF9i4RmM9JkPtviEa?dl=0. The data was translated to have a normal distribution, that is x and y means of 0 and x and y variance of 1. To limit the differences between the scatter point plots and the datasaurus graph, data for each scatter point plot was generated such that the graphs had the same number of points in each quadrant, the same mean*, and the same variance* as the datasaurus graph.

* Within a 0.02 margin of error from the datasaurus graph.

Firebase/Revisit:

For storing data from ReVisit, we implemented FireBase using the instructions on the website. Through FireBase, we created a collection for our participant responses with each of the participant's responses being stored in a separate document identified by their unique participant ID. To export the data from FireBase, we implemented and utilized Rowy (a low-code backend for managing Firebase databases) to export the data to a CSV where it could be further analyzed. 

Testing: In https://andrewsalls.github.io/study-a3/ is where the experiment was conducted. We were able to get 22 particpants to take part during this experiment. 

Visualizations: The visuals we created for the testing includes:


We calculated the accuracy of identifying the major quadrants and if the the graph outlined a dinosaur or a gorilla. We found that these were the results.
![Test](img/rates.png)

Technical Achievements
- Generation of data for scatter plots that had the same number of points in each quadrant, the same mean, and the same variance as the datasaurus graph.
- Utilized Revisit infrastructure to test our visualizations (including troubleshooting for implementing Revisit with Professor Harrison [CORS, ReCaptcha, etc.]
- Utilized FireBase to store data and participant response from Revisit
- Utilized Rowy (low-code backend) to manage database and export Firebase data to CSV for analyzation

For this assignment you should aim to write everything from scratch. For experimentation it is often necessary to control all elements of the chart.
You should definitely *reference* demo programs from books or the web, and if you do please provide a References section with links at the end of your Readme.

Going Beyond Cleveland-McGill
---

