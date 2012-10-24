(function(window){
var biblio = function(){};

biblio.notebookInit = function(){
	var btnNotebook = document.getElementById("notebookButton");
	var textarea = document.getElementById("notebookTextarea");
	
	var openNotebook = function(){
		btnNotebook.style.display = "none";
		textarea.style.display = "";
		textarea.value = localStorage.getItem("Notebook");
	};
	
	var closeNotebook = function(){
		btnNotebook.style.display = "";
		textarea.style.display = "none";
		localStorage.setItem("Notebook", textarea.value);
	};
	
	btnNotebook.addEventListener("click",openNotebook,false);
	textarea.addEventListener("dblclick",closeNotebook,false);
};

window.biblio = biblio;
})(window);