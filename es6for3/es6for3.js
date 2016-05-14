"use strict"
if(typeof Object.freeze != 'function') Object.freeze = function(v){return v;};
if(!Array.prototype.forEach)(function(){
	var fn = Array.prototype, Iter;
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
	Iter = function(v){
		this.v = v;
		this.len = v.len;
		this.curr = 0;
		this.r = {done:false};
	};
	Iter.prototype.next = function(){
		if(this.curr < this.len) this.r.value = this.v[this.curr++], this.r.done = false;
		else this.r.value = undefind, this.r.done = true;
		return this.r;
	};
	fn['@@iterator'] = function(){
		return new Iter(this);
	};
})();
if(!window.Symbol)(function(){
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
	Symbol.iterator = Object.freeze(new Sym('@@iterator'));
	
	window.Symbol = Object.freeze(Symbol);
})();
if(!window.Map) (function(){
	var MAP = Symbol(), Map = function(a){
		var map = this[MAP] = {}, self = this;
		if(a instanceof Array) a.forEach(function(v){self.set(v[0], v[1]);});
		Object.freeze(this);
	}, fn = Map.prototype;
	fn.set = function(k, v){this[MAP][k] = v;};
	fn.get = function(k){return this[MAP][k];};
	fn.has = function(k){return this[MAP].hasOwnProperty(k);};
	fn.del = function(k){delete this[MAP][k];};
	fn.entries = function(){
		var r = [], map = this[MAP], k;
		for(k in map) if(map.hasOwnProperty(k)) r[r.length] = [k, map[k]];
		return r;
	};
	fn.keys = function(){
		var r = [], map = this[MAP], k;
		for(k in map) if(map.hasOwnProperty(k)) r[r.length] = k;
		return r;
	};
	fn.values = function(){
		var r = [], map = this[MAP], k;
		for(k in map) if(map.hasOwnProperty(k)) r[r.length] = map[k];
		return r;
	};
	fn.forEach = function(f){
		var map = this[MAP], k;
		for(k in map) if(map.hasOwnProperty(k)) f(map[k], k, this);
	};
	fn[Symbol.iterator] = function(){return this.entries()[Symbol.iterator]();};
	window.Map = Object.freeze(Map);
})();
if(!window.WeakMap) (function(){
	var KEY = Symbol(), MAP = Symbol(), Map = function(a){
		var map = this[MAP] = {};
		if(a instanceof Array) a.forEach(function(v){self.set(v[0], v[1]);});
		Object.freeze(this);
	}, fn = Map.prototype;
	fn.set = function(k, v){this[MAP][k] = v;};
	fn.get = function(k){return this[MAP][k];};
	fn.has = function(k){return this[MAP].hasOwnProperty(k);};
	fn.del = function(k){delete this[MAP][k];};
	
	window.Map = Map;
})();
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
