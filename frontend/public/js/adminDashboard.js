$(document).ready(function(){
    $('.sidenav').sidenav();
});

anime.timeline({loop: false})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

function modshow(hospitalId)
{
	console.log(hospitalId);
	var modalName=`.ui.basic.modal.${hospitalId}.first`
	$(modalName).modal('show');
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');

    var instances = M.Carousel.init(elems, {});

  });



function addHospital(id) {
	$('#dimmer').dimmer('show');
    console.log(id);
    $('#dimmer').dimmer('hide');
	var modal2 =`.ui.basic.modal.${id}.second`
	$(modal2).modal('show');
};


