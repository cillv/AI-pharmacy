const NotLogIn = document.querySelector("#notlogin");
const YesLogIn = document.querySelector("#yeslogin");

const loginB = document.getElementById("loginB");
const logoutB = document.getElementById("logoutB");

localStorage.setItem('login_state', 'true')


function drawPage(){
    if (localStorage.getItem('login_state') == 'false'){                  //로그인이 안됐을 때
        YesLogIn.classList.add("hidden")
        NotLogIn.classList.remove("hidden")
    }else{                                      //로그인이 됐을 때
        NotLogIn.classList.add("hidden")
        YesLogIn.classList.remove("hidden")
        loginB.classList.add("hidden")
        logoutB.classList.remove("hidden")
        localStorage.removeItem('login_state')
        localStorage.setItem('login_state', 'true')
    }
}

function GOlogout(){
    logoutB.classList.add("hidden")
    loginB.classList.remove("hidden")
    localStorage.removeItem('login_state')
    localStorage.setItem('login_state', 'false')
    drawPage()
}



logoutB.addEventListener('click', GOlogout);
drawPage()