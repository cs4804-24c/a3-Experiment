import pandas as pd
from scipy import stats

df = pd.read_csv('')
actual_values = 
predicted_values = 

# Calculate mean squared error (MSE) as a measure of performance
mse = ((actual_values - predicted_values) ** 2).mean()

# Standard error of the mean (SEM)
sem = stats.sem(actual_values)

#Condfidence intervel
confidence_level = 0.95

# Margin of error
margin_of_error = sem * stats.t.ppf((1 + confidence_level) / 2, len(actual_values) - 1)

# Confidence interval calulation
lower_bound = mse - margin_of_error
upper_bound = mse + margin_of_error


print(f"Mean Squared Error: {mse}")
print(f"Standard Error of the Mean: {sem}")
print(f"Confidence Interval: ({lower_bound}, {upper_bound})")