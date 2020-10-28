const lga = document.querySelector("#lga");

const tableBody = document.querySelector("#lga-table tbody");
const tableHead = document.querySelector("#lga-table thead");

const puArr = [];
document.addEventListener("DOMContentLoaded", function () {
	fetch("http://dincom.herokuapp.com/lga")
		.then(res => res.json())
		.then(lgaData => loadSelect(lgaData["result"]));
});

//Load LGA names
function loadSelect(data) {
	let lgaName = "";
	data.forEach(el => {
		lgaName += `<option value=${el.lga_id}>${el.lga_name}</option>`;
	});

	lga.innerHTML = "<option selected>Choose...</option>" + lgaName;
}

//on Select
lga.addEventListener("change", loadTable);

async function loadTable() {
	const selectedlga = lga.value;
	// const res = await fetch("http://dincom.herokuapp.com/lgar");
	// lgarData = await res.json();

	const puRes = await fetch("http://dincom.herokuapp.com/pu");
	const puData = await puRes.json();

	const pu = puData["result"].filter(item => {
		return item.lga_id == selectedlga;
	});
	pu.forEach(el => puArr.push(el["polling_unit_id"]));

	const purRes = await fetch("http://dincom.herokuapp.com/pur");
	purData = await purRes.json();

	const pur = purData["result"].filter((item, i) => {
		return item.polling_unit_uniqueid === puArr[i];
	});

	// let thHtml = '<th scope="col">polling Unit</th>';
	// pur.map(
	// 	res =>
	// 		(thHtml += `<tr>
	// 	    <th scope="col">${res.party_abbreviation}</th>
	// 	    <td>${res.party_score}</td>

	// 	  </tr>`)
	// );
	// tableHead.innerHTML = thHtml;

	let tbHtml = "";

	pu.map(
		res =>
			(tbHtml += `<tr>
    <th scope="row">${res.polling_unit_name}</th>
 
  
  </tr>`)
	);

	tableBody.innerHTML = tbHtml;
}
