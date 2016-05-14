if(!window.WeakSet) (function(){
	var KEY = Symbol(), SET = Symbol(), WSet = function(a){
		var wset = this[SET] = [], self = this, v, cnt = 10000;
		if(typeof a[Symbol.iterator] == 'function') a = a[Symbol.iterator]();
		else if(typeof a.next != 'function') return;
		do{
			v = a.next();
			if(v.done) break;
			wset[wset.length] = v.value;
		}while(cnt--)
		Object.freeze(this);
	}, fn = WSet.prototype;
	fn.has = function(v){return this[SET].indexOf(v) !== -1;};
	fn.add = function(v){if(!this.has(v) && v instanceof Object) this[SET].push(v);};
	fn.del = function(v){if(this.has(v)) this[SET].splice(this[SET].indexOf(v), 1);};
	window.WeakSet = WSet;
})();
