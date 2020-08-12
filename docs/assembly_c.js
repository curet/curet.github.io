
function replace_text(x, y) {
  
  let original = document.getElementById(x).innerHTML;
  let modified = document.getElementById(y).innerHTML;
//   for(i=0; i< (original.length - 1); i++){
//     var replaced = original.replace(original[i], modified[i]);
//   }
   let replaced = original.replace(original, modified) 
  
  document.getElementById(x).innerHTML = replaced;

  // return replaced;
}

function replace_text_b(x, y) {
  
  let original = document.getElementById(x).innerHTML;
  let modified = document.getElementById(y).innerHTML;
//   for(i=0; i< (original.length - 1); i++){
//     var replaced = original.replace(original[i], modified[i]);
//   }
   let replaced = original.replace(original, modified) 
  
  document.getElementById(x).innerHTML = replaced;

  // return replaced;
}

// let assembly_to_c = replace_text('assembly_code', 'c_code');
// c_to_assembly = replace_text('c_code', 'assembly_code');


window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 920 || document.documentElement.scrollTop > 920) {
    // assembly_to_c
    let assembly_to_c = replace_text('assembly_code', 'c_code');
    // assembly_to_c
  }
  else{
    // let c_to_assembly = replace_text('c_code', 'assembly_code');
  }
}
