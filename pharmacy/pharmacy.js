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

  for (let i = 1; i <= 3; i++) {
    // 1부터 3까지 반복
    const button = document.createElement("button"); // 새로운 버튼 요소를 생성
    button.className = "custom-btn2 btn-1"; // 버튼의 클래스 설정
    button.innerText = `${regionId} ${i}`; // 버튼의 텍스트를 지역 ID와 숫자로 설정
    button.onclick = () => (location.href = "../../main/main.html"); // 버튼 클릭 시 main.html로 이동
    bContainer.appendChild(button); // 버튼을 b 컨테이너에 추가
  }

  container.parentNode.appendChild(bContainer); // b 컨테이너를 클릭된 버튼의 부모 요소에 추가
}
