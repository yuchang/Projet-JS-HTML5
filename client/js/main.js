(function(window){
	Template.loadTpls([
		'livre',
		'notebook',
	    //Insertion de nouveaux templates ici 
	    ], function(){
	    	
	    biblio.canvasInit();
		biblio.notebookInit();
		biblio.notebookActive();
		
		$(".dropdown").dropdown();
		$("#navH").activeBtn("active");
		$("#navR").activeBtn("active");		
	});	
})(window);


/*var onloadHandler = function(){

};

window.addEventListener("load",onloadHandler,false);*/


