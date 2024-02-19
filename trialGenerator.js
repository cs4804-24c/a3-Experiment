// set the dimensions and margins of the graph
const margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

let trialNumber = 1;
let truePercentage = 0;
// Initialize an array to store the results
let resultsArray = [];

function generateRandomCSV() {
  const sections = [
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S10",
  ];

  let data = "Section,Group,Number\nG1,,\n"; // Header row

  for (let i = 0; i < 10; i++) {
    const section = sections[i];
    const number = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    data += `${section},G1,${number}\n`; // Add data row
  }

  return data;
}

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Function to save results to a text file
function saveResults() {
  let results = resultsArray.join("\n");
  const blob = new Blob([results], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "all_trial_results.txt";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

// Event listener for form submission
document
  .getElementById("percentageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const percentage = parseFloat(document.getElementById("percentage").value);
    if (!isNaN(percentage) && trialNumber <= 6) {
      const accuracy = Math.log2(Math.abs(percentage - truePercentage) + 0.125);
      console.log("percentage: " + percentage);
      console.log("true percentage: " + truePercentage);
      console.log("accuracy: " + accuracy);

      // Add result to the array
      const result = `Trial ${trialNumber} - True Percentage: ${truePercentage.toFixed(
        2
      )}, Your Answer: ${percentage.toFixed(2)}, Accuracy: ${accuracy.toFixed(
        2
      )}`;
      resultsArray.push(result);

      if (trialNumber >= 6) {
        // load results
        saveResults();
        return;
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
  d3.csv("/CSV/csv" + trialNumber + ".csv")
    .then(function (data) {
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
            return "#69b3a2";
          }
        });
    })
    .catch(function (error) {
      //all trials complete
    });
}

loadTrial(1);
