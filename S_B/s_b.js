const NotLogIn = document.querySelector("#notlogin");
const YesLogIn = document.querySelector("#yeslogin");

const contentBox = document.getElementById("contentM");

let token = localStorage.getItem("refresh")
let access = localStorage.getItem("access")

function login_state_check(){
    if (token == undefined && access == undefined){
        YesLogIn.classList.add("hidden")
        NotLogIn.classList.remove("hidden")
    }
    else{
        console.log("draw my page")               //로그인이 됐을 때
        NotLogIn.classList.add("hidden")
        YesLogIn.classList.remove("hidden")
    }
}

async function getSeverAPI(type, id){
    try {
        url = `${BASE_URL}`

        if (type == "jang"){
            url += `api/v1/inventories/`
        }
        else{
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

    } catch (error) {
      console.error("네트워크 요청 실패:", error);
      alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  }

function DrawJangHTML(){
    getSeverAPI("jang")
}

function sendJang(id){
    console.log("id: ",id)
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
        console.log("oder id: ",id)


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
DrawJangHTML()
