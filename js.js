$(document).ready(function(){
	$(window).on("load", function(){
	 alert ("If you want do use this app you need to alow your location");

	});
	 $(".scroll").on("click", function() {
    //event.preventDefault();
    var el = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(el).offset().top
    }, 500);
	
	
  });
  $(window).scroll(function(){
  if($(document).scrollTop()>200){
  $('.center').addClass('dodaj');
  
  }
  else{
  $('.center').removeClass('dodaj');
 
  } 
  
  });
	
	
});