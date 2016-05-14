"use strict"
if(typeof Object.freeze != 'function') Object.freeze = function(v){return v;};
if(!window.Symbol)(function(){
	var uuid = 0,
		Sym = function(id){this[ID] = id;},
		Symbol = function(i, v){
			return Object.freeze(new Sym('@@Symbol@@::' + (uuid++)));
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
