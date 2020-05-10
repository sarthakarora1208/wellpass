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
 var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var fn=document.getElementById("fn");
var address=document.getElementById("address");
var email=document.getElementById("email");
var admissionDate=document.getElementById("admissionDate");
var releaseDate=document.getElementById("releaseDate");
var hospitalName = document.getElementById("hospitalName");
var ipfsURL = document.getElementById("ipfsURL");



function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  // Use facingMode: environment to attemt to get the front camera on phones
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
  });
   var x=0;
   var y;

  function tick() {
    loadingMessage.innerText = "⌛ Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      // outputContainer.hidden = false;

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      // console.log(code);
      if (code && x==0) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        // outputMessage.hidden = true;
        // outputData.parentElement.hidden = false;
        console.log(code.data);

        y = JSON.parse(code.data);
        console.log(y);
        address.innerHTML= y.address;
        hospitalName.innerHTML=y.hospitalName;
        fn.innerHTML= y.name;
        email.innerHTML=y.email;
        admissionDate.innerHTML=y.admissionDate;
        releaseDate.innerHTML=y.releaseDate;
        ipfsURL.innerHTML = y.ipfsURL;
        ipfsURL.href = y.ipfsURL;
        address.innerHTML = y.address;
          $('.ui.basic.modal.mod1').modal('show');
          x++;
      } else {
        // console.log("hello");
        // outputMessage.hidden = false;
        // outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }



