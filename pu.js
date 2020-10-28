const pu = document.querySelector("#pu");

const puTable = document.querySelector("#pu-table tbody");

const purArr = [];

document.addEventListener("DOMContentLoaded", function () {
	fetch("http://dincom.herokuapp.com/pu")
		.then(res => res.json())
		.then(puData => loadSelect(puData["result"]));
});

//Load polling names
function loadSelect(data) {
	let puName = "";
	data.forEach(x => {
		puName += `<option value=${x.uniqueid}>${x.polling_unit_name}</option>`;
	});

	pu.innerHTML = "<option selected>Choose...</option>" + puName;
}

//on Select
pu.addEventListener("change", loadTable);

async function loadTable() {
	const selectedPu = pu.value;
	const res = await fetch("http://dincom.herokuapp.com/pur");
	purData = await res.json();

	const pur = purData["result"].filter(item => {
		return item.polling_unit_uniqueid == selectedPu;
	});
	console.log(pur);
	let purHtml = "";

	pur.map(
		res =>
			(purHtml += `<tr>
    <th scope="row">${res.party_abbreviation}</th>
    <td>${res.party_score}</td>
    <td>${res.entered_by_user}</td>
  </tr>`)
	);

	puTable.innerHTML = purHtml;
}
