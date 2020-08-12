
let a = 'assembly_code'
let b = 'c_code'

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

function myFunction() {
  if (document.body.scrollTop > 920 || document.documentElement.scrollTop > 920) {
    replace_test(a, b)
  }

  // if (document.body.scrollTop < 850 || document.documentElement.scrollTop < 850) {
  //   replace_test(b, a)
  // }

}

window.onscroll = function() {
  myFunction()
};