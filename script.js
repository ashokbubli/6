function applyFilter() {
    let filterRepositoryValue = filterRepositoryInput.value.toLowerCase();
    let filterApplicationValue = filterApplicationInput.value.toLowerCase();

    let filteredMetadata = Object.keys(metadata).filter(key => {
        let item = metadata[key];
        let repositoryValue = key.toLowerCase();
        let applicationValue = item.application !== null ? item.application.toLowerCase() : "";

        // Include blank cells in the search
        return (repositoryValue.includes(filterRepositoryValue) || filterRepositoryValue === "") &&
            ((applicationValue.includes(filterApplicationValue) || filterApplicationValue === "") || filterApplicationValue === "null");
    });

    let out = "";
    filteredMetadata.forEach(key => {
        let item = metadata[key];

        out += "<tr>";
        out += `<td>${key}</td>`;
        out += `<td>${item.application !== null ? item.application : ""}</td>`;
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
