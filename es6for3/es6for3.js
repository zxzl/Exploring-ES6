if(typeof Object.freeze != 'function') Object.freeze = function(v){return v;};
if(!Array.prototype.forEach)(function(){
	var fn = Array.prototype;
	fn.forEach = function(f){
		var i, j;
		for(i = 0, j = this.length; i < j; i++) f(this[i], i, this);
	};
	fn.map = function(f){
		var r = [], i, j;
		for(i = 0, j = this.length; i < j; i++) r[i] = f(this[i], i, this);
		return r;
	};
	fn.filter = function(f){
		var r = [], i, j;
		for(i = 0, j = this.length; i < j; i++) if(f(this[i], i, this)) r[r.length] = this[i];
		return r;
	};
	fn.reduce = function(){
		var f = arguments[0], r, i = 0, j = this.length;
		if(arguments.length == 2){
			r = arguments[1];
		}else{
			r = this[i++];
		}
		for(; i < j; i++) r = f(r, this[i], i, this);
		return r;
	};
})();
if(!window.Symbol) window.Symbol = (function(){
	var uuid = 0,
		Sym = function(id){this[ID] = id;},
		Symbol = function(i, v){
			return Object.freeze(new Sym('@@Symbol@@::' + (uuid++));
		},
		ID = new Sym(),
		keys = {},
		syms = {};
	Sym.prototype.toString = function(){return this[ID];},
	Symbol.for = function(k){
		if(!keys[k]) syms[keys[k] = Symbol()] = k;
		return keys[k];
	};
	Symbol.keyFor = function(s){return syms[s];};
	Symbol.iterator = Symbol();
	return symbol;
})();
if(!window.Map) window.Map = (function(){
	var MAP = Symbol(), Map = function(a){
		var map = this[MAP] = {};
		if(a instanceof Array) a.forEach(function(v){map[v[0]] = v[1];});
		Object.freeze(this);
	}, fn = Map.prototype;
	fn.set = function(k, v){this[MAP][k] = v;};
	fn.get = function(k){return this[MAP][k];};
	fn.has = function(k){return this[MAP].hasOwnProperty(k);};
})();
