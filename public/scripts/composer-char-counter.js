

$(document).ready(function() {
  $("textarea").on("input",function() {
    $('span.counter').text(140 - $("textarea").val().length);
   

    //returns a string of textarea
  });
   

});