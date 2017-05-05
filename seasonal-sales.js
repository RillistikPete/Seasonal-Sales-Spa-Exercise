
var prod;
var prodString;
var pasteProd = document.getElementById("paste-products");
var categ;
var pasteCateg = document.getElementById("paste-categories");
var selectbox = document.getElementById("select");


//PRODUCTS REQUEST-------------------------
var requestProd = new XMLHttpRequest();

requestProd.addEventListener("load", productsRequestLoad)
requestProd.addEventListener("error", requestFail)


function productsRequestLoad(event){
	console.log("product req running");
	var productsData = JSON.parse(event.target.responseText);
	prod = productsData;
}

requestProd.open("GET", "products.json");
requestProd.send();




//CATEGORIES REQUEST------------------------

var requestCateg = new XMLHttpRequest();

requestCateg.addEventListener("load", categRequestLoad)
requestCateg.addEventListener("error", requestFail);

function categRequestLoad(event){
	console.log("categories req running");
	var categData = JSON.parse(event.target.responseText);
	categ = categData;
	pasteToDom();
	buildSelectBox();
}

requestCateg.open("GET", "categories.json");
requestCateg.send();


function requestFail(event){
	console.log("Products request has failed");
}

//put categories in select box---------------------------

function buildSelectBox(){
console.log("categ", categ.categories.length);
	var categSelect = `<select id="selectSeason">`;
			categSelect += `<option name="season" value="Spring">Spring</option>`;
			categSelect += `<option name="season" value="Summer">Summer</option>`;
			categSelect += `<option name="season" value="Autumn">Autumn</option>`;
			categSelect += `<option name="season" value="Winter">Winter</option>`;
		categSelect += `</select>`;
 		selectbox.innerHTML += categSelect;
};

//Event listener on button for select box
var selectSeason = document.getElementById('selectSeason');
var selectOption = document.getElementsByName('season');
var discountButton = document.getElementById("button");

//Received immense amount of help from Hannah---------

discountButton.addEventListener("click", function(){
	for (var i = 0; i < prod.products.length; i++){
		//console.log("selectoption", selectOption[i].value);
		for (var n=0; n<selectOption.length; n++){
		if (selectOption[n].selected && selectOption[n].value == "Spring" && prod.products[i].category_id === 3){
			prod.products[i].price = (prod.products[i].price * .85).toFixed(2);
			console.log("works");
		} else if (selectOption[n].selected && selectOption[n].value == "Winter" && prod.products[i].category_id === 1){
			prod.products[i].price = (prod.products[i].price * .9).toFixed(2);
		} else if (selectOption[n].selected && selectOption[n].value == "Autumn" && prod.products[i].category_id === 2){
			prod.products[i].price = (prod.products[i].price * .75).toFixed(2);
		}
	}
	} pasteToDom();
});








//for (var j = 0; j < categ.categories.length; j++){
			//console.log(categ.categories[j].season_discount);

//_______________________________________________________---
//FUNCTION TO PUT IN DOM


function pasteToDom(){
	console.log("categ", categ);
	console.log("prod", prod);
	prodString = "";
	for (var j = 0; j<categ.categories.length; j++){
		console.log(categ.categories[j]);
			prodString += `<h3>${categ.categories[j].name}</h3>`

		for (var i = 0; i < prod.products.length; i++){
			console.log(prod.products[i]);
			if (prod.products[i].category_id === categ.categories[j].id){
				prodString += `<p>${prod.products[i].name}</p>`
				prodString += `<p>${prod.products[i].price}</p>`
			}

	}
		pasteProd.innerHTML = prodString;
		// if (categ.categories[j].season_discount == "Winter"){
		// }

	//} else {
		//
	}
};


		//console.log(categ.categories[j].season_discount)



//put event listeneres on categories

