/* 들어갈 기능
    장바구니 저장
    즐겨찾기 저장
*/

const m_name = document.getElementById("m_name")
const m_company = document.getElementById("m_company")
const m_price = document.getElementById("m_price")
const m_serial_number = document.getElementById("m_serial_number")

const m_main_ingreient = document.getElementById("m_main_ingreient")
const m_efficacy = document.getElementById("m_efficacy")
const m_side_effect = document.getElementById("m_side_effect")

const m_usage = document.getElementById("m_usage")
const m_how_to_store = document.getElementById("m_how_to_store")

const m_cautions = document.getElementById("m_cautions")
const m_need_to_know = document.getElementById("m_need_to_know")
const m_beware_food = document.getElementById("m_beware_food")

const m_number_input = document.getElementById("m_number")

let check_MB_S = false

function check_MB(){
    // 즐겨찾기 비활성일 경우
    if (check_MB_S == false){
        check_MB_S = true
    }
    else {  //즐겨찾기 활성일 경우
        check_MB_S = false
    }
    console.log(check_MB_S)
}

function putINB(){
    const m_number = document.getElementById("m_number").value

    console.log(m_number)
    if (m_number == null || m_number == 0){
        alert("수량을 반드시 1개 이상 입력해주세요.")
    }
    else{
        console.log(`장바구니에 ${m_number}개 담았습니다.`)
    }
}

async function getSeverAPI(id, type){
    try {
      url = BASE_URL
  
      if(type == "get"){
        url += `api/v1/medicines/${id}`
        const res = await fetch(url, {
        mode: "cors", 
        method: "Get",
        headers: {
            "Content-Type": "application/json",
        }
        });

        const data = await res.json();

        drawA_D(data)

        return data;
      }
      else if(type == "post"){
        url += ``
        const res = await fetch(url, {
            mode: "cors", 
            method: "Get",
            headers: {
                "Content-Type": "application/json",
            }
            });
      }

      return data;
    } catch (error) {
      console.error("네트워크 요청 실패:", error);
      alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
}

function drawA_D(data){
    m_name.innerHTML = `${data.name}`
    m_company.innerHTML = `제조사 : ${data.company}`
    m_price.innerHTML = `가격 : ${data.price}`
    m_serial_number.innerHTML = `serial_number : ${data.serial_number}`

    m_main_ingreient.innerHTML = `${data.main_ingredient}`
    m_efficacy.innerHTML = `${data.efficacy}`
    m_side_effect.innerHTML = `${data.side_effect}`

    m_usage.innerHTML = `${data.usage}`
    m_how_to_store.innerHTML = `${data.how_to_store}`

    m_cautions.innerHTML = `${data.cautions}`
    m_need_to_know.innerHTML = `${data.need_to_know}`
    m_beware_food.innerHTML = `${data.beware_food}`
}

var A_D_NEED_ID = localStorage.getItem("A_D_NEED_ID")
console.log(A_D_NEED_ID)
getSeverAPI(A_D_NEED_ID, "get")