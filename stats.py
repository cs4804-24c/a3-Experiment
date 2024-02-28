import numpy as np
import math

import pandas as pd


# Function to calculate log-base-2 error
def calculate_log_error(true_percentage, reported_percentage):
    equal_elements = np.equal(true_percentage, reported_percentage)
    return np.where(equal_elements, 0, np.log2(reported_percentage / true_percentage))


# Function to perform bootstrapping and calculate confidence intervals
def bootstrap_log_error(true_percentage, reported_percentage, n_iterations=1000, alpha=0.05):
    np.random.seed(42)  # for reproducibility
    errors = []

    for _ in range(n_iterations):
        # Generate bootstrap samples
        true_samples = np.random.choice(true_percentage, len(true_percentage), replace=True)
        reported_samples = np.random.choice(reported_percentage, len(reported_percentage), replace=True)

        # Calculate log-base-2 error for each bootstrap sample
        error = calculate_log_error(true_samples, reported_samples)
        errors.append(error)

    # Calculate the confidence intervals
    lower_bound = np.percentile(errors, (alpha / 2) * 100)
    upper_bound = np.percentile(errors, (1 - alpha / 2) * 100)

    return lower_bound, upper_bound


# Example usage:
true_percentage = np.array([50, 50, 50, 50, 50])
reported_percentage = np.array([1, 100, 1, 1, 1])

# Calculate log-base-2 error
log_error = calculate_log_error(true_percentage, reported_percentage)

# Perform bootstrapping to get confidence intervals
lower_bound, upper_bound = bootstrap_log_error(true_percentage, reported_percentage)

# Display the results
print("Log-base-2 Error:", log_error)
print("Bootstrapped 95% Confidence Intervals:")
print("Lower Bound:", lower_bound)
print("Upper Bound:", upper_bound)
