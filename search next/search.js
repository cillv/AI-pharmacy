const username = localStorage.getItem("name");
document.getElementById("usernameDisplay").innerText = username;
const click = document
  .querySelector("#searchA")
  .addEventListener("click", searchstart);

async function searchstart(event) {
  document.querySelector("#searchA").disabled = false;
  const prompt = document.getElementById("inputField").value;
  try {
    access = await localStorage.getItem("access");
    const res = await fetch(BASE_URL + `api/v1/diagnosis/`, {
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
    });

    const data = await res.json();
    console.log(data);
    const pharmacy = data["title"];
    document.getElementById("pharmacyDisplay").innerText = pharmacy;
    const result = data["queries"][0]["result"];
    console.log(result);

    const resultDisplay = document.getElementById("resultDisplay");
    if (!resultDisplay) {
      console.error("resultDisplay 요소를 찾을 수 없습니다.");
      return;
    }

    // img 요소를 제거하고 resultDisplay를 업데이트
    const img = document.querySelector(".robot-image");
    if (img) {
      img.remove();
    }

    // resultDisplay를 텍스트로 업데이트하고 보이게 설정
    resultDisplay.innerText = result;
    resultDisplay.style.display = "flex";
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색을 실패했습니다. 나중에 다시 시도해주세요.");
  }
}
