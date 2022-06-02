document.addEventListener( 'DOMContentLoaded', function() {
  if(document.getElementById("banner")) {
  var banner =  document.getElementById('banner') 
  var splide = new Splide( banner, {
    type   : 'loop',
    perPage: 1,
    autoplay:true,
    pauseOnHover:true,
    pauseOnFocus: true,
  }); 
  splide.mount();
  }
});