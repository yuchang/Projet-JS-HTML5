(function(window) {
	var biblio = function() {
	};
	
	biblio.Drawbox = function(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		// line width
		this.context.lineWidth = 2;
		// line color
		this.context.strokeStyle = '#555';
		// round corner line
		this.context.lineCap = "round";
		// mouse pressed
		this.drawing = false;
		// mouse trace
		this.his = [];
		this.timeout_draw = 0;
	};
	biblio.Drawbox.prototype = {
		constructor : biblio.Drawbox,
		
		mousedown : function(e) {
			this.drawing = true;
			var pos = this.position(this.canvas, e);
			this.his.push({
				x : pos.x,
				y : pos.y
			});
		},
		mouseup : function(e) {
			this.drawing = false;
			var pos = this.position(this.canvas, e);
			this.his.push({
				x : pos.x,
				y : pos.y,
				// mouse up end the drawing
				end : 1
			});
		},
		mousemove : function(e) {
			var _this = this;
			var pos = this.position(this.canvas, e);
			if (_this.drawing) {
				// put mouse location to the trace array
				_this.his.push({
					x : pos.x,
					y : pos.y
				});
				_this.context.beginPath();
				var l = _this.his.length;
				if (!_this.his[l - 1].end) {
					_this.context.moveTo(_this.his[l - 2].x, _this.his[l - 2].y);
					_this.context.lineTo(_this.his[l - 1].x, _this.his[l - 1].y);
					_this.context.stroke();
				}
			}
		},
		init : function() {
			var _this = this;
			_this.canvas.addEventListener('mousemove', function(e) {
				_this.mousemove(e)
			}, false);
			_this.canvas.addEventListener('mousedown', function(e) {
				_this.mousedown(e)
			}, false);
			_this.canvas.addEventListener('mouseup', function(e) {
				_this.mouseup(e)
			}, false);
		},
		// clean all the trace
		clear : function(noClearHis) {
			var _this = this;
			clearTimeout(_this.timeout_draw);
			_this.context.clearRect(0, 0, 3000, 3000);
			if (!noClearHis) {
				_this.his.length = 0;
			}
		},
		// repainting
		reDraw : function() {
			var _this = this;
			_this.clear(true);
			var i = 0;
			var length = _this.his.length;
			clearTimeout(_this.timeout_draw);
			if (length < 2) {
				return;
			}
			function draw() {
				if (!_this.his[i].end) {
					_this.context.moveTo(_this.his[i].x, _this.his[i].y);
					_this.context.lineTo(_this.his[i + 1].x, _this.his[i + 1].y);
					_this.context.stroke();
				}
				_this.timeout_draw = setTimeout(function() {
					if (i < length - 1) {
						draw();
					}
				}, 10);
				++i;
			}
			draw();
		},
		// export as a image
		toPng : function() {
			var url = this.canvas.toDataURL();
			var img = document.createElement('img');
			img.id = "temp_img";
			img.src = url;
			img.addEventListener('dragstart', function(e) {
				drag(event);
			}, false);
			if (document.getElementById("temp_box")) {
				document.getElementById("temp_box").appendChild(img);
			} else {
				// create DOM
				document.body.appendChild(img);
			}
		},
		position : function(canvas, evt) {
			// get canvas position
			var obj = canvas;
			var top = 0;
			var left = 0;
			while (obj && obj.tagName != 'BODY') {
				top += obj.offsetTop;
				left += obj.offsetLeft;
				obj = obj.offsetParent;
			}
			// return mouse position
			var mouseX = evt.clientX - left + window.pageXOffset;
			var mouseY = evt.clientY - top + window.pageYOffset;
			return {
				x : mouseX,
				y : mouseY
			};
		}
	};
	
	biblio.notebookInit = function(){
		var notebook = document.getElementById("notebook");
		notebook.innerHTML = Template.get("notebook");
	};

	biblio.notebookActive = function() {
		var btnNotebook = document.getElementById("notebookButton");
		var textarea = document.getElementById("notebookTextarea");

		var openNotebook = function() {
			btnNotebook.style.display = "none";
			textarea.style.display = "";
			textarea.value = localStorage.getItem("Notebook");
		};

		var closeNotebook = function() {
			btnNotebook.style.display = "";
			textarea.style.display = "none";
			localStorage.setItem("Notebook", textarea.value);
		};

		btnNotebook.addEventListener("click", openNotebook, false);
		textarea.addEventListener("dblclick", closeNotebook, false);
	};
	
	

	window.biblio = biblio;
})(window);