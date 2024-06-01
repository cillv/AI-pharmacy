document.querySelector("#id_create").addEventListener("submit", SaveID);
document.querySelector("#PW_create").addEventListener("submit", SavePW);

var UserID, UserPW;

function SaveID(event) {
  event.preventDefault();
  UserID = document.querySelector("#user_id").value;
}

function SavePW(event) {
  event.preventDefault();
  UserPW = document.querySelector("#user_pw").value;
}

function make_account() {
  const UserID = document.querySelector("#user_id").value;
  const UserPW = document.querySelector("#user_pw").value;
  const UserPWConfirm = document.querySelector("#user_pw_confirm").value;
  const UserEmail = document.querySelector("#user_email").value;
  const UserPhone = document.querySelector("#user_phone").value;

  const idPattern = /^[a-zA-Z0-9]+$/;
  const pwPattern = /^[a-zA-Z0-9]+$/;
  const phonePattern = /^[0-9]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!UserID || !UserPW || !UserPWConfirm || !UserEmail || !UserPhone) {
    alert("모든 칸을 채워주세요.");
    return;
  }

  if (!idPattern.test(UserID)) {
    alert("아이디는 영어와 숫자만 사용해야합니다.");
    return;
  }

  if (!pwPattern.test(UserPW)) {
    alert("비밀번호는 영어와 숫자만 사용해야합니다.");
    return;
  }

  if (UserPW !== UserPWConfirm) {
    alert("비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  if (!phonePattern.test(UserPhone)) {
    alert("전화번호는 숫자만 사용해야합니다.");
    return;
  }

  if (!emailPattern.test(UserEmail)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }

  alert("계정 생성 완료.");
  window.location.href = "../../main/main.html";
}
