fetch("repository_metadata.json")
    .then(function(response){
        return response.json();
    })
    .then(function(metadata){
        let placeholder = document.querySelector("#data-output");
        let out = "";

        for(let key in metadata){
            let item = metadata[key];

            out += `
                <tr>
                    <td>${key}</td>
                    <td>${item.application || "Details not available"}</td>
                    <td>${(item.contacts && item.contacts["it-owner"]) || "Details not available"}</td>
                    <td>${(item.contacts && item.contacts["key-expert"] && item.contacts["key-expert"].join(', ')) || "Details not available"}</td>
                    <td>${(item.contacts && item.contacts["hosted-env"]) || "Details not available"}</td>
                    <td>${(item.contacts && item.contacts.accessibility) || "Details not available"}</td>
                    <td>${(item.supports && item.supports["business-service-name"]) || "Details not available"}</td>
                </tr>
            `;
        }

        placeholder.innerHTML = out;
    });
