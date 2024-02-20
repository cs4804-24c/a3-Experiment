Link to the visual experiment: https://yifuyuan.github.io/a3-Experiment/index.1.html

## Goal of Experiment
The goal of this experiment is to see what colors can be most easily distinguishable by the audience in a short amount of time. We created color pairings with one color visual (a square containing a random number of circles) on the left, and one on the right, and gave users 3 seconds to look at this and determine which side had more information (circles). We performed an analysis on whether the participants got the answers right or wrong.

## HTML/Survey Overview
### Introduction Page
<img width="1353" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/2a9d95b3-afb9-44ee-a4fb-42282ccd7c80">

### Game Page
<img width="1244" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/2152ede6-12bb-4e74-86b7-3e37c801b1d2">
Our web page consists of many components, body, header, squares, circles, buttons, and result table. For general attributes (color, size, etc.) of these components, I define them in the style container of the html. The page consists of the game section and the results table. The game has two squares that will contain circles. It also has three buttons to start the game and the user can either select the left button or right button. There is also a countdown for when the circles will disappear and then the user can submit their answers. The other section of the webpage is the results table which will appear once all the questions are answered. A table will appear showing the left color, left number of circles, right color, right number of circles, and user’s answer.

## Principle
We have a list of colors that we want to experiment on. I created another list that would contain all the combinations of the colors by doing a for loop through the list of colors. Once I got the list of colors I randomly shuffled the combinations by using Math.random(). This would ensure that each participant would not likely get the same sequence of colors. Now that I have a list of color combinations I can create the circles. The createCircles function takes a square id, color, and number of circles and creates an svg and appends that number of circles in that color to the svg that is created. With the ReVISit Framework being connected to the Firebase, the user’s choice of each test will be recorded and uploaded to the Firebase Realtime Database. From here we can start creating the game. The first startGame is executed on the Start game button click, then it is iterated through until the current combination index is equal to the length of the colorCombination list. During each iteration:
1. A random number between 20 and 100 is assigned to the left number of circles and right number of circles.
2. A variable contains a combination of colors. Ex. [‘red’, ‘blue’]
3. Call createCircles for left square, combination[0], left number of circles, then call it for right square, combination[1], right number of circles.
4. Call the countdown function with input of 3 for a 3 second countdown
  a. This function calls setInterval to countdown from the input value
  b. Once expired the countdown is cleared, the left and right button are shown and then the circles are hidden by a helper function hideCircles which removes all ‘circles’
5. checkAnswer pushes the result of that question into the results list and this is done on every button click. A result is one row of the results table as explained in the Survey Overview section.
6. If it was the last color combination then the game ends and the results are shown, else it continues

For display results, I used elements defined in the style container and fed in the values from the results list. Meanwhile, all the user responses are uploaded to the Firebase during the test in real-time. Each user has a distinct username and their response for the total 20 sub-tests. With the JSON file exported from the Firebase, we could then collect and analyze the data with a simple Python script.


## Analysis


## Technical Achievement
1. Deployed our game within the reVISit framework based on the html-input example.

   Link to the repo wiht reVISit framework version: https://github.com/YifuYuan/a3-revisit 
3. Set up the Firebase with the visual experiment game so that all the user responses are stored on the cloud in real-time, which simplifies the data collection process.
<img width="1097" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/b3318610-3e4f-474e-bc21-f654aecc5022">













