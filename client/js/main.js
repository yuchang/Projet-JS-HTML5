var onloadHandler = function(){
	biblio.notebookInit();
	
	$(".dropdown").dropdown();
	$("#navH").activeBtn("active");
	$("#navR").activeBtn("active");
};

window.addEventListener("load",onloadHandler,false);


