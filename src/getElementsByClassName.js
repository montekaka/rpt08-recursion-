// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var result = [];
  var docBody = document.body;
  //console.log(docBody);

 //  if(docBody.classList) {
 //  	if(docBody.classList.value === className){
	// 		result.push(docBody);
 //  	}  	
 //  } 
	// var nodes = docBody.childNodes;
 //  for(var i = 0; i < nodes.length; i++) {
 //  	if(nodes[i].classList && (nodes[i].classList.value.split(" ")).includes(className) ) {
 //  		result.push(nodes[i]);  		
 //  		//console.log(nodes[i])
 //  	}  	
 //  }  
 //  //console.log(result)
 //  return result;

};
