$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(".ui.message .close.icon").on("click",()=>{
    $('.ui.message').fadeOut("slow")
});


function onformSubmit() {
    document.getElementById("myForm").submit();
}

document.getElementById('eye').addEventListener("click",function(event){
    event.preventDefault();
    const passwordElement = document.getElementById('pwd');
    if (passwordElement.type === "password") {
        passwordElement.type = "text";
      } else {
        passwordElement.type = "password";
      }
})
