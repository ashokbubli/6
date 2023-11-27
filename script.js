fetch("repository_metadata.json")
    .then(function(response){
        return response.json();
    })
    .then(function(metadata){
        let placeholder = document.querySelector("#data-output");
        let filterRepositoryInput = document.querySelector("#filter-repository");
        let filterApplicationInput = document.querySelector("#filter-application");
        let filterRow = document.getElementById("filter-row");
        let out = "";

        function applyFilter() {
            let filterRepositoryValue = filterRepositoryInput.value.toLowerCase();
            let filterApplicationValue = filterApplicationInput.value.toLowerCase();

            let filteredMetadata = Object.keys(metadata).filter(key =>
                key.toLowerCase().includes(filterRepositoryValue) &&
                (metadata[key].application || "").toLowerCase().includes(filterApplicationValue)
            );

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
        }

        // Initial rendering
        applyFilter();

        // Add event listeners for real-time filtering
        filterRepositoryInput.addEventListener("input", applyFilter);
        filterApplicationInput.addEventListener("input", applyFilter);

        // Function to toggle filter row visibility
        window.toggleFilter = function (filterId) {
            let otherFilterId = (filterId === 'filter-repository') ? 'filter-application' : 'filter-repository';

            let filterInput = document.getElementById(filterId);
            let otherFilterInput = document.getElementById(otherFilterId);

            otherFilterInput.value = ''; // Clear the other filter
            filterRow.style.display = (filterRow.style.display === "none") ? "table-row" : "none";
            filterInput.focus();
        };
    });
