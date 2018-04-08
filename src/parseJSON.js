// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
  // your code goes here
  // JSON Grammer
  // determine if the str is object, array, or elements 
  var result = setResultVar(json);
  var result_type = getJSONType(json);

  if(result) {
    var json = remvoeBracket(json);  
    var jsonStrs = parseStr(json);   
    result = setupObject(jsonStrs, result);
    return result;    
  } else {
    return json;
  }  
  return result;

};


 var setResultVar = function(str){
    if(str[0]==="{") {
      return {};
    } else if(str[0]==="["){
      return [];
    }
  }

  var getJSONType = function(str){
    if(str[0]==="{") {
      return 'object';
    } else if(str[0]==="["){
      return 'array';
    } else {
      return 'value';
    }
  }

  var getStrValue = function(str) {
    if(str === 'undefined') {
      return undefined;
    } else if(str === 'null') {
      return null;
    } else if(str === 'true') {
      return true;
    } else if(str === 'false') {
      return false;
    } else if (str === '') {
      return str;
    }
    else if(isNaN(Number(str))) {
      return str;
    } else {
      return Number(str)
    }
  }

var remvoeBracket = function(str){
  var strs = str.split('');
  strs.splice(0,1)    
  strs.splice( strs.length -1, 1);  
  str = strs.join('');
  return str;
}

var quotationReducer = function(quotationCount, cb){
  if(quotationCount === 2) {
    cb(0);
    return 0;
  } else {
    cb(quotationCount);
    return quotationCount;
  }
}

var getSimpleString = function(ele, strEles) {
  strEles.push(ele);
}

var getStringBetweenQuotations = function(quotationCount, ele, strEles, result){  
  if(quotationCount > 0) {    
    if(ele !== "\""){
      strEles.push(ele);
    }    
  } else {
    result.push(strEles.join(""));
    strEles = [];
  }    

  return strEles;
}

var updateStrsWithoutQuotations = function(quotationCount, strEles, result){
  if(strEles.length > 0){
    result.push(strEles.join(""));
    return strEles = [];
  }
  return strEles;
}

var removePunctuation = function(str) {
  var str = str.split(',').join('');
  return str.split(":").join('');
}


var parseStr = function(str) {
  var resultStrs =[];
  var strEles = [];
  var strEleswoq = []; // for the one without quotation marks
  var quotationCount = 0;
  var strs = str.split('');
  for(var i = 0; i < strs.length; i++) {
    var char = strs[i];
    if(char === '\"'){
      quotationCount += 1;
    }
    quotationCount = quotationReducer(quotationCount, function(quotation_count){            
      if(quotationCount > 0) {
        strEles = getStringBetweenQuotations(quotation_count, char, strEles, resultStrs);        
        if(strEleswoq.length > 0 ) {
          //resultStrs.push(removePunctuation(strEleswoq.join('')))
          addToResultArr(resultStrs, removePunctuation(strEleswoq.join('')));
        }
        strEleswoq = [];
      } else {          
        getSimpleString(char, strEleswoq);     
      }
    });
    if(i === strs.length - 1 && strEleswoq.length > 0 ){
      //resultStrs.push(removePunctuation(strEleswoq.join('')));  
      addToResultArr(resultStrs, removePunctuation(strEleswoq.join('')));
    }
  }
  return resultStrs;
}

var removeLeadingSpace = function(str){
  if(str){
    if(str[0] === " "){
      var strs = str.split('');
      strs.splice(0,1);    
      str = strs.join('');      
    }
    var n = str.split('').length;
    var n = n - 1;
    if(str[n] === " "){
      var strs = str.split('');
      strs.splice(n,1);    
      str = strs.join('');      
    }  
    return str;  
  }
  return str;
}

var setupObject = function(strs, obj) {
  var i = 0;
  while(i < strs.length){
    var key = strs[i];
    var val = removeLeadingSpace(strs[(i+1)]); 
    obj[key] = getStrValue(val);
    i += 2;
  }
  return obj;
}

var addToResultArr = function(array, cb){
  
  var ele = removeLeadingSpace(cb);
  if(ele.length > 0 ){
    array.push(ele);
  }
}
