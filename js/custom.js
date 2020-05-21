$(document).on('click', '.full-screen' ,function () {
	$('.log-container, .ip-container, header').toggleClass('blur');
	$('.right-side').toggleClass('with-border');
	$('#fullscreen-target').toggleClass('full');
});


$(document).on('click', '.searchbox-delete' ,function () {
	swal({
		title: "آیا مطمئن هستید؟",
		text: "شما دیگر قادر به باز گردانی آن نخواهید بود!",
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "بله. پاک شود.",
		cancelButtonText: "لغو",
		closeOnConfirm: false,
		closeOnCancel: false
	}, function(isConfirm) {
		if (isConfirm) {
			location.reload();
		} else {
			swal("عملیات لغو شد.", "اطلاعاتی پاک نشد", "error");
		}
	});
});

$(document).on('click', '.searchbox-config' ,function () {
	var tr = $(this).parents('tr');
	var ip = tr.data('ip');
	var mac = tr.data('mac');

	$('#alert-info').hide();
	$('#config-box').fadeOut();

	$('input#mac').val(mac);
	$('input#old-ip').val(ip);
	$('input#the-ip').val(ip);
	
	$('#config-box').fadeIn();
});
