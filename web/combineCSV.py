import os
import csv

# Directory containing CSV files
directory = r"C:\Users\Marlin\Desktop\data viz\hw3\data"

# Output CSV file name
output_file = 'finalData.csv'

# Function to combine CSV files
def combine_csv_files(directory, output_file):
    combined_data = []

    # Iterate over files in the directory
    for filename in os.listdir(directory):
        if filename.endswith('.csv'):
            file_path = os.path.join(directory, filename)
            with open(file_path, 'r', newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    combined_data.append(row)

    # Write combined data to output CSV file
    with open(output_file, 'w', newline='') as csvfile:
        fieldnames = combined_data[0].keys() if combined_data else []
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in combined_data:
            writer.writerow(row)

    print('Combined CSV file created successfully:', output_file)

# Call the function to combine CSV files
combine_csv_files(directory, output_file)
