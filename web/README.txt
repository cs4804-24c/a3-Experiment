**README**

### Introduction:
This project consists of a two-page website designed for conducting an experimental study on color perception in data visualization. The experiment entails presenting use
rs with a heatmap visualization and prompting them to estimate percentage differences between colors. This README provides detailed insights into the design and technical c
omponents of the project.

### Useage

The website prompts users to participate in experiments where they compare the color difference between a square beneath two color dots, namely blue and green. Each page represents an individual experiment, and the data for each trial is saved as a separate CSV file for easy management.
Users are required to input the percentage difference in color between the two dots. They need not concern themselves with whether the value is positive or negative, as the application will automatically take the absolute value of the input.
To streamline the data collection process, a Python application has been developed to merge all individual CSV files into a comprehensive dataset. This final dataset is then utilized for analysis and visualization, typically conducted using the R programming language.

### Design Elements:
1. **User Interface**:
   - The user interface prioritizes simplicity and ease of use. It features a clear header for navigation and a well-defined main section for content display.
   - Each page includes explicit instructions guiding users through the experiment, ensuring clarity and facilitating participation.

2. **Visual Design**:
   - The design employs a cohesive color scheme and typography to enhance readability and visual appeal across the website.
   - Notably, the heatmap visualization is prominently displayed with a distinct title, accompanied by explanatory text to assist users in interpreting the data effectively.

3. **Interactive Features**:
   - Users are actively engaged through interactive elements, such as a form prompting them to compare color differences in the heatmap.
   - Upon form submission, the application calculates the accuracy of user estimates and generates a downloadable CSV file containing comprehensive experiment results.

### Technical Elements:
1. **D3.js Integration**:
   - The project leverages the powerful D3.js library to create dynamic and interactive visualizations, such as the heatmap.
   - In the provided code, D3.js is seamlessly integrated to generate the heatmap, utilizing scalable vector graphics (SVG) for data representation.

2. **Responsive Design**:
   - The website is designed to be responsive, adapting seamlessly to various devices and screen sizes for optimal viewing and interaction.
   - CSS media queries are employed to adjust layout and styling based on the device's screen resolution, ensuring a consistent user experience.
3. **

### Conclusion:
This project represents a seamless integration of design aesthetics and technical functionality, offering users an engaging platform to participate in color per
ception experiments. By combining intuitive user interface design with sophisticated data visualization techniques, it serves as a valuable tool for educational a
nd research purposes. With its interactive features and comprehensive analysis capabilities, the website provides a unique opportunity for users to explore and und
erstand color perception within the context of data visualization.
