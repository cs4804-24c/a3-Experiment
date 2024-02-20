// Function to save results to a csv file
function saveResults() {
  // Prepare CSV header
  let csv = "TrialNumber,TruePercentage,YourAnswer,Error\n";
  // Iterate over resultsArray and format each result as a CSV row
  resultsArray.forEach(function (result, index) {
    // Parse relevant information from the result string
    const regex =
      /True Percentage: (\d+\.\d+), Your Answer: (\d+\.\d+), Error: (\d+\.\d+)/;
    const match = result.match(regex);
    if (match) {
      const truePercentage = parseFloat(match[1]);
      const yourAnswer = parseFloat(match[2]);
      const error = parseFloat(match[3]);

      // Add formatted row to CSV
      csv += `${index + 1},${truePercentage},${yourAnswer},${error}\n`;
    }
  });
  // Create a Blob containing the CSV data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Trigger file download
  if (navigator.msSaveBlob) {
    // For IE 10+
    navigator.msSaveBlob(blob, "all_trial_results.csv");
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "all_trial_results.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  // Navigate to congrats.html
  window.location.href = "congrats.html";
}

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
    const number = Math.floor(Math.random() * 100) + 10; // Random number between 10 and 100
    data += `${section},G1,${number}\n`; // Add data row
  }

  return data;
}

function generateRandomJSON() {
  const data = {
    name: "world",
    children: [
      {
        name: "Asia",
        color: "#00203FFF",
        children: [
          { name: "S1", weight: generateRandomNumber(), code: "S1" },
          { name: "S2", weight: generateRandomNumber(), code: "S2" },
          { name: "S3", weight: generateRandomNumber(), code: "S3" },
          { name: "S4", weight: generateRandomNumber(), code: "S4" },
          { name: "S5", weight: generateRandomNumber(), code: "S5" },
          { name: "S6", weight: generateRandomNumber(), code: "S6" },
          { name: "S7", weight: generateRandomNumber(), code: "S7" },
          { name: "S8", weight: generateRandomNumber(), code: "S8" },
          { name: "S9", weight: generateRandomNumber(), code: "S9" },
          { name: "S10", weight: generateRandomNumber(), code: "S10" },
        ],
      },
    ],
  };

  return data;
}

// generate random number from 10 to 100
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 10;
}
