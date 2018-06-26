function search(choice)								//Primary Function that checks on validity of the search argument.
{
	var parameter_id;
	var typeArray = ['Games','Books','Electronics','Snacks & Drinks','Fruits & Veggies'];
	var promise = new Promise(function(resolve,reject)
	{
		if(choice == 1)
		{
			parameter_id = document.getElementById("search_bar_id").value;
			if(parameter_id > 0 && parameter_id <=100)
				resolve(1);
			else
				reject("The Entered ID does not exist. Please Try Again. ");
		}	
		else if(choice == 2)
		{
			parameter_id = document.getElementById("search_bar_type").value;
			if(typeArray.includes(parameter_id))
				resolve(2);
			else
				reject("The Entered Product Type Does Not Exist. Please Choose Games,Books,Electronics,Snacks & Drinks or Fruits & Veggies ");
		}
		else if(choice == 3)
		{
			parameter_id = document.getElementById("search_bar_price").value;
			if(isNaN(parameter_id)== false)
				resolve(3);
			else
				reject("The Entered Price is not a Number. Please Try Again");
		}
	});
	var promise2 = promise.then(function(type)
	{	
		if(type==1)
			examine(parameter_id);
		else if(type==2)
			similar_type(parameter_id);
		else if(type==3)
		{
			similar_price(parameter_id);
		}
	}).catch(function(error)
	{
		alert(error);
	});
}
function examine(parameter_id)											//To show values in the Searched Product Details section
{
	document.getElementById("product_id").innerHTML = parameter_id;	
	document.getElementById("product_price").innerHTML = document.getElementById("price_"+parameter_id).innerHTML;
	document.getElementById("product_type").innerHTML = document.getElementById("type_"+parameter_id).innerHTML;	
	similar_id(parameter_id);
}
function similar_type(parameter_id)										//Function to fetch records of similar type
{
	deleteSimilar();
	var similar_array = [];
	var promise =  new Promise(function(resolve,reject)
	{
		var i = 1;
		while(i <= 100)
		{
			if(parameter_id == document.getElementById("type_"+i).innerHTML )
					similar_array.push(i);							//Records required are pushed onto an array
			i++;	
		}
		if(similar_array.length > 0)
			resolve(similar_array);
		else
			reject("No Products found in given Type");
	});
	promise.then(function(result)
	{
		result.forEach(similarInject);								//The similar records are now pushed onto the table one at a time
	}).catch(function(error)
	{
		alert(error);
	});
	return promise;
}
function deleteSimilar()											//Function that deletes the previous records under Similar Table and create thead again
{
	var list_prod_sim  = document.getElementById("list_prod_sim");
	while(list_prod_sim.firstChild)
		list_prod_sim.removeChild(list_prod_sim.firstChild);
	
	var tr = document.createElement("tr");
	var th1 = document.createElement("th");
	var th2 = document.createElement("th");
	var th3 = document.createElement("th");
	var th4 = document.createElement("th");
	th1.innerHTML = "Product ID";
	th2.innerHTML = "Product Type";
	th3.innerHTML = "Product Price";
	th4.innerHTML = "Examine";
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	tr.appendChild(th4);
	list_prod_sim.appendChild(tr);	
}
function similarInject(parameter_id)										//Function that injects values into the Similar Product Table based on ID's passed to it.
{
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	var td4 = document.createElement("td");
	var td_button = document.createElement("button");
	
	tr.setAttribute("id",parameter_id);
	td1.innerHTML = parameter_id;
	td2.innerHTML = document.getElementById("type_"+parameter_id).innerHTML;
	td3.innerHTML = document.getElementById("price_"+parameter_id).innerHTML;
	td_button.innerHTML ="Examine";
	td_button.setAttribute("onclick","examine("+parameter_id+")");
	
	td4.appendChild(td_button);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);	

	document.getElementById("list_prod_sim").appendChild(tr);	
}
function similar_price(parameter_id)								//Function to search for Similar Products based on Price
{
	deleteSimilar();	
	var similar_array = [];	
	var promise =  new Promise(function(resolve,reject)
	{
		var i = 1;
		while(i <= 100)
		{
			if(Math.abs(parameter_id - document.getElementById("price_"+i).innerHTML) <= 50)		//Condition for the Product to be chosen
				similar_array.push(i);
			i++;	
		}
		if(similar_array.length > 0)
			resolve(similar_array);
		else
			reject("There are no Products in the given Price Range");
	});
	promise.then(function(result)
	{
		result.forEach(similarInject);
	}).catch(function(error)
	{
		alert(error);
	});
	return promise;	
}
function similar_id(parameter_id)											//Function to fetch similar records of Price and Type
{
	var similar_array = [];	
	var prod_type = document.getElementById("type_"+parameter_id).innerHTML;
	var prod_price = document.getElementById("price_"+parameter_id).innerHTML;
	var promise =  new Promise(function(resolve,reject)
	{
		resolve(parameter_id);
	});
	promise.then(function(result)
	{
		return Promise.all([similar_price(prod_price),similar_type(prod_type)]);	//Running multiple promises at a time
	}).then(function(result)
	{
		similar_array
		price_similar = result[0];												//Array that contains similar products based on Price
		type_similar = result[1];												//Array that contains similar products based on Type
		price_similar.forEach(function(price_obj)
		{
			type_similar.forEach(function(type_obj)
			{
				if(price_obj == type_obj && price_obj != parameter_id)			//Getting records that have SAME ID's from both arrays
					similar_array.push(price_obj);
			});
		});
		return similar_array;
	}).then(function(result)
	{
		deleteSimilar();
		result.forEach(similarInject);
	}).catch(function(error)
	{
		alert("error");
	});
}