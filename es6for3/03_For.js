(function(){
	var DEST = Symbol(), Of;
	Of = function(d){this[DEST] = d;};
	Of.prototype.Of = function(iter, f){
		var cnt = 100000, val, dest = this[DEST];
		if(typeof iter.next != 'function') iter = iter['@@iterator']();
		while(cnt--){
			val = iter.next();
			if(val.done) break;
			else f(Dest(dest, val.value));
		}
	};
	window.For = function(dest){return new Of(dest);};
})();
