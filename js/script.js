var portafolio = {};

function loadJSON(callback) { 
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'js/list_projects.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
}

var projects = [];

loadJSON(function(response){
	projects = JSON.parse(response);
	console.log(projects[0]);
});

