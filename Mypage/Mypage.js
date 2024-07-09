const NotLogIn = document.querySelector("#notlogin");
const YesLogIn = document.querySelector("#yeslogin");

const Benner = document.querySelector("#benner")
// const UserImg = document.querySelector("#user_img")
const username_html = document.getElementById("username_h3");

const contentBox = document.getElementById("contentM");

let userName = localStorage.getItem("name")

// access 토큰 만료되면 쓸거
let token = localStorage.getItem("refresh")

//진단 내역 받아올때 쓸 토큰
let access = localStorage.getItem("access")


function login_state_check(){
    if (token == undefined && access == undefined){
        YesLogIn.classList.add("hidden")
        NotLogIn.classList.remove("hidden")

        Benner.classList.add("hidden")
        UserImg.classList.add("hidden")
        username_html.classList.add("hidden")
    }
    else{
        console.log("draw my page")               //로그인이 됐을 때
        NotLogIn.classList.add("hidden")
        YesLogIn.classList.remove("hidden")

        Benner.classList.remove("hidden")
        // UserImg.classList.remove("hidden")
        username_html.classList.remove("hidden")
        
        username_html.innerHTML = `${userName}님 어서오세요. `
    }
}

async function getSeverAPI(type, id){
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
        else if (type == "DELETE"){
            url += `api/v1/inventories/${id}/`
        }

        console.log(url)
        if(type == "DELETE"){
            const res = await fetch(url, {
                mode: "cors", 
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`
                },
            });

            DrawJangHTML()

        }
        else{
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

                const newDiv = document.createElement('div')
                contentBox.appendChild(newDiv)

                const nametext = document.createElement('h5')
                const buy_datetext = document.createElement('h5')
                const numberetext = document.createElement('h5')

                newDiv.appendChild(nametext)
                newDiv.appendChild(buy_datetext)
                newDiv.appendChild(numberetext)

                nametext.innerHTML = `약 이름`
                buy_datetext.innerHTML = `구매날짜`
                numberetext.innerHTML = `개수`

                newDiv.classList.add("buyDiv")
                nametext.classList.add("buyDivText")
                buy_datetext.classList.add("buyDivText")
                numberetext.classList.add("buyDivText")


                for(let i=0; i<data.length; i++){oderBuyH(data[i])}
            }
            else if(type=="doctor"){
                contentBox.innerHTML = ""

                const newDiv = document.createElement('div')
                contentBox.appendChild(newDiv)

                const titleh = document.createElement('h5')
                const datah = document.createElement('h5')

                newDiv.appendChild(titleh)
                newDiv.appendChild(datah)

                titleh.innerHTML = `진단 내용`
                datah.innerHTML = `날짜`

                newDiv.classList.add("buyDiv")
                titleh.classList.add("DDivText")
                datah.classList.add("DDivText")
                
                for(let i=0; i<data.length; i++){oderDoctorH(data[i])}
            }
            else if (type == "jang"){
                contentBox.innerHTML = ""
                const infobar = document.createElement('div')
                contentBox.appendChild(infobar)

                const nametext = document.createElement('h5')
                const companytext = document.createElement('h5')
                const numberetext = document.createElement('h5')
                const pricetext = document.createElement('h5')

                infobar.appendChild(nametext)
                infobar.appendChild(companytext)
                infobar.appendChild(numberetext)
                infobar.appendChild(pricetext)
                
                nametext.innerHTML = `약 이름`
                companytext.innerHTML = `제조사`
                numberetext.innerHTML = `개수`
                pricetext.innerHTML = `가격(1개 기준)`

                infobar.classList.add("buyDiv")
                nametext.classList.add("JDivText")
                companytext.classList.add("JDivText")
                numberetext.classList.add("JDivText")
                pricetext.classList.add("JDivText")

                for(let i=0; i<data.length; i++){oderJangH(data[i])}
            }
        }

    } catch (error) {
      console.error("네트워크 요청 실패:", error);
      alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  }

function DrawBuyHTML(){
    getSeverAPI("buy")
}

function oderBuyH(data){
    console.log("oder: ", data)
    console.log(data.id)

    const newDiv = document.createElement('div')
    contentBox.appendChild(newDiv)

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

function DrawDoctorHTML(){
    getSeverAPI("doctor")
}

function oderDoctorH(data){
    console.log("Doctor : ", data)

    const newDiv = document.createElement('div')
    contentBox.appendChild(newDiv)

    let id = data.id

    let date = data.created_at
    let title = data.title

    const titleh = document.createElement('h5')
    const datah = document.createElement('h5')

    newDiv.appendChild(titleh)
    newDiv.appendChild(datah)

    titleh.innerHTML = `${title}`
    datah.innerHTML = `${date}`

    newDiv.classList.add("buyDiv")
    titleh.classList.add("DDivText")
    datah.classList.add("DDivText")
}

function DrawJangHTML(){
    getSeverAPI("jang")
}

function sendJang(id){
    getSeverAPI("DELETE", id)
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
        const pricetext = document.createElement('h5')
        const btn = document.createElement('button');

        newDiv.appendChild(nametext)
        newDiv.appendChild(companytext)
        newDiv.appendChild(numberetext)
        newDiv.appendChild(pricetext)
        newDiv.appendChild(btn)

        btn.innerHTML = "취소"
        btn.onclick = function() { sendJang(id) };

        nametext.innerHTML = `${m_name}`
        companytext.innerHTML = `${company}`
        numberetext.innerHTML = `${number}개`
        pricetext.innerHTML = `${m_price}원`

        newDiv.classList.add("buyDiv")
        nametext.classList.add("JDivText")
        companytext.classList.add("JDivText")
        numberetext.classList.add("JDivText")
        pricetext.classList.add("JDivText")
        btn.classList.add("JDivText")
    }

}

document.body.addEventListener("submit", login_state_check())