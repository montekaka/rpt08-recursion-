// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	// check if the obj is a string
	var s = Object.prototype.toString; 
	var result = '';
	if(s.call(obj) === "[object Array]"){
		var strObjs = [];
		for(var i = 0; i < obj.length; i++) {
			var o = obj[i];
			strObjs.push(stringifyJSON(o));
		}
		result = "["+strObjs.join(",")+"]";
	} else if(s.call(obj) === "[object Object]") {
		var keys = Object.keys(obj);
		var objValues = [];
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			objValues.push('"'+String(key)+'"' + ":" + stringifyJSON(obj[key]));
		}
		result = "{"+objValues.join(",")+"}";
	}
	else {
		if(s.call(obj) === "[object String]") {
			result = result +  '"'+String(obj)+'"';
		} 
		else {
			result = result +  String(obj);
		} 
	} 
	return result;
};

