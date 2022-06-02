if(document.getElementById("events")) {
    var banner =  document.getElementById('events') 
    var splide = new Splide( banner, {
      type   : 'loop',
      perPage: 3,
      perMove: 1,
      autoplay:true,
      pauseOnHover:true,
      pauseOnFocus: true,
      arrows:true,
      clones:0,
      breakpoints: {
        768: {
          perPage: 2,
        },
        480: {
          perPage: 1,
        },
        }
    }); 
    splide.mount();
}