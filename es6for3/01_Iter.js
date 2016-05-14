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
