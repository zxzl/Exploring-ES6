// if(!window.WeakSet)
(function(){
	var KEY = Symbol(), SET = Symbol(), WSet = function(a){
		var wset = this[SET] = [], self = this;
		if(a instanceof Array) a.forEach(function(v){
			if(v instanceof Object) self.add(v);
		});
		Object.freeze(this);
	}, fn = WSet.prototype;
	fn.has = function(v){return this[SET].indexOf(v) !== -1;};
	fn.add = function(v){if(!this.has(v) && v instanceof Object) this[SET].push(v);};
	fn.del = function(v){if(this.has(v)) this[SET].splice(this[SET].indexOf(v), 1);};
	window.WeakSet = WSet;
})();