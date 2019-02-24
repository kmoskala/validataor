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
			messageRequire : 'To pole jest wymagane',
			messageIsPhone : 'To musi być nr telefonu w formacie: 444-444-444',
			messageIsEmail  : 'To musi być e-mail w formacie: jakismail@cos.pl'
		}, config);
		
		return this.each(function() {
			const $t = $(this);
			const $input = $t.find('.inputContainer');
			const $submit = $t.find('.button');
			
			const minLenghtIn = $input.find("[data-minLenght]").data("minLenght");
			const maxLenghtIn = $input.find("[data-maxLenght]").data("maxLenght");
			const requireIn   = $input.find("[data-require]").data("require");
			const isPhoneIn   = $input.find("[data-isPhone]").data("isPhone");
			const isEmailIn   = $input.find("[data-isEmail]").data("isEmail");
			function check(input) {
				input.each(function () {
					
					const $inputField = $(this).find('.input');
					const $errorMessage = $(this).find('.error');
					//min lenght Input
					if(minLenghtIn !== options.minLength) {
						if($inputField.val().length < minLenghtIn) {
							$(this).removeClass("valid").addClass("invalid");
							$errorMessage.text(options.messageMinLeght + '\n');
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							options.message -= options.messageMinLeght;
							$errorMessage.text('');
						}
					} else {
						if($inputField.val().length < options.minLength) {
							$(this).removeClass("valid").addClass("invalid");
							$errorMessage.text(options.messageMinLeght + '\n');
							
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					
					
					//max lenght Input
					if(maxLenghtIn !== options.maxLength) {
						if($inputField.val().length > minLenghtIn) {
							$(this).removeClass("valid").addClass("invalid");
							$errorMessage.text(options.messageMaxLenght + '\n');
						} else {
							$input.removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					} else {
						if($inputField.val().length > options.maxLength) {
							$(this).removeClass("valid").addClass("invalid");
							$errorMessage.text(options.messageMaxLenght + '\n');
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
					//require
					if(requireIn) {
						if($inputField.val().length === 0) {
							$(this).removeClass("valid").addClass("invalid");
							$errorMessage.text(options.messageRequire + '\n');
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
							$errorMessage.text(options.messageRequire + '\n');
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
							$errorMessage.text(options.messageRequire + '\n');
						} else {
							$(this).removeClass("invalid").addClass("valid");
							$errorMessage.text('');
							
						}
					}
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
				
			}
			$input.each(function () {
				$(this).on('blur', function () {
					check($(this));
				})
			});
			
			$submit.bind('click', function (e) {
				e.preventDefault();
				console.log("klikam sb");
				check($input);
			});
		});
	}
})(jQuery);
