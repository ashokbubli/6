fetch("repository_metadata.json")
	.then(function(response){
		return response.json();
	})
	.then(function(metadata){
		let placeholder = document.querySelector("#data-output");
		let out = "";

		for(let item of metadata){
			out += `
				<tr>
					<td>${item.Repository}</td>
					<td>${item.Application}</td>
					<td>${item["IT Owner"]}</td>
					<td>${item["Key Expert"]}</td>
					<td>${item["Hosted Environment"]}</td>
					<td>${item.Accessibility}</td>
					<td>${item["Business Service Name"]}</td>
				</tr>
			`;
		}

		placeholder.innerHTML = out;
	});
