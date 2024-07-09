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
  try {
    const res = await fetch(BASE_URL + "api/v1/users/token/", {
      mode: "cors",
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + data.access,
      },
      body: JSON.stringify({
        username: userID,
        password: userPW,
      }),
    });
    if (res.status == 200) {
      const data = await res.json();
      console.log(data);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      console.log(localStorage.getItem("access"));
      alert("로그인이 완료되었습니다.");
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
        localStorage.setItem("name", data["name"]);
        window.location.href = "../main/main.html";
      } catch (error) {
        console.error("네트워크 요청 실패:", error);
        alert("회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    } else alert("존재하지 않는 아이디 또는 비밀번호 입니다");
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}
