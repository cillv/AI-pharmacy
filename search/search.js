let id;
async function sendMessage() {
  const prompt = document.getElementById("userInput").value;

  try {
    access = await localStorage.getItem("access");
    const res = await fetch(
      BASE_URL + `api/v1/diagnosis/` + (id === undefined ? "" : `${id}/`),
      {
        mode: "cors",
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    let result;
    if (id === undefined) {
      result = data["queries"][0]["result"];
      id = data["id"];
    } else {
      result = data["result"];
    }

    // 사용자 메시지 추가
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = prompt;
    messages.appendChild(userMessage);

    // 봇 응답 추가
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.textContent = result;
    messages.appendChild(botMessage);

    // 입력 필드 초기화
    document.getElementById("userInput").value = "";
    messages.scrollTop = messages.scrollHeight;
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색을 실패했습니다. 나중에 다시 시도해주세요.");
  }
}
