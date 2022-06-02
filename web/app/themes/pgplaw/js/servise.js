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