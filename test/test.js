const login_button = document
  .querySelector("#logioB")
  .addEventListener("click", loginstart);

function loginstart() {
  if (window.event.keyCode == 13) {
    const userID = document.querySelector("#user_id").value;
    const userPW = document.querySelector("#user_pw").value;
    if (!userID || !userPW) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    } else {
      alert("끝");
    }
  }
}
