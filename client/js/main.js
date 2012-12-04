(function(window){
	Template.loadTpls([
		'notebook',
	    //Insertion de nouveaux templates ici 
	    ], function(){

		$(".dropdown").dropdown();
		$("#navH").activeBtn("active");
		$("#navR").activeBtn("active");	

		biblio.notebookInit();
		biblio.notebookActive();
		
		//To review
		biblio.canvasInit();	
	});	
})(window);


/*var onloadHandler = function(){

};

window.addEventListener("load",onloadHandler,false);*/


