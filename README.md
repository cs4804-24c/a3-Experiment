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

## Technical Achievement
1. Deployed our game within the reVISit framework based on the html-input example.

   Link to the repo wiht reVISit framework version: https://github.com/YifuYuan/a3-revisit 
3. Set up the Firebase with the visual experiment game so that all the user responses are stored on the cloud in real-time, which simplifies the data collection process.
<img width="1097" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/b3318610-3e4f-474e-bc21-f654aecc5022">


## Analysis
<img width="518" alt="Bar_Gaph" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/ce360329-02cf-436c-854f-f58282d07f49">
<p float="left">
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/5e7e0367-97c7-447d-b730-8ce302d375ca" width="500" />
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/cc936d55-dc98-4a0c-b6de-f4671b3fe8e0" width="500" />
</p>

<p float="left">
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/99a8dd6f-0a1c-4e0d-96a9-6356da6c0c09" width="500" />
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/6cbae31b-e16c-4b51-89fe-0c6202038db4" width="500" />
</p>

<p float="left">
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/3221ed01-83dc-441f-879a-97e7af1d1d1b" width="500" />
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/3e2d7b4f-9536-4773-9d04-44bc1891d844" width="500" />
</p>

<p float="left">
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/487855bd-17b2-467e-a321-4cd04c8253f6" width="500" />
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/761fd5ab-3906-4b5f-9941-d269eb2575af" width="500" />
</p>

<p float="left">
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/43f4317b-866d-4b3e-863e-7fe9b491e943" width="500" />
    <img src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/efc2d213-1ca3-4877-ba9a-f77a37847741" width="500" />
</p>

The above graphs, excluding the bar chart, are logistic regressions separated by color pairs(Bk, B, G, R, Y representing black, blue, green, red, and yellow respectively) that use a 95% confidence interval.  From the odds ratio provided from each graph, we can compare how likely it is that a person taking the experiment will guess a given trial correctly based on the color combination shown to them.  The odds ratio of each graph is the best indicator of how likely someone is to guess correctly on a given trial. Additionally, each graph provides a p-value, which indicates whether or not the results are statistically significant. If the p-value is below .05 for the difference in dot representation, then we reject the null hypothesis that the difference in dots does not have an effect on if the person gets it right or wrong. If the difference in dots does play a role, when the difference in dots is smaller, the user is more likely to make a mistake. This mistake can be attributed to the color between the two groups. For example, we see a very low p-value for Black and Yellow combination. This means that the number of dots did impact whether the person got the answer right or wrong. The closer the dots were in number, the more likely the user was to get the answer wrong. When the count of dots is close between the two groups the users can only rely on the color to differentiate the information between the two groups.

Based on the trials conducted, there is sufficient evidence to suggest that color has a significant effect on perception of cardinality. For example, the trails that had a color pairing of green and yellow had correct guesses 96.66% of the time, while the color pairs of black and blue had correct guesses 78.33% of the time. In addition to the data shown on the bar graph, the odds ratios support that certain color pairs made it easier to guess cardinality. It is also worth noting that the color combinations black-green, black-yellow, and blue-yellow all tied for second place on the bar graph. Additionally, every color combination had at least a 75% accuracy rate. This could indicate that the experiment may have been easy, or that it wasn't fine tuned to getting the desired results.

One of the most important concepts central to perceptual psychology, as formulated in accordance with Weber’s law, is the just-noticeable difference (JND). JND’s are artefacts of human perception which describe differences within a certain set of stimuli that are ordinarily barely registered by the observer. More formally, as a statistical concept, a JND represents some difference in stimuli that is identified by observers nearly half of the time it is present. For the sake of simplicity, we take the JND threshold of human perception of numerosity (by proportion) to be roughly 5%; any disparity in the cardinalities of two visual sets that represents a difference in magnitudes less than or equal to 5% is perceptible approximately 50% of the times it appears.

Hence, the expected probability of a human observer being capable of discriminating between two randomly-distributed sets of 20 to 100 cardinal objects each is precisely 1265313122​96.426%, granted they can accurately do so every single instance in which the difference between the cardinalities of both sets is strictly greater than 5% and only partially do so when said difference is, at most, 5%. As such, the null hypothesis (H0) is defined in each particular instance by the difference in the expected and observed proportions of correct answers to the total number of trials being precisely equal to 0:
<img width="635" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/729043b0-8b90-4d96-99b4-0072d92cdb8b">

The z-test statistics are provided as follows:
<img width="655" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/94a45a79-1f13-487c-846f-2d6f62e39455">
<img width="651" alt="image" src="https://github.com/YifuYuan/a3-Experiment/assets/90162512/9c9e3c64-3f27-4d9c-8870-4c2b1ff83ec4">

As is shown above, all of the z-test values are outside of the 95% confidence interval bounds of a standardized normal distribution except for the green–yellow z-test value. Hence, in every color pairing outside of green–yellow, there is sufficient evidence with which to reject the null hypothesis. And, in doing so, one verifies that there does exist some non-negligible effect that can be observed from unequal color pairings.




## Future Steps
If we were to do this experiment again, we would make the difference between the two groups be within a range as opposed to being a random number between 20-100. Also we would make it so the two groups cannot have the same number of circles, this did not happen often but when it did happen which affected our analysis. It might also be worth considering reducing the time that the dots are shown to within one second so that the experiment can focus more on how easily people can immediately interpret cardinality of data based on color.



















