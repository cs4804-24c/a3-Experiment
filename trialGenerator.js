// set the dimensions and margins of the graph
const margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

let trialNumber = 1;
let truePercentage = 0;
// Initialize an array to store the results
let resultsArray = [];

// Store the generated CSV data in a variable accessible to both loadTrial and the download event listener
let currentCSVData = "";

// Save the currentCSVData after every trial
let savedCSVData = "";

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Event listener for form submission
document
  .getElementById("percentageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const percentage = parseFloat(document.getElementById("percentage").value);
    if (!isNaN(percentage) && trialNumber <= 6) {
      const error = Math.log2(Math.abs(percentage - truePercentage) + 0.125);
      console.log("percentage: " + percentage);
      console.log("true percentage: " + truePercentage);
      console.log("error: " + error);

      // Add result to the array
      const result = `Trial ${trialNumber} - True Percentage: ${truePercentage.toFixed(
        2
      )}, Your Answer: ${percentage.toFixed(2)}, Error: ${error.toFixed(2)}`;
      resultsArray.push(result);

      if (trialNumber >= 6) {
        // load results
        saveResults();
        window.location.href = "voronoitreemap.html";
      }
      trialNumber++;
      document.getElementById("trialNum").innerHTML = "Trial " + trialNumber;
      loadTrial(trialNumber);
    } else {
      alert("Please enter a valid percentage.");
    }
  });

function loadTrial(trialNumber) {
  if (trialNumber > 6) {
    return;
  }

  // Generate random CSV data for the trial
  let currentCSVData = generateRandomCSV();

  // Save the currentCSVData to the variable
  savedCSVData = currentCSVData;

  // Parse the CSV string into an array of objects
  let data = d3.csvParse(currentCSVData);

  const root = d3
    .stratify()
    .id(function (d) {
      return d.Section;
    })
    .parentId(function (d) {
      return d.Group;
    })(data);
  root.sum(function (d) {
    return +d.Number;
  });

  d3.treemap().size([width, height]).padding(4)(root);

  const randomIndexes = [];
  while (randomIndexes.length < 2) {
    const index = Math.floor(Math.random() * root.leaves().length);
    if (!randomIndexes.includes(index)) {
      randomIndexes.push(index);
    }
  }

  const selectedRectangles = root
    .leaves()
    .filter((d, i) => randomIndexes.includes(i));

  let largerDataPointArea, smallerDataPointArea;

  selectedRectangles.forEach(function (d) {
    const area = (d.x1 - d.x0) * (d.y1 - d.y0);
    if (!largerDataPointArea || area > largerDataPointArea) {
      // Update areas based on the larger rectangle
      smallerDataPointArea = largerDataPointArea;
      largerDataPointArea = area;
    } else if (!smallerDataPointArea || area > smallerDataPointArea) {
      // Update area of smaller rectangle
      smallerDataPointArea = area;
    }
  });

  console.log("Selected rectangles: ", selectedRectangles);
  console.log("Larger data point area: ", largerDataPointArea);
  console.log("Smaller data point area: ", smallerDataPointArea);
  // Calculate true percentage
  truePercentage = (smallerDataPointArea / largerDataPointArea) * 100;

  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("x", function (d) {
      return d.x0;
    })
    .attr("y", function (d) {
      return d.y0;
    })
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .style("stroke", "black")
    .style("fill", function (d, i) {
      if (randomIndexes.includes(i)) {
        return "red";
      } else {
        return "#00203FFF";
      }
    });

  // Update text labels
  svg.selectAll("text").remove(); // Remove existing text labels
  // Add text to rectangles - In Progress
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", function (d) {
      return d.x0 + 10;
    }) // +10 to adjust position (more right)
    .attr("y", function (d) {
      return d.y0 + 10;
    }) // +20 to adjust position (lower)
    .text(function (d) {
      return d.data.Section;
    })
    .attr("text-anchor", "middle") // Center the text horizontally
    .attr("dominant-baseline", "middle") // Center the text vertically
    .attr("font-size", "12px")
    .attr("fill", "white");

  // Save the currentCSVData after every trial
  saveCurrentCSVData(currentCSVData);
}

loadTrial(1);

// Function to save the currentCSVData after every trial
function saveCurrentCSVData(csvData) {
  savedCSVData = csvData;
  console.log("Saved CSV data: \n", savedCSVData);
}

// Event listener for download button
document
  .getElementById("downloadCSVButton")
  .addEventListener("click", function () {
    triggerDownload();
  });

// Function to trigger the download with the current CSV data
function triggerDownload() {
  // Check if CSV data is available
  if (savedCSVData) {
    downloadCSV(savedCSVData, "generated_data.csv");
  } else {
    console.error("No CSV data available for download.");
  }
}

// Function to download CSV
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
