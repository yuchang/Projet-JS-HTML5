Utility = {
	extend : function(c,p){
		var c = c || {};
		for (var i in p) {
			if (typeof p[i] === 'object') {
			c[i] = (p[i].constructor === Array) ? [] : {};
			Utility.extend(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;		
	}
}

Template = {

    tpls: {},
 
    loadTpls: function(views, callback) {
        var self = this;
        var loadTpl = function(index) {
            var view = views[index];
            console.log("Loading : " + view);
            new Ajax.Request("templates/" + view + ".html",{
            	method : 'get',
				onSuccess : function(template){
					self.tpls[view] = template.responseText;
                	++index < views.length ? loadTpl(index):callback();
				},
				onFailure : function(){
					console.log("Loading FAILED: " + view);
				}
            });

        };
        loadTpl(0); //demarrage de chargement, de facon recursive
    },

    get: function(view) {
        return this.tpls[view];
    }
};





(function(window) {
	/*
	 * search the content in the window
	 */
	var document = window.document;
	var _el = document.getElementsByTagName("*");
	var foo = function(selector) {
		if (!(this instanceof foo))
			return new foo.prototype.init(selector);
	}

	var exprId = /#[\w\W]+/, exprClass = /\.[\w\W]+/;
	foo.prototype = {
		constructor : foo,
		init : function(selector) {
			if (!selector) {
				return this;
			}
			if (typeof selector === "string") {
				if (exprId.exec(selector)) {
					return document.getElementById(selector.substr(1));
				}
				if (exprClass.exec(selector)) {
					for ( var i = 0; i < _el.length; i++) {
						if (_el[i].className.split(" ").contains(
								selector.substr(1))) {
							return (_el[i]);
						}
					}
				}
			}
		}
	}

	/*
	 * Test if an array contains the element given
	 */
	Array.prototype.contains = function(obj) {
		var i = this.length;
		while (i--) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;
	}

	HTMLElement.prototype.dropdown = function() {
		var dropmenu = this;
		document.addEventListener("click", {
			handleEvent : function(event) {
				if (event.target.parentNode == dropmenu)
					dropmenu.addClass("open");
				else
					dropmenu.removeClass("open");
			}
		}, false);
	}

	/*
	 * Test if an element has the given class
	 */
	HTMLElement.prototype.hasClass = function(cName) {
		return this.className.split(" ").contains(cName);
	}

	/*
	 * Add a class to an html element
	 */
	HTMLElement.prototype.addClass = function(cName) {
		if (!this.hasClass(cName))
			if (this.className.charAt(this.className.length - 1) == " "
					|| this.className == "")
				this.className += cName;
			else
				this.className += (" " + cName);
	}

	/*
	 * Remove a class from an html element
	 */
	HTMLElement.prototype.removeClass = function(cName) {
		if (this.hasClass(cName)) {
			var reg = new RegExp('(\\s|^)' + cName + '(\\s|$)');
			this.className = this.className.replace(reg,"");
		}
	}

	/*
	 * Change the class of a list element to active
	 */
	HTMLElement.prototype.activeBtn = function(act) {
		var origin = this;
		var groups = this.childNodes;
		for ( var i = 0; i < groups.length; i++) {
			var btn = groups[i];
			if (btn.nodeType == 1) {
				btn.addEventListener("click", {
					handleEvent : function(event) {
						if (event.target.parentNode.parentNode == origin) {
							event.target.parentNode.addClass(act);
							for ( var i = 0; i < groups.length; i++) {
								bt = groups[i];
								if (bt.nodeType == 1 && bt != event.target.parentNode)
									bt.removeClass(act);
							}
						}
					}
				}, false);
			}
		}
	}

	window.foo = window.$ = foo;
})(window);