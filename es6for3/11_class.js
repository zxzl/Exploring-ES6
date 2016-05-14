try{
	class{}
}catch(e){
	(function(){
	var cls;
	cls = function(extends){
		var c, cs;
		cs = extends ? function(){
			extends.apply(this, arguments);
		} : function(){};
		c = function(){
			window.super = s;
			this[CONSTRUCTOR].apply(this, arguments);
			delete window.super;
		}
		if(extends) c.prototype = new extends();
		c.Static = function(v){
			var k;
			for(k in v)if(v.hasOwnProperty(k)){
				c[k] = function(){
					
				};
			}
		}
	}

	window.Class = cls
	})();
}
