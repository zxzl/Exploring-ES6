if(!window.Set) (function(){
	var SET = Symbol(), Set = function(a){
		var set = this[SET] = [], self = this;
		if(a instanceof Array) a.forEach(function(v){self.add(v);});
		Object.freeze(this);
	}, fn = Set.prototype;
	fn.has = function(v){return this[SET].indexOf(v) != -1;};
	fn.add = function(v){if(!this.has(v)) this[SET].push(v);};
	fn.del = function(v){if(this.has(v)) this[SET].splice(this[SET].indexOf(v), 1);};
	window.Set = Set;
})();
