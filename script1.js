document.addEventListener("DOMContentLoaded", function () {
    // Replace this URL with the correct path to your JSON file
    const jsonDataUrl = "repository_metadata.json";

    // Fetch the JSON data
    fetch(jsonDataUrl)
        .then(response => response.json())
        .then(data => {
            // Call a function to populate the table with the JSON data
            populateTable(data);
        })
        .catch(error => console.error("Error fetching JSON:", error));
});

function populateTable(data) {
    const tableBody = document.getElementById("data-output");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate through the JSON data and create table rows
    data.forEach(item => {
        const row = document.createElement("tr");

        // Modify the keys based on your JSON structure
        const keys = ["repository", "application", "itOwner", "keyExpert", "hostedEnvironment", "accessibility", "businessServiceName"];

        keys.forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}
