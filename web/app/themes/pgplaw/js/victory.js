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