const reach_InForm = document.querySelector("#reach_Inform");
const reach_InForm_Name = document.querySelector("#reach_Inform input");
const parent4 = document.querySelector("#list_M");
const MLB = document.querySelector("#M_list");

const backB = document.querySelector("#backB");
const nextB = document.querySelector("#nextB");

let PAGENUMBER = 1;

async function getSeverAPI(PAGENUMBER, m_name, id, F_type){
  try {
    url = `${BASE_URL}api/v1/medicines/`

    if (PAGENUMBER != null){
      url+=`?page=${PAGENUMBER}`;
    }

    if (m_name != null){
      url+=`?search=${m_name}`;
    }

    if(id != null){
      url+=`${id}`;
    }

    const res = await fetch(url, {
      mode: "cors", 
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();

    if (F_type=="list"){
      for(var i=0; i<10; i++){
        makeBox(data[i].id, data[i].name, data[i].price, data[i].remaining, data[i].img_url);
      }
    }else if (F_type=="search"){
      const newDiv1 = document.createElement('div')

      const MName = document.createElement('h5')
      const MCompany = document.createElement('h5')
      const MPrice = document.createElement('h5')

      MLB.appendChild(newDiv1)
      newDiv1.appendChild(MName)
      newDiv1.appendChild(MCompany)
      newDiv1.appendChild(MPrice)

      MName.innerHTML = `이름`
      MPrice.innerHTML = `가격`
      MCompany.innerHTML = `제조사`

      newDiv1.classList.add("parentStyle")
      MName.classList.add("parentText")
      MPrice.classList.add("parentText")
      MCompany.classList.add("parentText")
      newDiv1.style.backgroundColor = "gainsboro"

      for(var i=0; i<data.length; i++){
        addInformation(data[i].id)
      }
    }else if (F_type=="getinfo"){

      draw_search_list(data.id, data.name, data.price, data.company)}

    return data;
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}

  
// 검색 기능

//input 받기
function reach_name(event){
  event.preventDefault();
  const search_m_name = reach_InForm_Name.value;
  
  MLB.innerHTML = ""
  getSeverAPI(null, search_m_name, null, "search")
}

//정보 표기
function addInformation(id){
  getSeverAPI(null, null, id, "getinfo")
}

//리스트 그리기
function draw_search_list(id, name, price, company){
  const newDiv1 = document.createElement('div')
  const MName = document.createElement('h5')
  const MCompany = document.createElement('h5')
  const MPrice = document.createElement('h5')

  MLB.appendChild(newDiv1)
  newDiv1.appendChild(MName)
  newDiv1.appendChild(MCompany)
  newDiv1.appendChild(MPrice)
  newDiv1.id = id

  MName.innerHTML = `${name}`
  MPrice.innerHTML = `${price} 원`
  MCompany.innerHTML = `${company}`

  newDiv1.classList.add("parentStyle")
  MName.classList.add("parentText")
  MPrice.classList.add("parentText")
  MCompany.classList.add("parentText")

  nextB.classList.add("hidden")
  backB.classList.add("hidden")
}

// 약 목록 리스트

//버튼
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

// 페이지 수 이동
function n_drawlist(PAGENUMBER){
  for (let i = 0; i < 2; i++){
    getSeverAPI(PAGENUMBER+i, null, null, "list");
  }
}

//상자 그리기
function makeBox(Id, name, price, remaining, m_img_url){
  const newDiv1 = document.createElement('div')
  const newMName = document.createElement('h5')
  const newMPrice = document.createElement('h5')
  const newMRemain = document.createElement('h5')
  const newMImg = document.createElement('img')
  // const newMImg = document.createElement('iframe')

  MLB.appendChild(newDiv1);
  newDiv1.appendChild(newMImg)
  newDiv1.appendChild(newMName)
  newDiv1.appendChild(newMPrice)
  newDiv1.appendChild(newMRemain)

  newMImg.src = m_img_url
  // newMImg.src = m_img_url
  console.log("imgurl: ", m_img_url)

  newDiv1.id = Id

  newDiv1.classList.add("ListBa");
  newMName.innerHTML = `${name}`
  newMPrice.innerHTML = `${price}원`
  newMRemain.innerHTML = `재고 : ${remaining}개`
  newMName.id = Id;

  newMImg.classList.add("Listimg")
  newMName.classList.add("Listtext")
  newMPrice.classList.add("Listtexth6")
  newMRemain.classList.add("Listtexth6")
} 

//상세 설명

//체크된 상자 표시
function clickCheck(){
  const boxs = document.querySelectorAll(".LM > div");
  
  boxs.forEach((el, index) => {
    el.onclick = () => {
      clickBox(el.id);
    }
  }); 
}
    
function clickBox(id){
  A_D_NEED_ID = localStorage.setItem("A_D_NEED_ID", `${id}`);

  const openPopup = () => {
    // 팝업을 띄울 페이지 URL
    var popupURL = "../About_Description/A_D.html";
    // 팝업 창의 속성
    var option = "width=600,height=400,scrollbars=yes";
    // 팝업 열기
    window.open(popupURL, "Popup", option);
  }

  openPopup()
}

//초기 세팅
n_drawlist(1);
MLB.addEventListener('click', clickCheck);
reach_InForm.addEventListener('submit', reach_name);