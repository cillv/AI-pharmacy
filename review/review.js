document.getElementById("submitReview").addEventListener("click", function () {
  const form = document.getElementById("myform");
  const formData = new FormData(form);
  const star = formData.get("reviewStar");
  const reviewWrite = document.getElementById("reviewContents").value;
  submitReview(star, reviewWrite);
  console.log(star);
  console.log(reviewWrite);
  let id;
  async function submitReview(star, reviewWrite) {
    try {
      let id = localStorage.getItem();
      const res = await fetch(
        BASE_URL + "api/v1/medicines/" + `${id}/` + "/reviews/",
        {
          mode: "cors",
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            rating: star,
            detail: reviewWrite,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      alert("리뷰작성이 완료되었습니다. ");
      window.location.href = "../Mypage/Mypage.html";
    } catch (error) {
      console.error("네트워크 요청 실패:", error);
      alert("제출하지 못했습니다. 다시 시도하세요");
    }
  }
});
