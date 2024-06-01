document
  .getElementById("agreement_form")
  .addEventListener("submit", function (event) {
    const agreeTerms = document.getElementById("agree_terms").checked;
    const agreePrivacy = document.getElementById("agree_privacy").checked;

    if (!agreeTerms || !agreePrivacy) {
      alert("모든 필수 항목에 동의해야 합니다.");
      event.preventDefault();
    }
  });
