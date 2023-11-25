fetch("repository_metadata.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (metadata) {
        let placeholder = document.querySelector("#data-output");
        let out = "";

        for (let repoName in metadata) {
            let repoData = metadata[repoName];
            let keyExpert = repoData.Contacts["Key-Expert"].join(", ");

            out += `
                <tr>
                    <td>${repoName}</td>
                    <td>${repoData.Application}</td>
                    <td>${repoData.Contacts["IT Owner"]}</td>
                    <td>${keyExpert}</td>
                    <td>${repoData.Contacts["Hosted Environment"]}</td>
                    <td>${repoData.Contacts.Accessibility}</td>
                    <td>${repoData.BMC["Business Service Name"]}</td>
                </tr>
            `;
        }

        placeholder.innerHTML = out;
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });
