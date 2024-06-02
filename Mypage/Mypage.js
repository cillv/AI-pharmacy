const NotLogIn = document.querySelector("#notlogin");
const YesLogIn = document.querySelector("#yeslogin");

var login_state = true;

if (login_state == false){
    YesLogIn.classList.remove("hidden")
    NotLogIn.classList.add("hidden")
}else{
    NotLogIn.classList.add("hidden")
    YesLogIn.classList.remove("hidden")
}