$(document).ready(function() {
	$('.sidenav').sidenav();
});

$('.ui.radio.checkbox').checkbox();
$('.ui.fluid.dropdown').dropdown();

$('.calc').calendar({
	type: 'date'
});
anime
	.timeline({ loop: false })
	.add({
		targets: '.ml15 .word',
		scale: [ 14, 1 ],
		opacity: [ 0, 1 ],
		easing: 'easeOutCirc',
		duration: 800,
		delay: (el, i) => 800 * i
	})
	.add({
		targets: '.ml15',
		opacity: 1,
		duration: 1000,
		easing: 'easeOutExpo',
		delay: 1000
	});

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.carousel');

	var instances = M.Carousel.init(elems, {});
});

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime
	.timeline({ loop: false })
	.add({
		targets: '.ml2 .letter',
		scale: [ 4, 1 ],
		opacity: [ 0, 1 ],
		translateZ: 0,
		easing: 'easeOutExpo',
		duration: 950,
		delay: (el, i) => 70 * i
	})
	.add({
		targets: '.ml2',
		opacity: 1,
		duration: 1000,
		easing: 'easeOutExpo',
		delay: 1000
	});

anime
	.timeline({ loop: false })
	.add({
		targets: '.ml8 .circle-white',
		scale: [ 0, 3 ],
		opacity: [ 1, 0 ],
		easing: 'easeInOutExpo',
		rotateZ: 360,
		duration: 1100
	})
	.add({
		targets: '.ml8 .circle-container',
		scale: [ 0, 1 ],
		duration: 1100,
		easing: 'easeInOutExpo',
		offset: '-=1000'
	})
	.add({
		targets: '.ml8 .circle-dark',
		scale: [ 0, 1 ],
		duration: 1100,
		easing: 'easeOutExpo',
		offset: '-=600'
	})
	.add({
		targets: '.ml8 .letters-left',
		scale: [ 0, 1 ],
		duration: 1200,
		offset: '-=550'
	})
	.add({
		targets: '.ml8 .bang',
		scale: [ 0, 1 ],
		rotateZ: [ 45, 15 ],
		duration: 1200,
		offset: '-=1000'
	})
	.add({
		targets: '.ml8',
		opacity: 1,
		duration: 1000,
		easing: 'easeOutExpo',
		delay: 1400
	});

anime({
	targets: '.ml8 .circle-dark-dashed',
	rotateZ: 360,
	duration: 8000,
	easing: 'linear',
	loop: true
});
