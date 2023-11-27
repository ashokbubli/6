fetch("repository_metadata.json")
    .then(function(response){
        return response.json();
    })
    .then(function(metadata){
        let placeholder = document.querySelector("#data-output");
        let filterInput = document.querySelector("#filter-repository");
        let out = "";

        function applyFilter() {
            let filterValue = filterInput.value.toLowerCase();

            let filteredMetadata = Object.keys(metadata).filter(key =>
                key.toLowerCase().includes(filterValue)
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

        // Add event listener for real-time filtering
        filterInput.addEventListener("input", applyFilter);
    });
