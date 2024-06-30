import BASE_URL from "../url.js";

const login_button = document
  .querySelector("#make_account")
  .addEventListener("click", make_account);

function make_account() {
  login();
}
async function login() {
  try {
    const res = await fetch(BASE_URL + "api/v1/users/me", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(data["name"]);
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}
