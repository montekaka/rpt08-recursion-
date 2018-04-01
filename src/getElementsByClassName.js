// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var result = [];
  var element = document.body;
  var nodes = [];
  
  var includesClassName = function(ele, className){
    	if(ele.classList){
    		var classList = ele.classList.value.split(" ");
    		if(classList.includes(className)){
    			return ele;
    		}    		
    	}
  }

  var fetchNodes = function(ele){  
		if(includesClassName(ele, className)) {
			nodes.push(ele);
		}  	  	
    if(ele.childNodes.length > 0) {
    	for(var i = 0; i < ele.childNodes.length; i++){    		
    		var element = ele.childNodes[i];  	
    		fetchNodes(element);
    	}     
    } else {  
    	return -1;
    }
  }
  fetchNodes(element);
  return nodes;
};
