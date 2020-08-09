
function replace_test() {
  var original = document.getElementById("demo").innerHTML;
  var modified = document.getElementById("new_demo").innerHTML;
//   for(i=0; i< (original.length - 1); i++){
//     var replaced = original.replace(original[i], modified[i]);
//   }
   var replaced = original.replace(original, modified) 
  
  document.getElementById("demo").innerHTML = replaced;
}

window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 115 || document.documentElement.scrollTop > 115) {
    replace_test()
  }
}
