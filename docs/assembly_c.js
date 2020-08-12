
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 920 || document.documentElement.scrollTop > 920) {
    document.getElementById('assembly_code').style.display = "none"
  }
  else{
    document.getElementById('assembly_code').style.display = "contents"
  }
}
