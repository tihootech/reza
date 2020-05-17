$(document).on('click', '.full-screen' ,function () {
	$('.log-container, .ip-container, header').toggleClass('blur');
	$('.right-side').toggleClass('with-border');
	$('#fullscreen-target').toggleClass('full');
});
