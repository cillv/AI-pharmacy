const reach_InForm = document.querySelector("#reach_Inform");
const reach_InForm_Name = document.querySelector("#reach_Inform input");
const parent = document.querySelector("#reach_img");
const parent3 = document.querySelector("#reach_value");
const parent4 = document.querySelector("#list_M");
const MLB = document.querySelector("#M_list");

let PAGENUMBER = 1;

async function getSeverAPI(PAGENUMBER, m_name, F_type){
  let pgnum = PAGENUMBER;
  let Mname = m_name;

  try {
    const res = await fetch(BASE_URL + `api/v1/medicines/?page=${String(pgnum)}&search=${Mname}`, {
      mode: "cors", 
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();

    if (F_type=="list"){
      for(var i=0; i<10; i++){
        makeBox(data[i].id, data[i].name, data[i].price);
      }
      console.log(PAGENUMBER)
    }

    if (F_type=="search"){
      console.log(data.id)
    }
    
    return data;
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}

  
// 검색 기능
function reach_name(event){
  event.preventDefault();
  const search_m_name = reach_InForm_Name.value;
  console.log(search_m_name)
  getInfo(search_m_name);
}

function getInfo(m_name){
  getSeverAPI("", m_name, "search")
}


// 약 목록 리스트
function Back_Button(){
  MLB.innerHTML= ""

  if (PAGENUMBER == 1){PAGENUMBER = 1;}
  else {PAGENUMBER -= 2;}
  
  n_drawlist(PAGENUMBER);
}

function Next_Button(){
  MLB.innerHTML= ""

  if (PAGENUMBER == 467){PAGENUMBER = 466;}
  else {PAGENUMBER += 2;}

  n_drawlist(PAGENUMBER);
}

function n_drawlist(PAGENUMBER){
  for (let i = 0; i < 2; i++){
    getSeverAPI(PAGENUMBER+i, "", "list");
  }
}

function makeBox(Id, name, price){
      const newDiv1 = document.createElement('div')
      const newMName = document.createElement('h5')
      const newMPrice = document.createElement('h5')

      MLB.appendChild(newDiv1);
      newDiv1.appendChild(newMName)
      newDiv1.appendChild(newMPrice)

      newDiv1.id = Id

      newDiv1.classList.add("ListBa");
      newMName.innerHTML = `${name}`
      newMPrice.innerHTML = `${price}원`
      newMName.id = Id;

      newMName.classList.add("Listtext")
      newMPrice.classList.add("Listtexth6")
    } 

function clickBox(id){
  console.log(id)
}

// function addInformation(name, company, main_ingredient, efficacy, usage, need_to_know, cautions){
//   console.log(name, company, main_ingredient, efficacy, usage, need_to_know, cautions)
// }

function clickCheck(){
  const boxs = document.querySelectorAll(".LM > div");

boxs.forEach((el, index) => {
  el.onclick = () => {
    clickBox(el.id);
  }
}); 
}

n_drawlist(1);

MLB.addEventListener('click', clickCheck);
reach_InForm.addEventListener('submit', reach_name);