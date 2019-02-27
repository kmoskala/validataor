//Struktura plikow
//<form id='myForm'>
//  <div class="inputContainer">
//      <input class='input'>
//      <p class='error'></p>
//   </div>
//</form>
//
// main.js
// $('#myForm').validateForm();


(function($){
	$.fn.validateForm = function(config) {
		const options = $.extend({
			minLength  : 1,
			maxLenght  : 9,
			phoneRegex : /[0-9]{3}-[0-9]{3}-[0-9]{3}/,
			emailRegex : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/,
			message    : '',
			messageMinLeght : 'Text jest za krótki!',
			messageMaxLenght : 'Text jest za długi!',
			messageRequire : 'To pole jest wymagane.',
			messageIsPhone : 'To musi być nr telefonu w formacie: 444-444-444.',
			messageIsEmail  : 'To musi być e-mail w formacie: jakismail@cos.pl.'
		}, config);
		
		return this.each(function() {
			const $t = $(this);
			const $input = $t.find('.inputContainer');
			const $submit = $t.find('.button');
			
			
			function check(input) {
				input.each(function () {
					const $inputField = $(this).find('.input');
					const $errorMessage = $(this).find('.error');
					const minLenghtIn = $inputField.data("minlenght");
					const maxLenghtIn = $inputField.data("maxlenght");
					const requireIn   = $inputField.data("require");
					const isPhoneIn   = $inputField.data("isphone");
					const isEmailIn   = $inputField.data("isemail");
					var $message = '';
					//min lenght Input
					if(minLenghtIn !== options.minLength) {
						if($inputField.val().length< minLenghtIn) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageMinLeght + '\n';
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							options.message -= options.messageMinLeght;
							$errorMessage.text('');
						}
					} else {
						if($inputField.val().length < options.minLength) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageMinLeght + '\n';
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					
					
					//max lenght Input
					if(maxLenghtIn !== options.maxLength) {
						if($inputField.val().length > minLenghtIn) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageMaxLenght + '\n';
							
						} else {
							$input.removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					} else {
						if($inputField.val().length > options.maxLength) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageMaxLenght + '\n';
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					//require
					if(requireIn) {
						if($inputField.val().length === 0) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageRequire + '\n';
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					//is Phone
					if(isPhoneIn) {
						const regexPhonePat = options.phoneRegex.test($inputField.val());
						if(!regexPhonePat) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageIsPhone + '\n';
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					
					//is Email
					if(isEmailIn) {
						const regexPat = options.emailRegex.test($inputField.val());
						if(!regexPat) {
							$(this).removeClass("valid").addClass("invalid");
							$message += options.messageIsEmail + '\n';
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					
					
					$errorMessage.text($message);
				});
				
			}
			$input.each(function () {
				$(this).find('.input').blur( function () {
					check($input);
				});
				if($(this).hasClass("valid") && !$(this).hasClass("invalid") ) {
					$(this).css({
						"color" : "#2EF285",
					});
					$inputField.css({
						"border" : "1px solid #2EF285"
					})
				} else if(!$(this).hasClass("valid") && $(this).hasClass("invalid")  ) {
					$(this).css({
						"color" : "#EB0801",
					});
					$inputField.css({
						"border" : "1px solid #EB0801"
					})
				}
			});
			
			$submit.bind('click', function (e) {
				e.preventDefault();
				check($input);
			});
		});
	}
})(jQuery);
