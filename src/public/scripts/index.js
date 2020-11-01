
let is_mobile = false;

$(document).ready(e => {
  $('#intro').removeClass("hidden");
  $('#arrow').removeClass("hidden");

  if ($("#arrowContainer").css("display") == "none") {
    is_mobile = true;
  }

  if (!is_mobile) {
    $("#arrow").addClass("transmission");
    $('#intro').addClass("slideInLeft");
    $('#arrow').addClass("slideInRight");

    let scene = document.getElementById('scene');
    let parallaxInstance = new Parallax(scene, {selector: '#intro'});
  }
})

$(document).on("mouseover", "#arrow", e => {
  if (!($("#arrow").hasClass("transmission"))) {
    if ($("#arrow").hasClass("rotated180")) {
      $("#arrow").addClass("transmission");
      $("#arrow").addClass("rotate180back")
      $("#arrow").removeClass("rotated180");
    } else {
      $("#arrow").addClass("transmission");
      $("#arrow").addClass("rotate180")
    }
  }
})

$(document).on("animationend", "body", e => {
  if (e.originalEvent.animationName == "rotate180" && e.target == $("#arrow")[0]) {
    $("#arrow").addClass("rotated180");
    $("#arrow").removeClass("mr-20");
    $("#arrow").addClass("mr-6");
    $("#arrow").removeClass("rotate180");
    $("#panel").removeClass("hidden");
    $("#panel").addClass("expandPanel");
  } else if (e.originalEvent.animationName == "rotate180back" && e.target == $("#arrow")[0]) {
    $("#arrow").removeClass("rotate180back")
    $("#arrow").addClass("mr-20");
    $("#arrow").removeClass("mr-6");
    $("#panel").removeClass("expandPanel");
    $("#panel").addClass("collapsePanel");
  } else if (e.originalEvent.animationName == "expandPanel" && e.target == $("#panel")[0]) {
    $("#arrow").removeClass("transmission");
  } else if (e.originalEvent.animationName == "collapsePanel" && e.target == $("#panel")[0]) {
    $("#panel").removeClass("collapsePanel");
    $("#panel").addClass("hidden");
    $("#arrow").removeClass("transmission");
  } else if (e.originalEvent.animationName == "slideInRight" && e.target == $("#arrow")[0]) {
    $('#arrow').removeClass("slideInRight");
    $("#arrow").removeClass("transmission");
  } else if (e.originalEvent.animationName == "slideInLeft" && e.target == $("#intro")[0]) {
    $('#intro').removeClass("slideInLeft");
  }
})
