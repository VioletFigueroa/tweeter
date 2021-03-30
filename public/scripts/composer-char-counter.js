$(document).ready(function() {
  $(".new-tweet").on("keyup", "textarea", function() {
    const counter = $(this).parent().find(".counter");
    let charRemaining = 140 - this.textLength;
    counter.text(charRemaining);
    charRemaining < 0
      ? counter.css("color", "#ff0000")
      : counter.css("color", "#000000");
  });
});