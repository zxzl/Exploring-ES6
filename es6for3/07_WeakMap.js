if(!window.WeakMap) (function(){
	var KEY = Symbol(), MAP = Symbol(), ID = Symbol(), uuid = 0, WMap = function(a){
		var map = this[MAP] = {};
		if(a instanceof Array) a.forEach(function(v){self.set(v[0], v[1]);});
		Object.freeze(this);
	}, fn = WMap.prototype;
	fn.set = function(k, v){
		if(k && typeof k == 'object' || typeof k == 'function'){
			if(!k[ID]) k[ID] = '@WeakMap:' + (uuid++);
			k = [k[ID]];
		}
		this[MAP][k] = v;
	};
	fn.get = function(k){
		if(k && typeof k == 'object' || typeof k == 'function'){
			if(k[ID]) k = k[ID];
			else return;
		}
		return this[MAP][k];
	};
	fn.has = function(k){
		if(k && typeof k == 'object' || typeof k == 'function'){
			if(k[ID]) k = k[ID];
			else return false;
		}
		return this[MAP].hasOwnProperty(k);
	};
	fn.del = function(k){
		var v;
		if(k && typeof k == 'object' || typeof k == 'function'){
			if(k[ID]) v = k[ID], delete k[ID], k = v;
			else return false;
		}
		delete this[MAP][k];
	};
	window.WeakMap = WMap;
})();
