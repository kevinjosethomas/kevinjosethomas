$(document).on('click', '#back', e => {
  $('#back').addClass("slideToLeft")
  setTimeout(() => {
    window.location.href = "/"
    $('#back').removeClass("slideToLeft");
  }, 1500)
})
