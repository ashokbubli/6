fetch("repository_metadata.json")
    .then(function (response) {
        // Extract the Last-Modified header from the response
        const lastModified = new Date(response.headers.get('Last-Modified'));

        return response.json()
            .then(function (metadata) {
                let placeholder = document.querySelector("#data-output");
                let infoContainer = document.getElementById("info-container");
                let totalRepositoriesElement = document.getElementById("total-repositories");
                let lastUpdatedElement = document.getElementById("last-updated");

                let out = "";

                function applyFilter() {
                    let filteredMetadata = Object.keys(metadata);

                    out = "";
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

                    // Display Last updated information
                    lastUpdatedElement.innerHTML = `Last updated: ${lastModified.toLocaleString()}`;
                }

                // Initial rendering
                applyFilter();
            });
    });
