"use strict"
if(typeof Object.freeze != 'function') Object.freeze = function(v){return v;};
if(!window.Symbol1)(function(){
	var uuid = 0,
		Sym = function(id){this[ID] = id;},
		Symbol1 = function(desc) {
			return Object.freeze(new Sym('@@Symbol1@@::' + (desc || uuid++)));
		},
		ID = '__sym__',
		keys = {},
		syms = {};
	Sym.prototype.toString = function(){return this[ID];},
	Symbol1.for = function(k) {
		if(!keys[k]) syms[keys[k] = Symbol1(k)] = k;
		return keys[k];
	};
	Symbol1.keyFor = function(s){return syms[s];};
	Symbol1.iterator = Object.freeze(new Sym('@@iterator'));
	window.Symbol1 = Object.freeze(Symbol1);
})();
