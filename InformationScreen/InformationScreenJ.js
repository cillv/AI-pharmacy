const reach_InForm = document.querySelector("#reach_Inform");
const reach_InForm_Name = document.querySelector("#reach_Inform input");
const parent = document.querySelector("#reach_img");
const parent3 = document.querySelector("#reach_value");

async function getJSONfromAPI(search_m_name) {
  const baseurl = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
  const key = "kOigE0Z%2FlrmroG%2B4zTcAY6MkIaeAdMBx0arSSrwWfuqmTIuCyNq3nTnRXfmxYBcUyBUzt5U5H8frcJatTCBABA%3D%3D";
  const params = { type: "json", numOfRows: 50 };
  const queryString = new URLSearchParams(params).toString();
  const requrl = `${baseurl}?serviceKey=${key}&${queryString}`;

  reset_reach();

  try {
      const response = await fetch(requrl);
      const jsonData = await response.json();
      const items = jsonData.body.items;
      
      console.log(jsonData["body"]["items"])
      
      const userInput = search_m_name;
      const selectedItem = items.find(item => item.itemName === userInput);
      

      if (selectedItem) {
        displayReachEnd(selectedItem);
      } else {
        parent3.innerText = "일치하는 약이 없습니다.";
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  }
  
  function reset_reach(){
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
    
    parent3.innerText += "약 이름 : " + selectedItem.itemName + "\n";
    parent3.innerText += "약 복용상황 : " + selectedItem.efcyQesitm + "\n";
    parent3.innerText +=  "약 주의상황 : " + selectedItem.atpnQesitm + "\n";
  }
  
  
  // API로부터 데이터를 가져온 후 호출됩니다.
  
  
function reach_name(event){
  event.preventDefault();
  const search_m_name = reach_InForm_Name.value;
  getJSONfromAPI(search_m_name);
}

reach_InForm.addEventListener("submit", reach_name);