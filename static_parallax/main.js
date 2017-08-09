/* Initialize sticky outside the event listener as a cached selector.
 * Also, initialize any needed variables outside the listener for 
 * performance reasons - no variable instantiation is happening inside the listener.
 */
var sticky = $('#sticky'),
  stickyClone,
  stickyTop = sticky.offset().top,
  scrollTop,
  scrolled = false,
  $window = $(window);

/* Bind the scroll Event */
$window.on('scroll', function(e) {
  scrollTop = $window.scrollTop();

  if (scrollTop >= stickyTop && !stickyClone) {
    /* Attach a clone to replace the "missing" body height */
    stickyClone = sticky.clone().prop('id', sticky.prop('id') + '-clone')
    stickyClone = stickyClone.insertBefore(sticky);
    sticky.addClass('fixed');
  } else if (scrollTop < stickyTop && stickyClone) {
    /* Since sticky is in the viewport again, we can remove the clone and the class */
    stickyClone.remove();
    stickyClone = null;
    sticky.removeClass('fixed');
  }
});


var splash = document.getElementById("splash");
var vid = document.getElementById("bgvid"),
  pauseButton = document.getElementById("vidpause");
if (window.matchMedia('(prefers-reduced-motion)').matches) {
  vid.removeAttribute("autoplay");
  vid.pause();
  pauseButton.innerHTML = "Paused";
}

function changeBadge() {
    let initialBadge = document.getElementById("logo-badge").src;
    let srcTest = initialBadge.includes('media/badge_white.png');
    let newBadge = {'true':'media/badge_black.png', 'false': 'media/badge_white.png'}[srcTest];
    return newBadge;
}

function vidFade() {
  vid.classList.add("stopfade");
  splash.classList.add("faded-splash");
}
vid.addEventListener('ended', function() {
  // only functional if "loop" is removed 
  vid.pause();
  // to capture IE10
  vidFade();
});
pauseButton.addEventListener("click", function() {
  document.getElementById("logo-badge").src = changeBadge();
  vid.classList.toggle("stopfade");
  splash.classList.toggle("faded-splash");
  if (vid.paused) {
    vid.play();
    pauseButton.innerHTML = "Pause Video";
  } else {
    vid.pause();
    pauseButton.innerHTML = "Paused";
  }
})