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
                // ... (rest of the code remains the same)
                out += "</tr>";
            });

            placeholder.innerHTML = out;
        }

        // Initial rendering
        applyFilter();

        // Add event listener for real-time filtering
        filterInput.addEventListener("input", applyFilter);
    });
