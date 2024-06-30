const login_button = document
  .querySelector("#make_account")
  .addEventListener("click", make_account);

function make_account() {
  const userID = document.querySelector("#user_id").value;
  const userPW = document.querySelector("#user_pw").value;
  const userPWConfirm = document.querySelector("#user_pw_confirm").value;
  const userEmail = document.querySelector("#user_email").value;
  const userName = document.querySelector("#user_name").value;
  const idPattern = /^[a-zA-Z0-9]+$/;
  const pwPattern = /^[a-zA-Z0-9]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userID || !userPW || !userPWConfirm || !userEmail || !userName) {
    alert("모든 칸을 채워주세요.");
    return;
  }
  if (!idPattern.test(userID)) {
    alert("아이디는 영어와 숫자만 사용해야합니다.");
    return;
  }
  if (!pwPattern.test(userPW)) {
    alert("비밀번호는 영어와 숫자만 사용해야합니다.");
    return;
  }
  if (userPW !== userPWConfirm) {
    alert("비밀번호 확인이 일치하지 않습니다.");
    return;
  }
  if (!emailPattern.test(userEmail)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }
  signUp(userID, userPW, userEmail, userName);
  // window.location.href = "../../main/main.html";
}

async function signUp(userID, userPW, userEmail, userName) {
  const BASE_URL = "http://192.168.0.44:8000/";
  try {
    const res = await fetch(BASE_URL + "api/v1/users/", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userID,
        password: userPW,
        name: userName,
        email: userEmail,
      }),
    });

    const data = await res.json();
    console.log(data);
    alert("회원가입이 완료되었습니다.");
    window.location.href = "../../log in/log.html";
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}
