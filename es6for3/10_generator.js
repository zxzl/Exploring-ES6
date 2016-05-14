try{
	function*(){};
}catch(e){
	var YVAL = Symbol();
	(function(){
		var y = function(v){
			y[YVAL].push(v);
		};
		return y;
	})();
	window.Generator = function(f){
		return function(){
			var r = [];
			window.Yield = function(v){r[r.length] = v;};
			f();
			delete window.Yield;
			return new Iter(r);
		};
	};
};
