
(function() {
	"use strict";

	var getElement = document.getElementById.bind(document);

	var loginForm = getElement('login');


	var regForm 	= getElement("register"),

		xhr         = new XMLHttpRequest();

	regForm.addEventListener('submit', function(e) {
		e.preventDefault();

		var data 		= "",
			elements    = this.elements; //elements here is an arraylike object
		
	//borrowing array to loop through the array like elements	
	Array.prototype.forEach.call(elements, function(v, i, a) {
			data += encodeURIComponent(v.name);
			data += "=";
			data += encodeURIComponent(v.value);
			data += "&";		

		});

		data = data.substring(0, data.length-1);

		xhr.open("POST", "http://192.168.33.71:3000/api/v1/user");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function(){
			handleResponse(xhr);
		};
		
		xhr.send(data);


	}, false);

	function handleResponse(http) {
		if(http.readyState === 4) {
			if(http.status === 200 || http.status === 304) {
				var user = JSON.parse(http.responseText);
				
				if(user.hasOwnProperty("_token")) {
					regForm.classList.toggle("hide");
					loginForm.classList.toggle("hide");
				}
			}
		}
	}

	loginForm.addEventListener('submit', function(e){
		e.preventDefault();

		var data 		= {},
			elements    = this.elements; //elements here is an arraylike object
		
	//borrowing array to loop through the array like elements	
	Array.prototype.forEach.call(elements, function(v, i, a) {
			data[encodeURIComponent(v.name)] = encodeURIComponent(v.value);		

		});
	

		xhr.open("POST", "http://192.168.33.71:3000/api/v1/auth");
		xhr.setRequestHeader("Content-Type", "Application/json");

		xhr.onreadystatechange = function(){
			handleResponseLogin(xhr);
		};

		xhr.send(JSON.stringify(data));	

	}, false);

	function handleResponseLogin(http) {

		if(http.readyState === 4){
			if(http.status === 200 || http.status === 304) {
				var user = JSON.parse(http.responseText);

				if(user.hasOwnProperty("_token")){		
					localStorage.setItem("token", user._token);
					window.location = "dashboard.html";
				}
			}
		}
	}

})();