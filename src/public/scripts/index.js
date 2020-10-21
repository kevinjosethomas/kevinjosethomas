
$(document).ready(e => {
  $('#intro').removeClass("hidden");
  $('#arrow').removeClass("hidden");

  $('#intro').addClass("slideInLeft");
  $('#arrow').addClass("slideInRight");

  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene, {selector: '#intro'});

  setTimeout(() => {
    $('#intro').removeClass("slideInLeft");
    $('#arrow').removeClass("slideInRight");
  }, 2000)
})

$(document).on('mouseover', '#arrow', e => {
  if ($('#arrow').hasClass("transforming")) {
    return;
  }
  if ($('#panel').hasClass('expandPanel')) {
    $('#arrow').addClass("flipSide2");
    $('#arrow').removeClass("flipSide");
    $('#arrow').addClass("transforming");
    setTimeout(() => {
      $('#arrow').addClass("mr-20");
      $('#panel').addClass('collapsePanel');
      setTimeout(() => {
        $('#panel').removeClass('expandPanel');
        $('#panel').removeClass('collapsePanel');
        $('#panel').addClass('hidden');
        $('#arrow').removeClass("flipSide2");
        $('#arrow').removeClass("transforming");
      }, 1999)
    }, 900)
  } else {
    $('#arrow').addClass("flipSide");
    $('#arrow').addClass("transforming");
    setTimeout(() => {
      $('#arrow').removeClass("mr-20");
      $('#arrow').addClass("mr-5");
    }, 900)
    setTimeout(() => {
      $('#panel').removeClass('hidden');
      $('#panel').addClass('expandPanel');
      $('#arrow').removeClass("transforming");
    }, 1000)
  }
})

$(document).on('click', '#arrow', e => {
  if ($('#panel').hasClass('expandPanel')) {
    $('#arrow').addClass("flipSide2");
    $('#arrow').removeClass("flipSide");
    setTimeout(() => {
      $('#arrow').addClass("mr-20");
      $('#panel').addClass('collapsePanel');
      setTimeout(() => {
        $('#panel').removeClass('expandPanel');
        $('#panel').removeClass('collapsePanel');
        $('#panel').addClass('hidden');
        $('#arrow').removeClass("flipSide2");
      }, 1999)
    }, 900)
  }
})
