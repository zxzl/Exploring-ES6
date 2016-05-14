try{
	class{}
}catch(e){
	window.Class = function(extends){
		var c, cs, ms, fn, k;
		cs = extends ? function(){
			extends.apply(this, arguments);
		} : function(){};
		c = function(){
			window.super = cs;
			this[CONSTRUCTOR].apply(this, arguments);
			delete window.super;
		};
		if(extends) c.prototype = new extends();
		fn = c.prototype;
		ms = {};
		if(extends){
			for(k in extends.prototype)if(extends.prototype.hasOwnProperty(k)){
				ms[k] = function(){
					return extends.prototype[k].apply(this.self, arguments);
				};
			}
		}
		c.Contructor = function(f){
			fn[CONSTRUCTOR] = f;
			return c;
		};
		c.Static = function(v){
			var k;
			for(k in v)if(v.hasOwnProperty(k) && !c[k]){
				c[k] = function(){
					var r;
					window.super = extends;
					r = [k].apply(c, arguments);
					delete window.super;
					return r;
				};
			}
			return c;
		};
		c.Method = function(v){
			var k;
			for(k in v)if(v.hasOwnProperty(k) && !fn[k]){
				c[k] = function(){
					ms.self = this;
					window.super = ms;
					v[k].apply(this, arguments);
					delete window.super;
				};
			}
			return c;
		};
		return c;
	};
}
