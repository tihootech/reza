$(document).ready(function () {

	if ($('#map').length) {
		drawCanvas();
	}

	$( ".image-icons > img" ).draggable();
	$( "#dragme" ).draggable();

});

function drawCanvas() {
	var originalHeight = $('#map').data('h');
	var originalWidth = $('#map').data('w');
	var currentHeight = Number($('#map').css('height').replace('px',''));
	var width = Math.floor((currentHeight * originalWidth) / originalHeight );
	$('#map').width(width).css('margin', 'auto');
}


$(document).on('click', '.full-screen' ,function () {
	$('.log-container, .ip-container, nav').toggleClass('blur');
	$('.full-tile').toggleClass('maximized');
	$('.right-side').toggleClass('with-border');
	$('#fullscreen-target').toggleClass('full');
	$('#dragme').css({
		'left' : '25px',
		'top' : '25px',
	});
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

$(document).on('click', '.ip-settings-edit' ,function () {
	var tr = $(this).parents('tr');
	var ip = tr.data('ip');

	$('#alert-info').hide();
	$('#config-box').fadeOut();

	$('input#the-ip').val(ip);

	$('#config-box').fadeIn();
});

$(document).on('click', '.ip-charts' ,function () {
	var tr = $(this).parents('tr');
	var ip = tr.data('ip');

	$('#alert-info').hide();
	$('#config-box').fadeOut();

	$('.ip-charts').removeClass('active');
	$(this).addClass('active');
	$('#target-ip').html(ip);

	$('#config-box').fadeIn();
});


$(document).on('input', '.range-value' ,function () {
	var value = $(this).val();
	$(this).siblings('.input-range').val(value);
});

$(document).on('input', '.input-range' ,function () {
	var value = $(this).val();
	$(this).siblings('.range-value').val(value);
});


$(document).on('change', '#btn-action', function () {
	var val = $(this).val();
	var urlDiv = $('#btn-action-url');
	var functionsDiv = $('#btn-action-functions');
	if (val) {
		if (val == 'get') {
			urlDiv.slideDown();
			functionsDiv.hide();
		}else {
			urlDiv.hide();
			functionsDiv.slideDown();
		}
	}else {
		urlDiv.hide();
		functionsDiv.hide();
	}
});


/*******************************/
/* draw */
/*******************************/

$('.draw-table .already-set .ip-span').click(function () {

	$('.draw-table .already-set .ip-span').removeClass('active');
	$(this).addClass('active');

	var lines = $(this).data('lines');
	$('#map > line').hide();
	$('#map').find('.line-'+lines).show();

});

$('[data-channel]').click(function () {
	$('#map').addClass('draw-mode');
	$('#map').attr('data-current-channel', $(this).data('channel'))
	$('#channels .info').show();
	$('#map > .pl').hide();
});

$('.show-draw-box').click(function() {
	$('#channels > .ip-title').text($(this).data('ip')).fadeOut(250).fadeIn(250);
	$('#channels').slideDown();
	$('#map > line').hide();
	$('.ip-span').removeClass('active');
	$('#map > .new-channels').remove();
});

$(document).on('click', '#map.draw-mode', function (e) {

	var currentChannel = $(this).attr('data-current-channel');
	var elm = $(this);
	var xPos = e.pageX - elm.offset().left;
	var yPos = e.pageY - elm.offset().top;

	if ($('#map > line#new-line').length) {
		updateLine(xPos, yPos);
		$('#map > line#new-line').addClass('line-created-'+currentChannel).removeAttr('id');
	}else {
		createLine(xPos, yPos);
	}

});

$(document).on('mousedown', '#map > .new-channels', function (e) {
	if (e.which == 3) {
		$(this).remove();
		return false;
	}
});

$('#map').contextmenu(function() {
    return false;
});

$(document).on('mousemove', '#map.draw-mode', function (e) {
	var elm = $(this);
	var xPos = e.pageX - elm.offset().left;
	var yPos = e.pageY - elm.offset().top;

	if ($('#map > line#new-line').length) {
		updateLine(xPos, yPos);
	}
});

$(document).on('change', '#line-colors', function () {
	var value = $(this).val();
	$('#map > .new-channels').css('stroke', value);
});

$(document).on('click', '#test-alarm', function () {
	var alarmColor = $('#alarm-color').val();
	var defaultColor = $('#line-colors').val() ? $('#line-colors').val() : '#fff';
	if (alarmColor) {
		$('#map > .new-channels').css('stroke', alarmColor);
	}
	$('#map > .new-channels')
		.fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250)
		.fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250)
		.fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250)

	setTimeout(function(){
		$('#map > .new-channels').css('stroke', defaultColor);
	}, 3000);

});

function createLine(x, y) {
	var color = $('#line-colors').val();
	var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
	newLine.setAttribute('id', 'new-line');
	newLine.setAttribute('x1', x);
	newLine.setAttribute('y1', y);
	newLine.setAttribute('x2', x);
	newLine.setAttribute('y2', y);
	if (color) {
		newLine.setAttribute('style', 'stroke:'+color);
	}
	newLine.setAttribute('class', 'new-channels');
	$("#map").append(newLine);
}

function updateLine(x, y) {
	$('#map > line#new-line').attr('x2', x).attr('y2', y);
}

/*******************************/
/* draggable */
/*******************************/
