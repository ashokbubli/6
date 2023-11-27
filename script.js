fetch("repository_metadata.json")
    .then(function(response){
        return response.json();
    })
    .then(function(metadata){
        let placeholder = document.querySelector("#data-output");
        let out = "";

        for(let key in metadata){
            let item = metadata[key];

            out += "<tr>";
            out += `<td>${key}</td>`;
            
            if (item.application !== undefined && item.application !== null) {
                out += `<td>${item.application}</td>`;
            } else {
                out += "<td></td>";
            }

            if (item.contacts !== undefined && item.contacts["it-owner"] !== undefined && item.contacts["it-owner"] !== null) {
                out += `<td>${item.contacts["it-owner"]}</td>`;
            } else {
                out += "<td></td>";
            }

            if (item.contacts !== undefined && item.contacts["key-expert"] !== undefined && item.contacts["key-expert"] !== null) {
                out += `<td>${item.contacts["key-expert"].join(', ')}</td>`;
            } else {
                out += "<td></td>";
            }

            if (item.contacts !== undefined && item.contacts["hosted-env"] !== undefined && item.contacts["hosted-env"] !== null) {
                out += `<td>${item.contacts["hosted-env"]}</td>`;
            } else {
                out += "<td></td>";
            }

            if (item.contacts !== undefined && item.contacts.accessibility !== undefined && item.contacts.accessibility !== null) {
                out += `<td>${item.contacts.accessibility}</td>`;
            } else {
                out += "<td></td>";
            }

            if (item.servicenow !== undefined && item.servicenow["business-service-name"] !== undefined && item.servicenow["business-service-name"] !== null) {
                out += `<td>${item.servicenow["business-service-name"]}</td>`;
            } else {
                out += "<td></td>";
            }

            out += "</tr>";
        }

        placeholder.innerHTML = out;
    });
