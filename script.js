fetch("repository_metadata.json")
    .then(function(response){
        return response.json();
    })
    .then(function(metadata){
        let placeholder = document.querySelector("#data-output");
        let out = "";

        for(let key in metadata){
            let item = metadata[key];

            // Check if the item is an object and has the expected structure
            if (typeof item === 'object' &&
                item.hasOwnProperty('application') &&
                item.hasOwnProperty('contacts') &&
                typeof item.contacts === 'object' &&
                item.contacts.hasOwnProperty('it-owner') &&
                item.contacts.hasOwnProperty('key-expert') &&
                Array.isArray(item.contacts['key-expert']) &&
                item.contacts.hasOwnProperty('hosted-env') &&
                item.contacts.hasOwnProperty('accessibility') &&
                item.hasOwnProperty('servicenow') &&
                typeof item.servicenow === 'object' &&
                item.servicenow.hasOwnProperty('business-service-name')) {

                out += `
                    <tr>
                        <td>${key}</td>
                        <td>${item.application || "Details not available"}</td>
                        <td>${item.contacts["it-owner"] || "Details not available"}</td>
                        <td>${item.contacts["key-expert"].join(', ') || "Details not available"}</td>
                        <td>${item.contacts["hosted-env"] || "Details not available"}</td>
                        <td>${item.contacts.accessibility || "Details not available"}</td>
                        <td>${item.servicenow["business-service-name"] || "Details not available"}</td>
                    </tr>
                `;
            } else {
                // Handle cases where the structure is not as expected
                out += `
                    <tr>
                        <td>${key}</td>
                        <td colspan="6">Details not available</td>
                    </tr>
                `;
            }
        }

        placeholder.innerHTML = out;
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
