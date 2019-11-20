var slideout = new Slideout({
  panel: document.getElementById("main"),
  menu: document.getElementById("menu"),
  padding: 256,
  tolerance: 70,
  easing: "cubic-bezier(.32,2,.55,.27)"
});

$(".toggle-button").on("click", function() {
  slideout.toggle();
});
