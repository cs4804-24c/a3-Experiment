// Function to save results to a csv file
function saveResults() {
  // Prepare CSV header
  let csv = "TrialNumber,TruePercentage,YourAnswer,Accuracy\n";
  // Iterate over resultsArray and format each result as a CSV row
  resultsArray.forEach(function (result, index) {
    // Parse relevant information from the result string
    const regex =
      /True Percentage: (\d+\.\d+), Your Answer: (\d+\.\d+), Accuracy: (\d+\.\d+)/;
    const match = result.match(regex);
    if (match) {
      const truePercentage = parseFloat(match[1]);
      const yourAnswer = parseFloat(match[2]);
      const accuracy = parseFloat(match[3]);

      // Add formatted row to CSV
      csv += `${index + 1},${truePercentage},${yourAnswer},${accuracy}\n`;
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