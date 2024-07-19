function showButtons(regionId) {
  const container = document.getElementById(regionId); // 클릭된 버튼의 ID를 기반으로 요소를 찾음
  const existingButtons = document.getElementsByClassName("b-buttons"); // 모든 b 버튼을 찾음

  // 기존 b 버튼이 있으면 모두 제거
  for (let i = 0; i < existingButtons.length; i++) {
    existingButtons[i].remove();
  }

  // 새로운 b 버튼 컨테이너 생성
  const bContainer = document.createElement("div");
  bContainer.className = "b-buttons";

  // 각 지역에 따른 버튼 이름 설정
  const buttonNames = {
    seoul: ["서울 마포점", "서울 여의나루점", "서울 건대입구점"],
    gyeonggi: ["수원시 화성점", "남양주시 터미널점", "성남 터미널점"],
    incheon: ["인천 공항점", "인천 인하대점", "인천 시청점"],
    daejeon: ["대전 터미널점", "천안 터미널점", "예산 충남도청점"],
    busan: ["부산 해운대점", "대구 터미널점", "울산 울산시청점"],
    gwangju: ["광주시 시청점", "여수시 시청점", "전주 한옥마을점"],
    gangwon: ["춘천 터미널점", "원주 시청점", "평택 터미널점"],
    jeju: ["제주 공항점", "제주 한라산점", "제주 일출봉점"],
  };

  const names = buttonNames[regionId] || [];

  for (let i = 0; i < names.length; i++) {
    const button = document.createElement("button"); // 새로운 버튼 요소를 생성
    button.className = "custom-btn2 btn-1"; // 버튼의 클래스 설정
    button.innerText = names[i]; // 버튼의 텍스트를 설정
    button.style.width = "auto"; // 버튼의 너비를 자동으로 설정
    button.onclick = () => {
      localStorage.setItem("selectedButton", names[i]); // 버튼 클릭 시 선택된 버튼 이름을 localStorage에 저장
      location.href = "../../main/main.html"; // main.html로 이동
    };
    bContainer.appendChild(button); // 버튼을 b 컨테이너에 추가
  }

  container.parentNode.appendChild(bContainer); // b 컨테이너를 클릭된 버튼의 부모 요소에 추가
}
