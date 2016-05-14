window.Iter = (function(){
	var DATA = Symbol(), LEN = Symbol(), CURR = Symbol(), RETURN = Symbol(),
		Iter = function(v){
			this[DATA] = v;
			this[LEN] = v.len;
			this[CURR] = 0;
			this[RETURN] = {done:false};
		};
	Iter.prototype.next = function(){
		if(this.curr < this.len) this.r.value = this.v[this.curr++], this.r.done = false;
		else this.r.value = undefind, this.r.done = true;
		return this.r;
	};
})();
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
	fn['@@iterator'] = function(){return new Iter(this);};
	if(typeof Array.from != 'function') Array.from = function(v){
		var r = [], i;
		if('@@iterator' in v){
			v = v['@@iterator']();
			do{
				i = v.next();
				if(i.done) break;
				else r[r.length] = i.value;
			}while(true);
		}
		return r;
	};
})();
if(typeof String.prototype['@@iterator'] != 'function') String.prototype['@@iterator'] = function(){return new Iter(this.split(''));}
