console.log("userDashboardLoaded")
$(document).ready(function() {
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
  async function getQR(){
    console.log("getQR called")
    var resultString = document.getElementById('report').textContent;
    QRCode.toCanvas(
        document.getElementById('canvas'),
        resultString,
        (error)=>{
            if(error){
                console.log(error);
            }
            else{
                $('.ui.basic.modal.mod2').modal('show');
            }
        }
    )

}
