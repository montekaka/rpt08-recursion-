// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
  // your code goes here
  // JSON Grammer
  // determine if the str is object, array, or elements 
  var result = setResultVar(json);
  var result_type = getJSONType(json);
  var jsonStrs = parseObjectType(json);
  result = setupObject(jsonStrs);
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

var parseObjectType = function(str) {
  var strs = [];
  var str = remvoeBracket(str);
  // find all commas (",") sit outside of the quotations
  var commasIdx = [];
  var colonIdx = [];
  if(str.split.length > 0) {
    commasIdx = findCommas(str);
  }
  var startIdx = 0;
  commasIdx.forEach(function(idx){
    if(startIdx > 0){
      startIdx+=1;
    }
    var chars = str.split("").slice(startIdx, idx);
    var finalStr = trimStr(chars.join(''));
    strs.push(finalStr);
    startIdx = idx;
  });

  return strs;
}

var findCommas = function(str) {
  return findPunctuation(str, ",");
};

var findColons = function(str) {
  return findPunctuation(str, ":");
};

var findPunctuation = function(str, punctuation) {
  var quotationsCount = 0;
  var strs = str.split('');
  var result = [];
  var colonIdx = [];
  for(var i = 0; i < strs.length; i++) {
    if(strs[i] === "\"" ){
      quotationsCount+=1;
    }
    quotationsCount = quoationCountReducer(quotationsCount);     
    getPunctuationIdx(strs, quotationsCount, i, punctuation, function(){
      result.push(i);
    });   
  }  
  var a = 1
  if(str.split('').length > 1) {
    a = 0;
  };
  result.push(str.split('').length-a);
  return result;
}


var getPunctuationIdx = function(strs, quotationsCount, i, punctuation, cb){
  if(quotationsCount === 0 && strs[i] === punctuation) {
    cb();
  }
}

var quoationCountReducer = function(quotationsCount) {
  if(quotationsCount === 2) {
    return 0;
  } 
  return quotationsCount;
}

var trimStr = function(str) {  
  var strs = str.split('');  
  if(strs[0] === " "){   
    strs.splice(0,1);
  }
  var n = strs.length - 1;
  if(n > 0 && strs[n] === " "){
    strs.splice(n,1); 
  }
  return strs.join('');
}

var removeQuotes = function(str){
  var strs = str.split('');
  if(strs[0] === "\""){   
    strs.splice(0,1);
  }
  var n = strs.length - 1;
  if(strs[n] === "\""){
    strs.splice(n,1); 
  }
  return strs.join('');    
}

var setupObject = function(jsonStrs) {
  var result = {};
  jsonStrs.forEach(function(str){
    var colonIdx = findColons(str); 
    if(colonIdx[0] > 0 ) {
      var strs = str.split('');  
      var key = trimStr(strs.slice(1, colonIdx[0]-1).join(''));
      var val = trimStr(strs.slice(colonIdx[0]+1, colonIdx[1]).join(''));
      val = removeQuotes(val);
      result[key] = getStrValue(val);
    }  
  });
  return result;
}

