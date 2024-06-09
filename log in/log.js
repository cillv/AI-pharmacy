const login_button = document
  .querySelector("#logioB")
  .addEventListener("click", loginstart);

function loginstart() {
  const userID = document.querySelector("#user_id").value;
  const userPW = document.querySelector("#user_pw").value;
  if (!userID || !userPW) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
  } else {
    loginSever(userID, userPW);
  }
}

async function loginSever(userID, userPW) {
  const BASE_URL = "http://192.168.0.67:8000/";
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
    console.log(data);
    alert("로그인이 완료되었습니다.");
    // window.location.href = "../main/main.html";
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}
