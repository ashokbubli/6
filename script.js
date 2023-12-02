fetch("repository_metadata.json")
    .then(function (response) {
        const lastModified = new Date(response.headers.get('Last-Modified'));

        return response.json()
            .then(function (metadata) {
                let placeholder = document.querySelector("#data-output");
                let filterRepositoryInput = document.querySelector("#filter-repository");
                let filterApplicationInput = document.querySelector("#filter-application");
                let filterRow = document.getElementById("filter-row");
                let totalRepositoriesElement = document.getElementById("total-repositories");
                let lastUpdatedElement = document.getElementById("last-updated");

                function applyFilter() {
                    let filterRepositoryValue = filterRepositoryInput.value.toLowerCase();
                    let filterApplicationValue = filterApplicationInput.value.toLowerCase();

                    let filteredMetadata = Object.keys(metadata).filter(key =>
                        key.toLowerCase().includes(filterRepositoryValue) &&
                        (metadata[key].application !== undefined && metadata[key].application !== null && metadata[key].application.toLowerCase().includes(filterApplicationValue))
                    );

                    let out = "";
                    filteredMetadata.forEach(key => {
                        let item = metadata[key];

                        out += "<tr>";
                        out += `<td>${key}</td>`;
                        out += `<td>${item.application || "N/A"}</td>`;
                        out += `<td>${item.contacts ? item.contacts["it-owner"] || "" : ""}</td>`;
                        out += `<td>${item.contacts ? (item
