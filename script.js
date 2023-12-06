document.addEventListener("DOMContentLoaded", function () {
    // Function to handle the data and update the UI
    function updateUI(metadata, lastModified) {
        let placeholder = document.querySelector("#data-output");
        let filterRepositoryInput = document.querySelector("#filter-repository");
        let filterApplicationInput = document.querySelector("#filter-application");
        let filterRow = document.getElementById("filter-row");
        let totalRepositoriesElement = document.getElementById("total-repositories");
        let lastUpdatedElement = document.getElementById("last-updated");

        function applyFilter() {
            let filterRepositoryValue = filterRepositoryInput.value.toLowerCase();
            let filterApplicationValue = filterApplicationInput.value.toLowerCase();

            let filteredMetadata = Object.keys(metadata).filter(key => {
                let item = metadata[key];
                let repositoryValue = key.toLowerCase();
                let applicationValue = (item.application || "").toLowerCase();

                return repositoryValue.includes(filterRepositoryValue) &&
                    (applicationValue.includes(filterApplicationValue) ||
                        (filterApplicationValue === "blank" && (applicationValue === "null" || applicationValue === "")));
            });

            let out = "";
            filteredMetadata.forEach(key => {
                let item = metadata[key];

                out += "<tr>";
                out += `<td>${key}</td>`;
                out += `<td>${item.application || ""}</td>`;
                out += `<td>${item.contacts ? item.contacts["it-owner"] || "" : ""}</td>`;
                out += `<td>${item.contacts ? (item.contacts["key-expert"] ? item.contacts["key-expert"].join(', ') : "") : ""}</td>`;
                out += `<td>${item.contacts ? item.contacts["hosted-env"] || "" : ""}</td>`;
                out += `<td>${item.contacts ? item.contacts.accessibility || "" : ""}</td>`;
                out += `<td>${item.servicenow ? item.servicenow["business-service-name"] || "" : ""}</td>`;
                out += "</tr>";
            });

            placeholder.innerHTML = out;
            totalRepositoriesElement.innerHTML = `Total number of Repositories = ${filteredMetadata.length}`;

            // Display the Last updated Info
            lastUpdatedElement.innerHTML = `Last updated: ${lastModified.toLocaleString()}`;
        }

        // Initial rendering
        applyFilter();

        // Add event listeners for real-time filtering
        filterRepositoryInput.addEventListener("input", applyFilter);
        filterApplicationInput.addEventListener("input", applyFilter);

        // Function to toggle filter row visibility
        window.toggleFilter = function (filterId) {
            let filterInput = document.getElementById(filterId);
            filterRow.style.display = (filterRow.style.display === "none") ? "table-row" : "none";
            filterInput.focus();
        };
    }

    // Fetch data and handle errors
    fetch("repository_metadata.json")
        .then(response => response.json())
        .then(metadata => {
            const lastModified = new Date(response.headers.get('Last-Modified'));
            updateUI(metadata, lastModified);
        })
        .catch(error => console.error('Error fetching data:', error));
});
