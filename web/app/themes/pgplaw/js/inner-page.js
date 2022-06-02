//анимация
 $( document ).ready(function() {
$(window).scroll(function(){
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	var et = $('.animation').offset().top;
	var eh = $('.animation').outerHeight();
  var et1 = $('.animation1').offset().top;
	var eh1 = $('.animation1').outerHeight();
  var et2 = $('.animation2').offset().top;
	var eh2 = $('.animation2').outerHeight();
	var dh = $(document).height();   
	if (wt + wh >= et || wh + wt == dh || eh + et < wh){
	$('.animation').addClass('animate')
	}
  if (wt + wh >= et1 || wh + wt == dh || eh1 + et1 < wh){
    $('.animation1').addClass('animate')
  }
  if (wt + wh >= et2 || wh + wt == dh || eh2 + et2 < wh){
    $('.animation2').addClass('animate')
  }
});
});
