const NotLogIn = document.querySelector("#notlogin");
const YesLogIn = document.querySelector("#yeslogin");
const Benner = document.querySelector("#benner")

const username_html = document.getElementById("username_h3");

const loginB = document.getElementById("loginB");
const logoutB = document.getElementById("logoutB");

const contentBox = document.getElementById("contentM");

let login_state = false;

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
        YesLogIn.classList.add("hidden")
        NotLogIn.classList.remove("hidden")
        Benner.classList.add("hidden")
    }else{                       
        console.log("draw my page")               //로그인이 됐을 때
        NotLogIn.classList.add("hidden")
        YesLogIn.classList.remove("hidden")
        loginB.classList.add("hidden")
        logoutB.classList.remove("hidden")
        Benner.classList.remove("hidden")
        // username 받아오기
        let userName = localStorage.getItem("name")
        username_html.innerHTML = `${userName}님 어서오세요. `
    }
}

async function getSeverAPI(type){
    try {
        url = `${BASE_URL}`

        if(type == "buy"){
            url += `api/v1/receipts/`
        }
        else if (type == "doctor"){
            url += `api/v1/diagnosis/history/`
        }
        else if (type == "jang"){
            url += `api/v1/inventories/`
        }

        console.log(url)

        const res = await fetch(url, {
            mode: "cors", 
            method: "Get",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
            },
        });
  
        const data = await res.json();
        console.log("API: ", data)

        if(type=="buy"){
            contentBox.innerHTML = ""
            for(let i=0; i<data.length; i++){oderBuyH(data[i])}
        }
        else if(type=="doctor"){
            contentBox.innerHTML = ""
            for(let i=0; i<data.length; i++){oderBuyH(data[i])}
        }
        else if (type == "jang"){
            contentBox.innerHTML = ""
            for(let i=0; i<data.length; i++){oderJangH(data[i])}
        }

      return data;
    } catch (error) {
      console.error("네트워크 요청 실패:", error);
      alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  }

function GOlogout(){
    logoutB.classList.add("hidden")
    loginB.classList.remove("hidden")
    login_state = false
    drawPage()
}



logoutB.addEventListener('click', GOlogout);
window.addEventListener("submit", login_state_check);
login_state_check()
drawPage()

function DrawBuyHTML(){
    getSeverAPI("buy")
}

function oderBuyH(data){
    console.log("oder: ", data)
    console.log(data.id)

    const newDiv = document.createElement('div')
    contentBox.appendChild(newDiv)

    if (data == undefined){
        console.log("data null!")
    }
    else{
        let id = data.id

        let name = data.medicine
        let buy_date = data.purchase_at
        let number = data.quantity


        const nametext = document.createElement('h5')
        const buy_datetext = document.createElement('h5')
        const numberetext = document.createElement('h5')

        newDiv.appendChild(nametext)
        newDiv.appendChild(buy_datetext)
        newDiv.appendChild(numberetext)

        nametext.innerHTML = `${name}`
        buy_datetext.innerHTML = `${buy_date}`
        numberetext.innerHTML = `${number}`

        newDiv.classList.add("buyDiv")
        nametext.classList.add("buyDivText")
        buy_datetext.classList.add("buyDivText")
        numberetext.classList.add("buyDivText")
    }


}

function DrawDoctorHTML(){
    getSeverAPI("doctor")
}

function oderDoctorH(data){
    console.log(data)
}

function DrawJangHTML(){
    getSeverAPI("jang")
}

function oderJangH(data){
    console.log("Jang: ", data)
    console.log(data.medicine.company)

    const newDiv = document.createElement('div')
    contentBox.appendChild(newDiv)

    if (data == undefined){
        console.log("data null!")
    }
    else{
        let id = data.id

        let number = data.quantity
        let medicine = data.medicine

        let company = medicine.company
        let m_id = medicine.id
        let m_name = medicine.name
        let m_price = medicine.price

        const nametext = document.createElement('h5')
        const companytext = document.createElement('h5')
        const numberetext = document.createElement('h5')

        newDiv.appendChild(nametext)
        newDiv.appendChild(companytext)
        newDiv.appendChild(numberetext)

        nametext.innerHTML = `${m_name}`
        companytext.innerHTML = `${company}`
        numberetext.innerHTML = `${number} x ${m_price}`

        newDiv.classList.add("buyDiv")
        nametext.classList.add("buyDivText")
        companytext.classList.add("buyDivText")
        numberetext.classList.add("buyDivText")
    }
    
}