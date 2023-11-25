fetch("repository_metadata.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (metadata) {
        let placeholder = document.querySelector("#data-output");
        let out = "";

        for (let repoName in metadata) {
            if (metadata.hasOwnProperty(repoName)) {
                let repoData = metadata[repoName];

                out += `
                    <tr>
                        <td>${repoName}</td>
                        <td>${repoData.application}</td>
                        <td>${repoData.contacts["it-owner"]}</td>
                        <td>${repoData.contacts["key-expert"].join(', ')}</td>
                        <td>${repoData.contacts["hosted-env"]}</td>
                        <td>${repoData.contacts.accessibility}</td>
                        <td>${repoData.supports["business-service-name"]}</td>
                    </tr>
                `;
            }
        }

        placeholder.innerHTML = out;
    });
