export function saveFile(){
    // Get the data from each element on the form.
    const selection = document.getElementById("selection");

    // This variable stores all the data.
    let data = "\r 1," + selection.value + "\n";
    console.log(data); //printing form data into the console
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: "text/plain" });    
    fs.writeFile('/storage.csv', textToBLOB, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
    };