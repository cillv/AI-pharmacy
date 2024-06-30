const reach_InForm = document.querySelector("#reach_Inform");
const reach_InForm_Name = document.querySelector("#reach_Inform input");
const parent = document.querySelector("#reach_img");
const parent3 = document.querySelector("#reach_value");
const parent4 = document.querySelector("#list_M");
const MLB_1 = document.querySelector("#oneline");
const MLB_2 = document.querySelector("#twoline");

let PAGENUMBER = 1;



console.log(BASE_URL)
console.log(typeof(BASE_URL))


//약 검색 뻘짓한거
/*function getInfo(search_m_name){
  const m_name = search_m_name;
  for(let i=1; i>465; i++){
    let PAGENUMBER = i;
    getSeverAPI(PAGENUMBER, m_name)
    console.log("Get() : "+s_state)
    PAGENUMBER += 1;
    console.log(PAGENUMBER);
    console.log(s_state);
    if (s_state == true){break;}
    else if (PAGENUMBER>465){
        alert("일치하는 약이 존재하지 않습니다.");
        break;}
  }
  getSeverAPI(PAGENUMBER, m_name);
  alert("검색 완료")
}*/

async function getSeverAPI(PAGENUMBER, m_name, F_type){
  let pgnum = PAGENUMBER;
  let Mname = m_name;
  //const BASE_URL = "http://192.168.0.44:8000/";
  //reset_reach();
  try {
    const res = await fetch(BASE_URL + `api/v1/medicines/?page=${String(pgnum)}&search=${Mname}`, {
      mode: "cors", 
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();
    //console.log(data);

    //약 검색 뻘짓2
    /* const userInput = m_name;
    // var selectedItem;
    
    // for (let i = 0; i < 10; i++){
    //   if(data[i].name == userInput){selectedItem = data[i]};
    //   };
      
    // if (selectedItem) {
    //   window.localStorage.getItem("S_state","true");
    //   displayReachEnd(selectedItem);    } */

    if (F_type=="list"){
      for(var i=0; i<10; i++){
        makeBox(i, data[i].name);
        //getMedicinesInfo(data[i].id);
      }
    }
    
    return data;
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}

async function getMedicinesInfo(m_id){
  let id = m_id
  const BASE_URL = "http://192.168.0.204:8000/";
  try {
    const res = await fetch(BASE_URL + `api/v1/medicines/${String(m_id)}`, {
      mode: "cors", 
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();
    console.log("getMI : "+ data.name);
    
    return data;
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}

//약검색 뻘짓3
/*function reset_reach(){
  parent3.innerHTML = '';
  parent.style.display ='none';
}; 

function displayReachEnd(selectedItem) {
  const imageUrl = selectedItem.itemImage
  const imgElement = document.createElement("img");
  
  parent.style.display = ''
  
  imgElement.src = imageUrl;
  imgElement.style.width = "1000px";
  imgElement.style.height = "500px";
    
  parent.append(imgElement);

  displayText(selectedItem)
}
  
function displayText(selectedItem) {
  // 약정보 요소 추가
  const parent3 = document.querySelector("#reach_value");

  //새로 검색시 한 번 초기화
  parent3.innerHTML = ''
  
  parent3.innerText += "약 이름 : " + selectedItem.name + "\n";
  parent3.innerText += "제약사 : " + selectedItem.company + "\n"
  parent3.innerText += "가격 : " + selectedItem.price + "\n"
}*/
  
  
// API로부터 데이터를 가져온 후 호출됩니다.  
function reach_name(event){
  event.preventDefault();
  const search_m_name = reach_InForm_Name.value;
  //getJSONfromAPI(search_m_name);
  getInfo(search_m_name);
}

//reach_InForm.addEventListener("submit", reach_name);


// 약 목록 리스트
function Back_Button(){
  if (PAGENUMBER == 1){PAGENUMBER = 1;}
  else {PAGENUMBER -= 1;}
  
  n_drawlist(PAGENUMBER);
}

function Next_Button(){
  if (PAGENUMBER == 467){PAGENUMBER = 466;}
  else {PAGENUMBER += 1;}

  n_drawlist(PAGENUMBER);
}

function n_drawlist(PAGENUMBER){
  let data = getSeverAPI(PAGENUMBER, "", "list");
  console.log(data);
}

function makeBox(i, name){
  
  //if(0<=i<4){
    const newDiv1 = document.createElement('div');
    MLB_1.appendChild(newDiv1);
    newDiv1.id = i+1;
    newDiv1.innerHTML = `${name}`
//  }
  // if(5<=i<10){
  //   const newDiv2 = document.createElement('div');
  //   MLB_2.appendChild(newDiv2);
  //   newDiv2.id = i+1;
  //   newDiv2.innerHTML = `${name}`
  // }
}


/*  나중에 약 자세한 정보 표시
function addInformation(name, company, main_ingredient, efficacy, usage, need_to_know, cautions){

}*/

n_drawlist(1);