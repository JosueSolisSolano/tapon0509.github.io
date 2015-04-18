var portafolio = {};

//Prototype
Function.prototype.method = function(name, func){
    
    if(!this.prototype[name]){
        this.prototype[name] = func;
    } 
    return this;
};

// Cargar JSON
portafolio.loadJSON = function(callback) { 
	var obj = new XMLHttpRequest();
	obj.overrideMimeType("application/json");
	obj.open('GET', 'js/list_projects.json', true);
	obj.onreadystatechange = function () {
		if (obj.readyState == 4 && obj.status == "200") {
			callback(obj.responseText);
		}
	};
	obj.send(null);
};

// Generar Proyectos con JSON
var projects = [];
var cantidad = 8;

portafolio.generarProyectos = function(lista_proyectos){
	var result = "";
	for (var i = 0; i <= cantidad-1; i++){
		result += "<div class='project'>"+ 
					"<div class='overlay'>"+	
						"<h4>"+lista_proyectos[i].name+"</h4>"+
						"<span><a href='#modal_"+(i+1)+"'><img class='plus' src='img/plus.png'></a></span>"+
					"</div>"+
					"<div id='modal_"+(i+1)+"' class='overlay_modal'>"+
						"<div class='modalbox'>"+
							"<a href='#close' class='close'>X</a>"+
							"<h2>"+lista_proyectos[i].name+"</h2>"+
							"<p>"+lista_proyectos[i].descripcion+"</p>"+
							"<img src='"+lista_proyectos[i].imagen+"'>"+
							"<a src='#'>Ir al Sitio</a>"+
						"</div>"+
					"</div>"+
					"<img class='imagen' src='"+lista_proyectos[i].imagen+"'>"+
					"</div>";

	};
	// Imprimir proyectos
	document.getElementById("portfolio").childNodes[3].innerHTML = result;
};

// Generar y Llamar la funcion para generar los proyectos
portafolio.loadJSON(function(response){
	projects = JSON.parse(response);
	portafolio.generarProyectos(projects);
});

// Cambiar estilos al error
Element.method('cambiar', function(color, texto){
	this.innerHTML = texto;
	this.style.color = color;
	return this;
});



// Validar el Formulario
portafolio.validar = function(){
	var datos = [];
	// Valores Inputs del Formulario
	var nombre = document.getElementById('nombre').value;
	var email = document.getElementById('email').value;
	var msj = document.getElementById('msj').value;
	// Campos de Error
	var nombre_error = document.getElementById('nombre_error');
	var email_error = document.getElementById('email_error');
	var msj_error = document.getElementById('msj_error');
	// Expresion regular Email
	var emailReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

	if (nombre === "" || nombre === null || nombre.length === 0){
		nombre_error.cambiar("orange", "*Campo Requerido");

	}else if (email === "" || email === null || email.length === 0){
		email_error.cambiar("orange", "*Campo Requerido");

	}else if (!emailReg.test(email)){
		email_error.cambiar("red", "Email invalido");	

	}else if (msj === "" || msj === null || msj.length === 0){
		msj_error.cambiar("orange", "*Campo Requerido");	

	}else{
		// Reset de Inputs y Guardar datos en un arreglo
		document.getElementById('contact_form').reset();
		nombre_error.innerHTML = "";
		email_error.innerHTML = "";
		msj_error.innerHTML = "";
		submit_button.cambiar("lime", "Enviado");
		submit_button.style.border = "4px solid lime";
		datos.push(nombre, email, msj);
		console.log(datos);
		return true;
	}
}

// Onclick del boton Submit del Formulario
var submit_button = document.getElementById("submit_validar");

submit_button.onclick = function(){
	portafolio.validar();
};
