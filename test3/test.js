import { BASE_URL } from "../urls.js";

const login_button = document
  .querySelector("#make_account")
  .addEventListener("click", make_account);

function make_account() {
  login();
}
async function login() {
  const token = localStorage.getItem("refresh");
  try {
    const res = await fetch(BASE_URL + "api/v1/users/token/refresh", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token,
      }),
    });

    const data = await res.json();
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("access", data.access);
    window.location.href = "../test2/test.html";
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}
