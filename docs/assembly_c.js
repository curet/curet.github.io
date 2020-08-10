
let a = "demo"
let b = "new_demo"

function replace_test(a, b) {
  
  var original = document.getElementById(a).innerHTML;
  var modified = document.getElementById(b).innerHTML;
//   for(i=0; i< (original.length - 1); i++){
//     var replaced = original.replace(original[i], modified[i]);
//   }
   var replaced = original.replace(original, modified) 
  
  document.getElementById(a).innerHTML = replaced;

  return replaced;
}

window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 850 || document.documentElement.scrollTop > 850) {
    replace_test(a, b)
  }

  // if (document.body.scrollTop < 850 || document.documentElement.scrollTop < 850) {
  //   replace_test(b, a)
  // }

}
