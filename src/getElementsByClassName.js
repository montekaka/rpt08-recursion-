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
  // if(element && element.classList && element.classList.value) {
  //   var classList = element.classList.value.split(" ");
  // }
  //
  var travelNodes = function(ele){
    if(ele.childNodes && ele.childNodes.length > 0) {
      //console.log('hello');
      var element = ele.childNodes[0];
      travelNodes(element);
    } else {
        console.log('gg')
        console.log(ele);
    }
  }

  travelNodes(element);
};
