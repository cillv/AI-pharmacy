const loginB = document.getElementById("loginB");
const logoutB = document.getElementById("logoutB");
const UN = document.getElementById("UN");

let userName = localStorage.getItem("name")

// access 토큰 만료되면 쓸거
let token = localStorage.getItem("refresh")

//진단 내역 받아올때 쓸 토큰
let access = localStorage.getItem("access")

function login_state_check(){
    if (token == null && access == null){
        login_state = false;
        console.log("not login")
    }
    else{
        login_state = true;
        console.log("yes login")
    }
}

function drawPage(){
    if (login_state == false){                  //로그인이 안됐을 때
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
      // 팝업을 띄울 페이지 URL
      var popupURL = "../S_B/s_b.html";
      // 팝업 창의 속성
      var option = "width=600,height=400,scrollbars=yes";
      // 팝업 열기
      window.open(popupURL, "Popup", option);
    }
  
    openPopup()
  }


logoutB.addEventListener('click', GOlogout);
window.addEventListener("submit", login_state_check);
login_state_check()
drawPage()