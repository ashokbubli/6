fetch("repository_metadata.json")
    .then(function (response) {
        // Extract the Last-Modified header from the response
        const lastModified = new Date(response.headers.get('Last-Modified'));

        return response.json()
            .then(function (metadata) {
                let placeholder = document.querySelector("#data-output");
                let filterRepositoryInput = document.querySelector("#filter-repository");
                let filterApplicationInput = document.querySelector("#filter-application");
                let filterRow = document.getElementById("filter-row");
                let infoContainer = document.getElementById("info-container");
                let totalRepositoriesElement = document.getElementById("total-repositories");
                let lastUpdatedElement = document.getElementById("last-updated");

                let out = "";

                function applyFilter() {
                    let filterRepositoryValue = filterRepositoryInput.value.toLowerCase();
                    let filterApplicationValue = filterApplicationInput.value.toLowerCase();

                    let filteredMetadata = Object.keys(metadata).filter(key =>
                        key.toLowerCase().includes(filterRepositoryValue)
                    );

                    out = "";
                    filteredMetadata.forEach(key => {
                        let item = metadata[key];

                        out += "<tr>";
                        out += `<td>${key}</td>`;
                        out += `<td>${item.application || ""}</td>`;
                        out += `<td>${item.contacts ? item.contacts["it-owner"] || "" : ""}</td>`;
                        out += `<td>${item.contacts ? item.contacts["key-expert"] ? item.contacts["key-expert"].join(', ') : "" : ""}</td>`;
                        out += `<td>${item.contacts ? item.contacts["hosted-env"] || "" : ""}</td>`;
                        out += `<td>${item.contacts ? item.contacts.accessibility || "" : ""}</td>`;
                        out += `<td>${item.servicenow ? item.servicenow["business-service-name"] || "" : ""}</td>`;
                        out += "</tr>";
                    });

                    placeholder.innerHTML = out;
                    totalRepositoriesElement.innerHTML = `Total number of Repositories = ${filteredMetadata.length}`;

                    // Display Last updated information
                    lastUpdatedElement.innerHTML = `Last updated: ${lastModified.toLocaleString()}`;
                }

                // Initial rendering
                applyFilter();

                // Add event listeners for real-time filtering
                filterRepositoryInput.addEventListener("input", applyFilter);

                // Function to toggle filter row visibility for Repository
                window.toggleFilterRepository = function () {
                    filterRow.style.display = (filterRow.style.display === "none") ? "table-row" : "none";
                    filterRepositoryInput.focus();
                };

                // Function to toggle filter row visibility for Application
                window.toggleFilterApplication = function () {
                    filterRow.style.display = (filterRow.style.display === "none") ? "table-row" : "none";
                    filterApplicationInput.focus();
                };

                filterApplicationInput.addEventListener("input", applyFilter);

                // Event listener for the arrow icons
                document.getElementById("filter-arrow").addEventListener("click", window.toggleFilterRepository);
                document.getElementById("filter-arrow-app").addEventListener("click", window.toggleFilterApplication);
            });
    });
