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
/* dragme */
/*******************************/

//Make the DIV element draggagle:
dragElement(document.getElementById("dragme"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
