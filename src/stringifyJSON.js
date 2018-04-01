// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	// check if the obj is a string
	var s = Object.prototype.toString; 
	if(s.call(obj) === "[object String]") {
		return '"'+String(obj)+'"';
	} else {
		return String(obj);
	}  
};
