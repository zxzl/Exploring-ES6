window.Dest = (function(){
	var pool = {}, Dest = (function(){
		var DEST = Symbol(), parse, destructuring, Var, Dest,
			rObj = /(\{[^\{\[\]\}]*\})/g, rArr = /(\[[^\{\[\]\}]*\])/g, 
			arr = [[]], obj = [[]], a = 0, o = 0, ad = 0, od = 0, at = arr[0], ot = obj[0],
			oR = function(v){return ot[o] = v, '@o_'+ od +'_' + (o++) + '@';},
			aR = function(v){return ot[o] = v, '@a_'+ ad +'_' + (o++) + '@';},
			rO = /(@o_[^@]+@)/g, rA = /(@a_[^@]+@)/g;
		Dest = function(dest){
			var loop, r = {};
			arr.length = obj.length = 0, a = o = ad = od = 0, at = arr[0] = [], ot = obj[0] = [],
			dest = dest.trim();
			do{
				loop = 0;
				if(rObj.test(dest)) dest = dest.replace(rObj, oR), ot[++od] = [], loop = 1;
				if(rArr.test(dest)) dest = dest.replace(rArr, oA), at[++ad] = [], loop = 1;
			}while(loop);
			
			if(rO.test(dest) || rA.test(dest)) parse(dest, r, arr, obj);
			else throw 1;
			this[DEST] = r;
		};
		Dest.prototype.value = function(v){
			var result = {};
			destructuring(this[DEST], v, result);
			return result;
		};
		Var = function(k){this.k = k;};
		Var.prototype.toString = function(){return this.k;};
		parse = function(dest, r, arr, obj){
			dest = dest.trim();
			if(rO.test(dest)){
				dest = dest.substring(1, dest.length - 1).split('_');
				dest = obj[dest[1]][dest[2]];
				dest.substring(1, dest.length - 1).split(',')
				.forEach(function(v){
					if(v.indexOf(':') > -1 ) v = v.split(':');
					else v = [v, v];
					r[v[0].trim()] = parse(v[1], {}, arr, obj);
				});
				return r;
			}else if(rA.test(dest)){
				dest = dest.substring(1, dest.length - 1).split('_');
				dest = arr[dest[1]][dest[2]];
				dest.substring(1, dest.length - 1).split(',')
				.forEach(function(v, i){
					r[i] = parse(v, {}, arr, obj);
				});
				return r;
			}else if(dest){
				return new Var(dest);
			}
		};
		destructuring = function(target, v, result){
			var k, key;
			for(k in target){
				key = target[k];
				if(key instanceof Var){
					result[key] = v[k];
				}else if(key && typeof key == 'object'){
					destructuring(key, v[k], result);
				}
			}
		};
		return Dest;
	})();
	return function(dest, v){
		return (pool[dest] || (pool[dest] = new Dest(dest))).value(v);
	};
})();
