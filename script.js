fetch("repository_metadata.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (metadata) {
        let placeholder = document.querySelector("#data-output");
        let out = "";

        for (let repo of metadata.repositories) {
            let keyExpert = repo.Contacts["Key-Expert"].join(", ");

            out += `
                <tr>
                    <td>${repo.Repository_name}</td>
                    <td>${repo.Application}</td>
                    <td>${repo.Contacts["IT Owner"]}</td>
                    <td>${keyExpert}</td>
                    <td>${repo.Contacts["Hosted Environment"]}</td>
                    <td>${repo.Contacts.Accessibility}</td>
                    <td>${repo.BMC["Business Service Name"]}</td>
                </tr>
            `;
        }

        placeholder.innerHTML = out;
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });
