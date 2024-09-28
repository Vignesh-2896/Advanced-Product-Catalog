(function (window) {
	let types = ['Games', 'Books', 'Electronics', 'Snacks & Drinks', 'Fruits & Veggies'];
	let price = 0;
	let type = '';
	setHeader("list_prod");
	for (let i = 0; i < 100; i++)										//Creating the records that will be entered in the table
	{
		price = (Math.random() * 500).toFixed(2);					//To generate a random Price
		type = types[Math.floor(Math.random() * 5)];				//To select a random Type
		let tr = document.createElement("tr");
		tr.setAttribute("id", i + 1);
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		td2.setAttribute("id", "type_" + (i + 1));
		let td3 = document.createElement("td");
		td3.setAttribute("id", "price_" + (i + 1));
		let td4 = document.createElement("td");
		let examine = document.createElement("button");
		examine.setAttribute('onclick', "examine(" + (i + 1) + ")");

		td1.innerHTML = i + 1;
		td2.innerHTML = type;
		td3.innerHTML = price;
		examine.innerHTML = "Examine";
		td4.appendChild(examine);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);

		document.getElementById("list_prod").appendChild(tr);		//Append each data row one by one
	}

	function setHeader(div_id)				//defines the thead of table of All Products Table
	{
		let tr = document.createElement("tr");
		let th1 = document.createElement("th");
		let th2 = document.createElement("th");
		let th3 = document.createElement("th");
		let th4 = document.createElement("th");
		th1.innerHTML = "Product ID";
		th2.innerHTML = "Product Type";
		th3.innerHTML = "Product Price";
		th4.innerHTML = "Examine";
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);
		document.getElementById(div_id).appendChild(tr);
	}
})(window);