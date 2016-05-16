(function(){
	var DEST = Symbol(), Of;
	Of = function(d){this[DEST] = d;};
	Of.prototype.Of = function(iter, f){
		var cnt = 100000, val, dest = this[DEST];
		if(typeof iter.next != 'function') iter = iter['@@iterator']();
		while(cnt--){
			val = iter.next();
			if(val.done) break;
			else f(dest ? Dest(dest, val.value) : val.value);
		}
	};
	window.For = function(dest){
		this[DEST] = '';
		return new Of(dest);
	};
	window.For.Of = Of.prototype.Of;
})();
