import csv
import random
#https://numpy.org/doc/stable/reference/random/generated/numpy.random.rand.html
#https://docs.python.org/3/library/csv.html

# Function to generate a random array
def generate_random_array():
    # Generate a random length between 5 and 10 inclusive
    array_length = random.randint(5, 10)
    # Generate an array of random numbers between 5 and 100
    random_array = [random.randint(5, 100) for _ in range(array_length)]
    return random_array

# Generate 20 arrays and write them into separate CSV files
for i in range(20):
    array = generate_random_array()
    csv_filename = f"array_{i + 1}.csv"
    with open(csv_filename, "w", newline='') as file:
        writer = csv.writer(file)
        # Write the header
        writer.writerow(["label", "value"])
        # Write the array into the CSV file with labels
        for j, value in enumerate(array, start=1):
            writer.writerow([j, value])