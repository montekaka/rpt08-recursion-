// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  findTheClosure = function(str, openClsureStr){
    var closureStr = "]";
    if(openClsureStr === "{"){
      closureStr = "}";
    }
    var i = 1;
    while(str[i] !== closureStr && i < str.length) {
      i += 1;
    }    
    if(str[i] === closureStr) {
      return i;
    } else {
      return -1;
    }
  }
  getValue = function(str, fromIdx, toIdx) {
    var n = toIdx - fromIdx - 1;
    if(n > 0){
      return str.split('').splice(fromIdx + 1, n).join('');
    }  
  }
  createObj = function(openClsureStr){
    if(openClsureStr === "["){
      return [];
    } else if(openClsureStr === "{") {
      return {};
    } else {
      return -1;
    }
  }

  var openClsureStr = json[0];
  var result = createObj(openClsureStr);
  if(result !== -1){
    var s = Object.prototype.toString;
    var fromIdx = 0;
    var toIdx = findTheClosure(json, openClsureStr);
    var value = getValue(json,fromIdx, toIdx);
    if(value){
      if(s.call(result) === "[object Array]") {
        result.push(value);
        return result;
      }
    }
    return result;
  }  
};
