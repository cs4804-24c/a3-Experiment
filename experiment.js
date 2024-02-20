document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startBtn').addEventListener('click', function() {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('chartArea').style.display = 'block';
        document.getElementById('responseForm').style.display = 'block';
        nextTrial();
    });

    document.getElementById('responseForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const userEstimate = document.getElementById('estimate').value;
        console.log(`Your estimate: ${userEstimate}%`);
        saveUserInput(userEstimate);
        nextTrial();
    });
});

let chartSequence = ['bar', 'pie', 'box', 'bar', 'pie', 'box', 'bar', 'pie', 'box'];
let totalQuestions = 0;
let userInputs = [];
let correctResults = [];

function generateData() {
    const dataSet = [];
    for (let i = 0; i < 5; i++) {
        dataSet.push(Math.floor(Math.random() * 101));
    }
    correctResults.push(dataSet);
    return dataSet;
}

function saveUserInput(input) {
    userInputs.push(input);
}

function displayChart(data) {
    d3.select("#chart").selectAll("*").remove();

    const chartType = chartSequence[totalQuestions % chartSequence.length];
    switch (chartType) {
        case 'bar':
            displayBarChart(data);
            break;
        case 'pie':
            displayPieChart(data);
            break;
        case 'box':
            displayBoxPlot(data);
            break;
        default:
            console.error('Unknown chart type:', chartType);
    }
    totalQuestions++;
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

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

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
        displayResult();
    } else {
        const data = generateData();
        displayChart(data);
    }
}

function displayResult() {
    document.getElementById('chartArea').style.display = 'none';
    document.getElementById('responseForm').style.display = 'none';

    let resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'results';
        document.body.appendChild(resultsDiv);
    } else {
        resultsDiv.innerHTML = '';
    }

    let resultContent = '<h3>Experiment Results</h3><table border="1"><tr><th>Chart Type</th><th>Your Input (%)</th><th>Correct Value (%)</th></tr>';
    userInputs.forEach((input, index) => {
        const data = correctResults[index];
        const min = Math.min(...data);
        const max = Math.max(...data);
        const percentage = (min / max) * 100;
        const correctValue = percentage.toFixed(2) + '%';

        resultContent += `<tr><td>${chartSequence[index]}</td><td>${input}</td><td>${correctValue}</td></tr>`;
    });
    resultContent += '</table>';
    resultsDiv.innerHTML = resultContent;
}
