$(document).on('click', '.full-screen' ,function () {
	$('header, aside').toggleClass('blur');
	$('#fullscreen-target').toggleClass('full');
});
