$(document).ready(function () {


	// inits
	if ($('#map').length) {
		drawCanvas();
	}
	if ($( ".image-icons > i" ).length) {
		$( ".image-icons > i" ).draggable();
	}
	if ($( "#dragme" ).length) {
		$( "#dragme" ).draggable();
	}
	if ($('.pdp').length) {
		$('.pdp').persianDatepicker();
	}
	if ($('.select2').length) {
		$('.select2').select2({
			width: '100%'
		});
	}

	// set theme
	if (localStorage.getItem('primary')) {
		setTheme();
	}

	// data table init
	if ($('.data-table').length) {
		$('.data-table').DataTable({
			language: {
				processing: "درحال پردازش...",
				search: "جستجو :",
				lengthMenu: " تعدا آیتم ها در هر صفحه _MENU_",
				info: "نمایش _START_ تا _END_ از _TOTAL_ آیتم",
				infoEmpty: "0 آیتم یافت شد.",
				infoFiltered: "(کل آیتم ها : _MAX_ )",
				infoPostFix: "",
				loadingRecords: "در حال بارگذاری...",
				zeroRecords: "موردی یافت نشد",
				emptyTable: "داده ای در جدول وجود ندارد",
				paginate: {
					first: "ابتدا",
					previous: "قبلی",
					next: "بعدی",
					last: "انتها"
				},
				aria: {
					sortAscending: ": چینش به صورت صعودی",
					sortDescending: ": چینش به صورت نزولی"
				}
			}
		});
	}



});

// set theme color
$(document).on('change', '.change-theme', function () {
	var primary = $(this).data('color');
	var type = $(this).data('type');

	localStorage.setItem('type', type);
	if (type == 'light') {
		localStorage.setItem('primary', primary);
		localStorage.setItem('bg', '#fff');
		localStorage.setItem('color', '#000');
	}else {
		localStorage.setItem('primary', primary);
		localStorage.setItem('bg', '#333');
		localStorage.setItem('color', '#fff');
	}

	setTheme();
});

$(document).on('click', '#create-new-theme', function () {
	var primary = $('#new-theme-primary-color').val();
	var type = $('#new-theme-type').val();

	if (primary) {
		localStorage.setItem('type', type);
		if (type == 'light') {
			localStorage.setItem('primary', primary);
			localStorage.setItem('bg', '#fff');
			localStorage.setItem('color', '#000');
		}else {
			localStorage.setItem('primary', primary);
			localStorage.setItem('bg', '#333');
			localStorage.setItem('color', '#fff');
		}

		setTheme();
	}
});

function setTheme() {
	document.documentElement.style.setProperty('--primary', localStorage.getItem('primary'));
	document.documentElement.style.setProperty('--bg', localStorage.getItem('bg'));
	document.documentElement.style.setProperty('--color', localStorage.getItem('color'));
	$('html').attr('theme-type', localStorage.getItem('type'));
	if (localStorage.getItem('type') == 'light') {
		$('nav.navbar').removeClass('navbar-light').addClass('navbar-dark');
	}else {
		$('nav.navbar').removeClass('navbar-dark').addClass('navbar-light');
	}
}

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

	$('#map').removeClass('draw-mode');

	$('.draw-table .already-set .ip-span').removeClass('active');
	$(this).addClass('active');

	var lines = $(this).data('lines');
	$('#map > line').hide();
	$('#map').find('.line-'+lines).show();

});

$('[data-channel]').click(function () {
	$('#map').addClass('draw-mode');
	$('#map').attr('data-draw-mode', 'line');
	$('#map').attr('data-current-channel', $(this).data('channel'))
	$('#channels .info').show();
	$('#map > .pl').hide();
});

$('#start-draw-rect').click(function () {
	$('#map').addClass('draw-mode');
	$('#map').attr('data-draw-mode', 'rect');
	$('#map > line').hide();
});

$('.show-draw-box').click(function() {
	$('#map').removeClass('draw-mode');
	$('#channels > .ip-title').text($(this).data('ip')).fadeOut(250).fadeIn(250);
	$('#rect').hide();
	$('#channels').slideDown();
	$('#map > line').hide();
	$('.ip-span').removeClass('active');
	$('#map > .new-channels, #map > .new-rect').remove();
});

$('.draw-rect').click(function() {
	$('#map').removeClass('draw-mode');
	$('#rect > .ip-title').text($(this).data('ip')).fadeOut(250).fadeIn(250);
	$('#channels').hide();
	$('#rect').slideDown();
	$('#map > line').hide();
	$('.ip-span').removeClass('active');
	$('#map > .new-channels, #map > .new-rect').remove();
});

$(document).on('click', '#map.draw-mode', function (e) {

	var currentChannel = $(this).attr('data-current-channel');
	var elm = $(this);
	var xPos = e.pageX - elm.offset().left;
	var yPos = e.pageY - elm.offset().top;

	var mode = $(this).attr('data-draw-mode');

	if ( mode == 'line') {
		if ($('#map > line#new-line').length) {
			updateLine(xPos, yPos);
			$('#map > line#new-line').addClass('line-created-'+currentChannel).removeAttr('id');
		}else {
			createLine(xPos, yPos);
		}
	}else {
		if ($('#map > path#new-rect').length) {
			updateRect(xPos, yPos);
			$('#map > path#new-rect').addClass('rect-created').removeAttr('id');
		}else {
			createRect(xPos, yPos);
		}
	}

});

$(document).on('mousedown', '#map > .new-channels, #map > .new-rect', function (e) {
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

	var mode = $(this).attr('data-draw-mode');

	if (mode == 'line') {
		if ($('#map > line#new-line').length) {
			updateLine(xPos, yPos);
		}
	}else {
		if ($('#map > path#new-rect').length) {
			updateRect(xPos, yPos);
		}
	}
});

$(document).on('change', '#line-colors', function () {
	var value = $(this).val();
	$('#map > .new-channels').css('stroke', value);
});

$(document).on('change', '#rect-color', function () {
	var value = $(this).val();
	$('#map > .new-rect').css('fill', value);
});

$(document).on('input', '#rect-opacity', function () {
	var value = Number($(this).val()) / 100;
	$('#map > path').css('opacity', value);
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

function createRect(x, y) {
	var color = $('#rect-color').val() ? $('#rect-color').val() : '#fff';
	var opacity = Number($('#rect-opacity').val()) / 100;
	var newRect = document.createElementNS('http://www.w3.org/2000/svg','path');
	newRect.setAttribute('id', 'new-rect');
	newRect.setAttribute('data-init-x', x);
	newRect.setAttribute('data-init-y', y);
	newRect.setAttribute('style', 'opacity:'+opacity+';fill:'+color);
	newRect.setAttribute('class', 'new-rect');
	$("#map").append(newRect);
}

function updateRect(x2, y2) {
	var rect = $('#map > path#new-rect');
	x1 = rect.attr('data-init-x');
	y1 = rect.attr('data-init-y');
	rect.attr('d', 'M'+x1+','+y1+' '+x2+','+y1+' '+x2+','+y2+' '+x1+','+y2);
}

/*******************************/
/* icons toolbox */
/*******************************/

$(document).on('click', '.icons-toolbox > i', function () {
	var color = $('#icons-color').val();
	var size = $('#icons-size').val();
	var item = $(this).clone();
	if (color) {
		item.css('color', color);
	}
	item.css('font-size', size+'px');
	item.appendTo('.image-icons');
	$( ".image-icons > i" ).draggable();
});

$(document).on('mousedown', '.image-icons > i', function (e) {
	if (e.which == 3) {
		$(this).remove();
		return false;
	}
});

$(document).on('change', '#icons-color', function () {
	$( ".image-icons > i" ).css('color', $(this).val());
});

$(document).on('input', '#icons-size', function () {
	$( ".image-icons > i" ).css('font-size', $(this).val() + 'px');
});
