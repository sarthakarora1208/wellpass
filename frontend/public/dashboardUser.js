$(document).ready(function(){
    $('.sidenav').sidenav();
});

$('.ui.radio.checkbox')
  .checkbox()
;
$('.ui.radio.checkbox').on("click",function(){
    $(this).parent().toggleClass("positive");
})

$('.ui.fluid.dropdown').dropdown();

$('.calc').calendar({
  type: 'date'
});

$(".mod").on("click",function(){
    $('.ui.basic.modal')
  .modal('show')
;
})


$(".ui.small.button").on("click",function(){
    $(".qr").text("hi there");
})
$(".delete.icon").on("click",function(){
    $(this).parent().parent().remove();
})

anime.timeline({loop: false})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .line',
    opacity:0
  }).add({
    targets: '.ml5',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

