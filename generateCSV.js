const fs = require("fs");
const path = require("path");

function generateCSV(numRows, index) {
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
  const group = "G1";
  let csvContent = "Section,Group,Number\n";

  csvContent += `${group},,\n`;

  for (let i = 0; i < numRows; i++) {
    const section = sections[Math.floor(Math.random() * sections.length)];
    const number = Math.floor(Math.random() * 101); // Generates a random number between 0 and 100
    csvContent += `${section},${group},${number}\n`;
  }

  const csvFileName = `csv${index}.csv`;
  const csvFilePath = path.join(__dirname, "CSV", csvFileName);
  fs.writeFileSync(csvFilePath, csvContent);
}

// Example usage
const numRows = 10; // Number of rows in each CSV file
const numCSVs = 6; // Number of CSV files to generate

for (let i = 1; i <= numCSVs; i++) {
  generateCSV(numRows, i);
}

console.log("CSV files generated successfully");
