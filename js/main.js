function init() {
	var screen_height     = $(window).height(),
	    screen_width      = $(window).width(),
	    headers_height    = $('.headers_container').height();
	

	if(!isMobile()) {
		$('#main_banner, #footer').height(screen_height);
		$('.headers_container').css('padding', (screen_height - headers_height) / 2 + 'px 0');
	} else {
		$('#main_banner, #footer').css('height', 'inherit');
		$('.headers_container').css('padding', '150px 0');
	}
	
}
function isMobile() {
	if($(window).width() < 768 ) {
		return true;
	} else {
		return false;
	}
}

$(window).resize(function () {
	init();
	
});
$(document).ready(function () {
	init();
	$('#validateForm').validateForm();
	$('#main_banner .icon_container').click(function () {
		$('html, body').animate({
			scrollTop: $("#main_gallery").offset().top
		}, 1500);
	});
	$('#footer .icon_container').click(function () {
		$('html, body').animate({
			scrollTop: $("#main_gallery").offset().top
		}, 1500);
	});
	
	
	
});

