const loginB = document.getElementById("loginB");
const logoutB = document.getElementById("logoutB");
const UN = document.getElementById("UN");

let userName = localStorage.getItem("name")

let token = localStorage.getItem("refresh")
let access = localStorage.getItem("access")

function login_state_check(){
    if (token == null && access == null){
        login_state = false;
    }
    else{
        login_state = true;
    }
}

function drawPage(){
    if (login_state == false){          
        logoutB.classList.add("hidden")
        loginB.classList.remove("hidden")
        UN.classList.add("hidden")
        
    }else{                                                       
        loginB.classList.add("hidden")
        UN.classList.remove("hidden")
        logoutB.classList.remove("hidden")

        UN.innerHTML = `${userName}`
    }
}

function GOlogout(){
    logoutB.classList.add("hidden")
    loginB.classList.remove("hidden")
    login_state = false
    drawPage()

    localStorage.removeItem("refresh")
    localStorage.removeItem("access")

    window.parent.location.reload()
}

function clickBox(){  
    const openPopup = () => {
      var popupURL = "../S_B/s_b.html";
      var option = "width=600,height=400,scrollbars=yes";
      window.open(popupURL, "Popup", option);
    }
  
    openPopup()
  }


logoutB.addEventListener('click', GOlogout);
window.addEventListener("submit", login_state_check);
login_state_check()
drawPage()