$(document).ready(function(){
	
	 $(".scroll").on("click", function() {
    //event.preventDefault();
    var el = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(el).offset().top
    }, 500);
	
	
  });
  $(window).scroll(function(){
  if($(document).scrollTop()>100){
  $('nav').addClass('dodaj');
  }
  else{
  $('nav').removeClass('dodaj');
  } 
  
  });
	
	
});