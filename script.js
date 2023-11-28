function applyFilter() {
    let filterRepositoryValue = filterRepositoryInput.value.toLowerCase();
    let filterApplicationValue = filterApplicationInput.value.toLowerCase();

    let filteredMetadata = Object.keys(metadata).filter(key => {
        let item = metadata[key];
        let applicationValue = (item.application || "").toLowerCase();

        // Include rows where the "Application" column is empty or null
        let hasEmptyApplication = filterApplicationValue === "" && (applicationValue === "" || applicationValue === "null");

        // Filter based on repository and application values
        return key.toLowerCase().includes(filterRepositoryValue) &&
            (applicationValue.includes(filterApplicationValue) || hasEmptyApplication);
    });

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
