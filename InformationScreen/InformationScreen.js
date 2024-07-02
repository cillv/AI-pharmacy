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

  
// API로부터 데이터를 가져온 후 호출됩니다.  
function reach_name(event){
  event.preventDefault();
  const search_m_name = reach_InForm_Name.value;
  //getJSONfromAPI(search_m_name);
  getInfo(search_m_name);
}


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
  for (let i = 0; i < 6; i++){
    let data = getSeverAPI(PAGENUMBER+i, "", "list");
    console.log(data);
  }
}

function makeBox(i, name){
    //if (i < 10){
      const newDiv1 = document.createElement('div');
      const newMName = document.createElement('h5');
      MLB.appendChild(newDiv1);
      newDiv1.appendChild(newMName)
      newDiv1.id = i+1;
      newDiv1.classList.add("ListBa");
      newMName.innerHTML = `${name}`
      
      newMName.classList.add("Listtext")

    // }
    // else if(i < 20){
    //   const newDiv2 = document.createElement('div');
    //   MLB.appendChild(newDiv2);
    //   newDiv2.innerHTML = `${name}`
    // }
}


/*  나중에 약 자세한 정보 표시
function addInformation(name, company, main_ingredient, efficacy, usage, need_to_know, cautions){

}*/

n_drawlist(1);