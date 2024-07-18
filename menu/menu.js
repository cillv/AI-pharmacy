const loginB = document.getElementById("loginB");
const logoutB = document.getElementById("logoutB");
const UN = document.getElementById("UN");

let userName = localStorage.getItem("name")

let token = localStorage.getItem("refresh")
let access = localStorage.getItem("access")

console.log("1 : ", access)

function login_state_check(){
    if (token == null && access == null){
        login_state = false;
        clearInterval(timerId)
    }
    else{
        login_state = true;
        var time = 270000       // 지연 방지 4분 30초당 refresh
        let timerId = setInterval(getSeverAPI, time)
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

async function getSeverAPI(){
    try {
        url = `${BASE_URL}api/v1/users/token/refresh/`

        const res = await fetch(url, {
            mode: "cors", 
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh :`${token}`,
            }),
        })

        const data = await res.json();

        localStorage.setItem("access", data.access)

        access = localStorage.getItem("access")

        console.log("변경 후 :", access)

        return data
    }catch (error) {
      console.error("네트워크 요청 실패:", error);
      alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
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