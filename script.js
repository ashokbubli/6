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
                    <td>${item.application}</td>
                    <td>${item.contacts["it-owner"]}</td>
                    <td>${item.contacts["key-expert"].join(', ')}</td>
                    <td>${item.contacts["hosted-env"]}</td>
                    <td>${item.contacts.accessibility}</td>
                    <td>${item.supports["business-service-name"]}</td>
                </tr>
            `;
        }

        placeholder.innerHTML = out;
    });
