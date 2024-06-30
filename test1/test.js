import { BASE_URL } from "../urls.js";

const login_button = document
  .querySelector("#make_account")
  .addEventListener("click", make_account);

function make_account() {
  const userID = document.querySelector("#user_id").value;
  const userPW = document.querySelector("#user_pw").value;
  login(userID, userPW);
}
async function login(userID, userPW) {
  try {
    const res = await fetch(BASE_URL + "api/v1/users/token", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userID,
        password: userPW,
      }),
    });

    const data = await res.json();
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("access", data.access);
    // alert("로그인이 완료되었습니다.");
    window.location.href = "../test2/test.html";
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}
