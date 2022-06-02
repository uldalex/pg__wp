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
if(document.getElementById("news")) {
  var banner =  document.getElementById('news')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  clones:2,
  });
  splide.mount();
  }
  if(document.getElementById("press-relise")) {
  var banner =  document.getElementById('press-relise')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  });
  splide.mount();
  }
  if(document.getElementById("comments")) {
  var banner =  document.getElementById('comments')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  });
  splide.mount();
  }
  if(document.getElementById("articles")) {
  var banner =  document.getElementById('articles')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  });
  splide.mount();
  }
  if(document.getElementById("analitic")) {
  var banner =  document.getElementById('analitic')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  });
  splide.mount();
  }
  if(document.getElementById("video")) {
  var banner =  document.getElementById('video')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  });
  splide.mount();
  }
  if(document.getElementById("books")) {
  var banner =  document.getElementById('books')
  var splide = new Splide( banner, {
  type   : 'loop',
  perPage: 1,
  perMove: 1,
  autoplay:false,
  pauseOnHover:true,
  pauseOnFocus: true,
  arrows:true,
  });
  splide.mount();
  }
  /*Dropdown Menu*/
 $( document ).ready(function() {
  $('.dropdown').on('click', function () {
    if ($(this).hasClass("active")) {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
    $("#branchesListListInputFilter").val('');
    $("#practicleListListInputFilter").val('');
    $("#practicleFilterClose").removeClass('active');
    $("#branchesFilterClose").removeClass('active');
    var value = '';
    $("#practicleList li").filter(function() {
      let item = $(this).text().toLowerCase().indexOf(value) > -1;
      $(this).toggle(item);
    });
    $("#branchesList li").filter(function() {
      let item = $(this).text().toLowerCase().indexOf(value) > -1;
      $(this).toggle(item);
    });
    $("#practicleListListInputFilter").removeClass('active');
    $("#branchesListListInputFilter").removeClass('active');
  } else {
   $(this).addClass('active');
    $(this).find('.dropdown-menu').slideDown(300); 
  }
  }).on('click','.search-input, .dropdown__close', function(e) { 
    e.stopPropagation();
  });
  $('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
  });
  $("#practicleListListInputFilter").on("click", function() {
    $(this).addClass('active');
    var close = $('#practicleFilterClose');
    $(close).addClass('active');
    $(close).on('click', function(){
      $("#practicleListListInputFilter").removeClass('active');
      $("#practicleListListInputFilter").val('');
      var value = $("#practicleListListInputFilter").val().toLowerCase();
      $(this).removeClass('active');
      $("#practicleList li").filter(function() {
        let item = $(this).text().toLowerCase().indexOf(value) > -1;
        $(this).toggle(item);
      });
    })
  
  });
  $("#practicleListListInputFilter").on("keyup", function() {
     var value = $(this).val().toLowerCase();
    $("#practicleList li").filter(function() {
      let item = $(this).text().toLowerCase().indexOf(value) > -1;
      $(this).toggle(item);
    });
  });
  $("#branchesListListInputFilter").on("click", function() {
    $(this).addClass('active');
    var close = $('#branchesFilterClose');
    $(close).addClass('active');
    $(close).on('click', function(){
      $("#branchesListListInputFilter").removeClass('active');
      $("#branchesListListInputFilter").val('');
      var value = $("#branchesListListInputFilter").val().toLowerCase();
      $(this).removeClass('active');
      $("#branchesList li").filter(function() {
        let item = $(this).text().toLowerCase().indexOf(value) > -1;
        $(this).toggle(item);
      });
    })
  
  });
  $("#branchesListListInputFilter").on("keyup", function() {
     var value = $(this).val().toLowerCase();
    $("#branchesList li").filter(function() {
      let item = $(this).text().toLowerCase().indexOf(value) > -1;
      $(this).toggle(item);
    });
  });
  });
  /*End Dropdown Menu*/
  document.addEventListener('DOMContentLoaded', function(){
    if(location.hash) {
      showTab(location.hash);
    }
    // Следим за поднимающимися кликами
    document.addEventListener('click', function(event) {
      if(event.target.dataset.toggle === 'tab') {
        event.preventDefault();
        var target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash;
        if ( target !== undefined ) {
          showTab(target);
          if(history && history.pushState && history.replaceState) {
            var stateObject = {'url' : target};
            if (window.location.hash && stateObject.url !== window.location.hash) {
              window.history.pushState(stateObject, document.title, window.location.pathname + target);
            } else {
              window.history.replaceState(stateObject, document.title, window.location.pathname + target);
            }
          }
        }
      }
    });
  
    /**
     * Показывает таб
     * @param  {string} tabId ID таба, который нужно показать
     */
    function showTab(tabId){
      var element = document.querySelector(tabId);
      if ( element && element.classList.contains('tabs__content-item') ) {
        var tabsParent = document.querySelector(tabId).closest('.tabs');
        var activeTabClassName = 'tabs__link-wrap--active';
        var activeTabContentClassName = 'tabs__content-item--active';
        // таб
        tabsParent.querySelectorAll('.'+activeTabClassName).forEach(function(item){
          item.classList.remove(activeTabClassName);
        });
        var activeTab = tabsParent.querySelector('[href="'+tabId+'"]') ? tabsParent.querySelector('[href="'+tabId+'"]') : tabsParent.querySelector('[data-target="'+tabId+'"]')
        activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
        // контент таба
        tabsParent.querySelectorAll('.'+activeTabContentClassName).forEach(function(item){
          item.classList.remove(activeTabContentClassName);
        });
        tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
      }
    }
  
    // Добавление метода .closest() (полифил, собственно)
    (function(e){
      e.closest = e.closest || function(css){
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      }
    })(Element.prototype);
  
  });
  InitVars();
  InitMenu();
    $(window).on("load",function(){
        UpdateScroll();
        UpdateHeight()
    });
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    function InitVars(){
        $MainMenu = $('.block-rete__list');
        $Speed = $Scroll = 0;
        $MainMenuWidth = $MainMenu.width();
        $MainMenuMaxScroll = $MainMenu[0].scrollWidth - $MainMenu.outerWidth();
        $FirstLaunch = true;
    }
    function InitMenu(){
        $MainMenu.on('mousemove', function(e) { var mouse_x = e.pageX - $MainMenu.offset().left; var mouseperc = 100 * mouse_x / $MainMenuWidth; $Speed = mouseperc - 50; }).on ( 'mouseleave', function() { $Speed = 0; });
    }
    function UpdateScroll() {
        if ($Speed !== 0) { 
            $Scroll += $Speed / 3;
            if ($Scroll < 0){ $Scroll = 0;}
            $MainMenu.scrollLeft($Scroll);
        }
        $MenuEvent = requestAnimationFrame(UpdateScroll);
    }  