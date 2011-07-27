/* The library part! Awesomeness! Church numerals in JavaScript! Because native integers aren't function-y enough! */
function zero(_){
    return function(n){return n;};}
function inc(n){
    return function(x){
	return function(y){
	    return x(n(x)(y));};};}
/* Conversion to/from native integers */
function dechurch(n){
    return n(function(n){return n+1;})(0);
}
function church(n){
    var ret = zero;
    while(n>0){ /* Ugh, look at the imperative code. Isn't it horrid? */
	n--;
	ret = inc(ret);
    }
    return ret;
}
/* Math upon church numerals! */
function add(n){
    return function(m){
	return n(inc)(m);};}
function mult(n){
    return function(m){
	return n(add(m))(zero);};}
function pred(n){
    return function(f){
	return function(x){
	    return n(
		     function(g){
			 return function(h){
			     return h(g(f))};})
		(function(_){
		    return x;})
		(function(x){
		    return x;});};};}
/* Note that this only deals with subtraction where the second operand is less||equal to the first */
function sub(n){
    return function(m){return m(pred)(n);};}

/* Now for the fun part. The...demo...? 
   Note that this is the REAL answer to that perpetual stackoverflow question "how do I
   add two numbers in javascript?" - none of that jQuery crap. Well, not until I release my
   "Church numerals for jQuery" plugin.
 */
function proper_way_to_add_numbers_in_javascript(a,b){
    return dechurch(add(church(a))(church(b)));
}
console.log("10+20 is:");
console.log(proper_way_to_add_numbers_in_javascript(10,20));


console.log("7*(1+(2*5*19)) is:");

var two = inc(inc(zero));
var five = inc(add(two)(two));
var seven = add(two)(five);
var nineteen = add(five)(mult(two)(seven));
console.log(dechurch(mult(seven)(inc(mult(two)(mult(five)(nineteen))))));

console.log("... just like lambda calculus");

/* Now for the pièce de résistance! Factorials are fun like that!
   Note that factorial involves no recursion, and is simply a fold 
   over the integer, which encodes the call pattern. Lambda calculus data-types
   are really elegant like that...
*/
function fst(a){return function(_){return a;};};
function factorial(n){
    return n(function(t){
	    return function(u){
		return u(mult(t(fst))(inc(t(zero))))(inc(t(zero)));
	    };
	})(function(t){
		return t(inc(zero))(zero);
	    })(fst);
}

console.log("7! is:");
console.log(dechurch(factorial(seven)));