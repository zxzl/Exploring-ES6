window.For = (function(){
	var DEST = Symbol(), Of;
	Of = function(d){this[DEST] = d;};
	Of.prototype.of = function(iter, f){
		var cnt = 100000, val, dest = this[DEST];
		iter = iter['@@iterator']();
		while(cnt--){
			val = iter.next();
			if(val.done) break;
			else f(null, Dest(val.value));
		}
	};
	return function(dest){return new Of(dest);};
})();
