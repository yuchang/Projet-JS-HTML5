(function(window){
	Template.loadTpls([
		'templates/topbar',
		'templates/notebook',
		'server/actualites1', 
	    ], function(){
	    	
	    $("#topbar").innerHTML = Template.get("templates/topbar");

		$(".dropdown").dropdown();
		$("#navH").activeBtn("active");
		$("#navR").activeBtn("active");

		biblio.notebookInit();
		biblio.notebookActive();

		//History API
		if("actualites.html" === window.location.href.split("/").pop()){
			$("#article").innerHTML = Template.get("server/actualites1");
			setupHistoryClicks();
		}

		//Canvas
		if("image.html" === window.location.href.split("/").pop()){
			biblio.canvasInit();
		}
	});
})(window);


