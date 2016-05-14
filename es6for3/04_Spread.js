window.Spread = (function(){
	var sp;
	sp = function(r, a){
		var i, j, k, l, v;
		for(i = 0, j = a.length; i < j; i++){
			if(a[i] == '...'){
				sp(r, a[++i]);
			}else{
				r[r.length] = a[i];
			}
		}
	};
	return function(a){
		var r = [];
		sp(r, arguments.length > 1 ? arguments : a);
		return r;
	};
})();
