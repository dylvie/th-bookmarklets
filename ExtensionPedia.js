javascript:(function(){
  var id = window.getSelection().toString().trim();
  if(id){
    window.open("https://layerxsecurity.com/extensions/chrome/test/" + encodeURIComponent(id), "_blank");
  } else {
    alert("Select an extension ID first!");
  }
})();
