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

        // Add event listeners for filtering
        const filterRepository = document.getElementById('filterRepository');
        const filterApplication = document.getElementById('filterApplication');
        const filterITOwner = document.getElementById('filterITOwner');
        const filterKeyExpert = document.getElementById('filterKeyExpert');
        const filterHostedEnv = document.getElementById('filterHostedEnv');
        const filterAccessibility = document.getElementById('filterAccessibility');
        const filterBusinessService = document.getElementById('filterBusinessService');

        const rows = document.querySelectorAll('#data-output tr');

        function filterTable() {
            const repositoryValue = filterRepository.value.toLowerCase();
            const applicationValue = filterApplication.value.toLowerCase();
            const itOwnerValue = filterITOwner.value.toLowerCase();
            const keyExpertValue = filterKeyExpert.value.toLowerCase();
            const hostedEnvValue = filterHostedEnv.value.toLowerCase();
            const accessibilityValue = filterAccessibility.value.toLowerCase();
            const businessServiceValue = filterBusinessService.value.toLowerCase();

            rows.forEach(row => {
                const repository = row.children[0].textContent.toLowerCase();
                const application = row.children[1].textContent.toLowerCase();
                const itOwner = row.children[2].textContent.toLowerCase();
                const keyExpert = row.children[3].textContent.toLowerCase();
                const hostedEnv = row.children[4].textContent.toLowerCase();
                const accessibility = row.children[5].textContent.toLowerCase();
                const businessService = row.children[6].textContent.toLowerCase();

                const showRow = (
                    repository.includes(repositoryValue) &&
                    application.includes(applicationValue) &&
                    itOwner.includes(itOwnerValue) &&
                    keyExpert.includes(keyExpertValue) &&
                    hostedEnv.includes(hostedEnvValue) &&
                    accessibility.includes(accessibilityValue) &&
                    businessService.includes(businessServiceValue)
                );

                row.style.display = showRow ? '' : 'none';
            });
        }

        filterRepository.addEventListener('input', filterTable);
        filterApplication.addEventListener('input', filterTable);
        filterITOwner.addEventListener('input', filterTable);
        filterKeyExpert.addEventListener('input', filterTable);
        filterHostedEnv.addEventListener('input', filterTable);
        filterAccessibility.addEventListener('input', filterTable);
        filterBusinessService.addEventListener('input', filterTable);
    });
