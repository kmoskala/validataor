function init() {
	var screen_height     = $(window).height(),
	    screen_width      = $(window).width(),
	    headers_height    = $('.headers_container').height(),
	    squer_size        = (($('.squer_container').width() - 20) / 3) - 12,
	    phone_screen_size = (($(window).width() - 100) / 3) - 12;
	
	if (screen_width < 768) {
		$('.squer').width(phone_screen_size).height(phone_screen_size);
		$('.squer_container').css('padding', '0 ' + (112/2) +'px');
		console.log("phone_screen_size " + phone_screen_size);
	} else {
		$('.squer').width(squer_size).height(squer_size);
		console.log("squer_size " + squer_size);
	}
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
	
	
	var game = {
		user1: '<i class="fa fa-times sign"></i>',
		user1_sign: 1,
		user1_name: '',
		win1: 0,
		user2: '<i class="far fa-circle sign"></i>',
		user2_sign: 2,
		user2_name: '',
		win2: 0,
		current: 1,
		moves: 0
	};
	$('#player1').blur(function () {
		game.user1_name = $('#player1').val();
	});
	
	$('#player2').blur(function () {
		game.user2_name = $('#player2').val();
		
	});
	var time     = 0,
	    interval;
	    
	$('.squer').click(function () {
		if (game.moves === 9) {
			alert("koniec gry!");
			$('.squer').each(function () {
				$(this).removeClass("active").data('value', '').children().remove();
			});
			game.current = 1;
			game.moves = 0;
			
		}
		if (game.moves === 0) {
			if(game.user1_name === '' || game.user2_name === ''){
				game.user1_name = 'Krzyżyk';
				game.user2_name = 'Kółko';
			} else {
			
			}
			time=0;
			interval = setInterval(function () {
				$('.time').text(time++);
			}, 1000);
			$('#point_table .first_player .name').text(game.user1_name);
			$('#point_table .second_player .name').text(game.user2_name);
			$('.user_container[data-user= "first"] .icon_container2 p').text(game.user1_name + ' x');
			$('.user_container[data-user= "second"] .icon_container2 p').text(game.user2_name + ' 0');
			
			$(this).addClass("active").data('value', game.user1_sign).append(game.user1);
			$(this).data('value', game.user1_sign);
			game.current = 2;
			game.moves++;
			$('.user_container[data-user= "first"]').removeClass('active');
			$('.user_container[data-user= "second"]').addClass('active');
			
		} else if (game.moves > 0 && game.moves < 9 && game.current === 1) {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active").data('value', game.user1_sign).append(game.user1);
				game.current = 2;
				game.moves++;
				$('.user_container[data-user= "first"]').removeClass('active');
				$('.user_container[data-user= "second"]').addClass('active');
			}
			winer(game);
		} else if (game.moves > 0 && game.moves < 9 && game.current === 2) {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active").data('value', game.user2_sign).append(game.user2);
				game.current = 1;
				game.moves++;
				$('.user_container[data-user= "second"]').removeClass('active');
				$('.user_container[data-user= "first"]').addClass('active');
				
			}
			winer(game);
		}
		
	});
	var winInterval = setInterval(function () {
		$('#point_table .first_player .point').text(game.win1);
		$('#point_table .second_player .point').text(game.win2);
	}, 1000);
	
	$("#popup .box_info .icon").click(function () {
		$('.squer').each(function () {
			$(this).removeClass("active").data('value', '').children().remove();
		});
		game.current = 1;
		game.moves = 0;
		$("#popup").hide();
		$('#time').text(time);
		clearInterval(interval);
		
	});
	
});

function winer(game) {
	var s1 = $("#one").hasClass("active"),
	    s2 = $("#two").hasClass("active"),
	    s3 = $("#three").hasClass("active"),
	    s4 = $("#four").hasClass("active"),
	    s5 = $("#five").hasClass("active"),
	    s6 = $("#six").hasClass("active"),
	    s7 = $("#seven").hasClass("active"),
	    s8 = $("#eight").hasClass("active"),
	    s9 = $("#nine").hasClass("active"),
	    d1 = $("#one").data("value"),
	    d2 = $("#two").data("value"),
	    d3 = $("#three").data("value"),
	    d4 = $("#four").data("value"),
	    d5 = $("#five").data("value"),
	    d6 = $("#six").data("value"),
	    d7 = $("#seven").data("value"),
	    d8 = $("#eight").data("value"),
	    d9 = $("#nine").data("value");
	//cross win
	if ((s1 && d1 === 1 && s2 && d2 === 1 && s3 && d3 === 1) || (s4 && d4 === 1 && s5 && d5 === 1 && s6 && d6 === 1) || (s7 && d7 === 1 && s8 && d8 === 1 && s9 && d9 === 1) || (s1 && d1 === 1 && s4 && d4 === 1 && s7 && d7 === 1) || (s2 && d2 === 1 && s5 && d5 === 1 && s8 && d8 === 1) || (s3 && d3 === 1 && s6 && d6 === 1 && s9 && d9 === 1) || (s1 && d1 === 1 && s5 && d5 === 1 && s9 && d9 === 1) || (s3 && d3 === 1 && s5 && d5 === 1 && s7 && d7 === 1)) {
		$("#popup").show();
		$("#popup .box_info p").text("Wygrywa " + game.user1_name);
		game.win1++;
		
		//circle win
	} else if ((s1 && d1 === 2 && s2 && d2 === 1 && s3 && d3 === 2) || (s4 && d4 === 2 && s5 && d5 === 2 && s6 && d6 === 2) || (s7 && d7 === 2 && s8 && d8 === 2 && s9 && d9 === 2) || (s1 && d1 === 2 && s4 && d4 === 2 && s7 && d7 === 2) || (s2 && d2 === 2 && s5 && d5 === 2 && s8 && d8 === 2) || (s3 && d3 === 2 && s6 && d6 === 2 && s9 && d9 === 2) || (s1 && d1 === 2 && s5 && d5 === 2 && s9 && d9 === 2) || (s3 && d3 === 2 && s5 && d5 === 2 && s7 && d7 === 2)) {
		$("#popup").show();
		$("#popup .box_info p").text("Wygrywa " + game.user2_name);
		game.win2++;
		
	} else if (s1 && s2 && s3 && s4 && s5 && s6 && s7 && s8 && s9) {
		$("#popup").show();
		$("#popup .box_info p").text("Spruóbujcie jeszcze raz");
	}
}
