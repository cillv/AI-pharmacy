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
        NotLogIn.classList.add("hidden")
        YesLogIn.classList.remove("hidden")
    }
}

async function getSeverAPI(type, id, M_quantity){
    try {
        url = `${BASE_URL}`

        if (type == "jang"){
            url += `api/v1/inventories/`
        }
        else{
            url += `api/v1/inventories/${id}/`
        }

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
        else if(type == "PutP" || type == "PutM"){
            if (type == "PutP"){
                const res = await fetch(url, {
                    mode: "cors", 
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                    },
                    body: JSON.stringify({
                        quantity :`${M_quantity+1}`,
                    }),
                });
    
                DrawJangHTML()
            }
            else{
                const res = await fetch(url, {
                    mode: "cors", 
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                    },
                    body: JSON.stringify({
                        quantity :`${M_quantity-1}`,
                    }),
                });
    
                DrawJangHTML()
            }
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
    getSeverAPI("DELETE", id)
}

function P_Quantity(id, M_quantity){
    getSeverAPI("PutP", id, M_quantity)
}

function M_Quantity(id, M_quantity){
    getSeverAPI("PutM", id, M_quantity)
}

function oderJangH(data){
    const newDiv = document.createElement('div')
    contentBox.appendChild(newDiv)

    let id = data.id

    let number = data.quantity
    const fom = document.createElement('div')
    const numDiv = document.createElement('div')
    const PB = document.createElement('button')
    const MB = document.createElement('button')
    
    PB.innerHTML = "▲"
    PB.onclick = function() { P_Quantity(id, number) };

    MB.innerHTML = "▼"
    MB.onclick = function() { M_Quantity(id, number) };

    let medicine = data.medicine

    let company = medicine.company
    let m_name = medicine.name
    let m_price = medicine.price

    const nametext = document.createElement('h5')
    const companytext = document.createElement('h5')
    const numberetext = document.createElement('h5')
    const pricetext = document.createElement('h5')
    const btn = document.createElement('button');

    newDiv.appendChild(nametext)
    newDiv.appendChild(companytext)
    newDiv.appendChild(fom)
    fom.appendChild(numberetext)
    fom.appendChild(numDiv)
    numDiv.appendChild(PB)
    numDiv.appendChild(MB)
    newDiv.appendChild(pricetext)
    newDiv.appendChild(btn)

    btn.innerHTML = "취소"
    btn.onclick = function() { sendJang(id) };

    nametext.innerHTML = `${m_name}`
    companytext.innerHTML = `${company}`
    numberetext.innerHTML = `${number}`
    pricetext.innerHTML = `${m_price}원`

    newDiv.classList.add("buyDiv")
    fom.classList.add("JDivText")
    numDiv.classList.add("numDiv")
    PB.classList.add("numB")
    MB.classList.add("numB")
    nametext.classList.add("JDivText")
    companytext.classList.add("JDivText")
    numberetext.classList.add("numText")
    pricetext.classList.add("JDivText")
    btn.classList.add("JDivText")
}

document.body.addEventListener("submit", login_state_check())
DrawJangHTML()
