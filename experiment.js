document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startBtn').addEventListener('click', function() {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('chartArea').style.display = 'block';
        document.getElementById('responseForm').style.display = 'block';
        nextTrial(); // Start with the first trial
    });

    document.getElementById('responseForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const userEstimate = document.getElementById('estimate').value;
        console.log(`Your estimate: ${userEstimate}%`); // For demonstration, log the estimate
        saveUserInput(userEstimate); // Save user input for the result display
        nextTrial(); // Move to next trial
    });
});

let chartSequence = ['bar', 'pie', 'box', 'bar', 'pie', 'box', 'bar', 'pie', 'box'];
let totalQuestions = 0;
let userInputs = []; // To store user inputs
let correctResults = []; // To store correct results for each chart

function generateData() {
    const dataSet = [];
    for (let i = 0; i < 5; i++) {
        dataSet.push(Math.floor(Math.random() * 101));
    }
    correctResults.push(dataSet); // Store correct result for later display
    return dataSet;
}

function saveUserInput(input) {
    userInputs.push(input); // Save user's input
}

function displayChart(data) {
    // Clear the existing chart before displaying a new one
    d3.select("#chart").selectAll("*").remove();

    const chartType = chartSequence[totalQuestions % chartSequence.length];
    switch (chartType) {
        case 'bar':
            displayBarChart(data);
            break;
        case 'pie':
            displayPieChart(data);
            break;
        case 'box': // Change from 'scatter' to 'box'
            displayBoxPlot(data);
            break;
        default:
            console.error('Unknown chart type:', chartType);
    }
    totalQuestions++; // Increment the total questions counter
}

function displayBarChart(data) {
    const svgWidth = 500, svgHeight = 200;
    const svg = d3.select("#chart").append("svg").attr("width", svgWidth).attr("height", svgHeight);
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (svgWidth / data.length))
        .attr("y", d => svgHeight - d * 2)
        .attr("width", svgWidth / data.length - 2)
        .attr("height", d => d * 2)
        .attr("fill", "teal");
}

function displayPieChart(data) {
    const svgWidth = 500, svgHeight = 500, radius = Math.min(svgWidth, svgHeight) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie();
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
    const svg = d3.select("#chart").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);
    svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .append("path")
        .attr("d", arc)
        .style("fill", (d, i) => color(i));
}

function displayBoxPlot(data) {
    const svgWidth = 500, svgHeight = 500;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#chart").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Calculate quartiles, median, min, max
    const sortedData = data.sort(d3.ascending);
    const q1 = d3.quantile(sortedData, 0.25);
    const median = d3.quantile(sortedData, 0.5);
    const q3 = d3.quantile(sortedData, 0.75);
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];

    // Scales
    const yScale = d3.scaleLinear()
        .domain([0, 100]) // Assuming data is in the 0-100 range; adjust if necessary
        .range([height, 0]);

    // Draw box plot
    svg.append("line")
        .attr("x1", width / 2)
        .attr("x2", width / 2)
        .attr("y1", yScale(min))
        .attr("y2", yScale(max))
        .attr("stroke", "black");

    svg.append("rect")
        .attr("x", width / 4)
        .attr("y", yScale(q3))
        .attr("height", yScale(q1) - yScale(q3))
        .attr("width", width / 2)
        .attr("stroke", "black")
        .style("fill", "none");

    svg.append("line")
        .attr("x1", width / 4)
        .attr("x2", width * 3 / 4)
        .attr("y1", yScale(median))
        .attr("y2", yScale(median))
        .attr("stroke", "black");
}

function nextTrial() {
    if (totalQuestions >= chartSequence.length) {
        displayResult(); // Display the results after the last trial
        // Optionally, you could reset the experiment here or offer the user a button to start over.
    } else {
        const data = generateData();
        displayChart(data);
    }
}

function displayResult() {
    // Hide experiment elements
    document.getElementById('chartArea').style.display = 'none';
    document.getElementById('responseForm').style.display = 'none';

    // Create a results section or use an existing div
    let resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'results';
        document.body.appendChild(resultsDiv);
    } else {
        // Clear previous results if the div already exists
        resultsDiv.innerHTML = '';
    }

    let resultContent = '<h3>Experiment Results</h3><table border="1"><tr><th>Chart Type</th><th>Your Input (%)</th><th>Correct Value (%)</th></tr>';
    userInputs.forEach((input, index) => {
        const data = correctResults[index];
        const min = Math.min(...data); // Smallest value
        const max = Math.max(...data); // Largest value
        const percentage = (min / max) * 100; // Correct calculation for percentage
        const correctValue = percentage.toFixed(2) + '%'; // Format to two decimal places and add '%'

        resultContent += `<tr><td>${chartSequence[index]}</td><td>${input}</td><td>${correctValue}</td></tr>`;
    });
    resultContent += '</table>';
    resultsDiv.innerHTML = resultContent;
}
