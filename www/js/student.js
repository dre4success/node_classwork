
(function(){

	"use strict";

	var getElement = document.getElementById.bind(document);

	var addStudent 	= getElement("register"),
		viewStudent = getElement("students"),

		xhr         = new XMLHttpRequest();

	addStudent.addEventListener('submit', function(e) {
		e.preventDefault();

		var data 		= "",
			elements    = this.elements; //elements here is an arraylike object
		
	//borrowing array to loop through the array like elements	
	Array.prototype.forEach.call(elements, function(v, i, a) {
			data += encodeURIComponent(v.name);
			data += "=";
			data += encodeURIComponent(v.value);
			data += "&";		

		})

		data = data.substring(0, data.length-1);

		xhr.open("POST", "http://192.168.33.71:3000/api/v1/students");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function(){
			handleResponse(xhr);
		};
		
		xhr.send(data);


	}, false);

	function handleResponse(http) {
		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {
				var student = JSON.parse(http.responseText);
				
				if(student.hasOwnProperty("_id")) {
					window.location = "trial.html";
					
				}
			}
		}
	}

	/*viewStudent.addEventListener('click', function(e){
		e.preventDefault()

		xhr.open("GET", "http://192.168.33.71:3000/api/v1/students");
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

		xhr.onreadystatechange = function(){
			console.log(student);
			handleResponseFetch(xhr);
		};
		
		xhr.send(data);
	}, false);

	function handleResponseFetch(http){
		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {
				var student = JSON.parse(http.responseText);


				var ul = document.getElementByID("students-list");

				var li = createElement('li');
				var txt = createTextNode(student);

				li.appendChild(txt);
				ul.appendChild(li);


			}
		}
	} */

})();