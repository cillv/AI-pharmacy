const NotLogIn = document.querySelector("#notlogin");
const YesLogIn = document.querySelector("#yeslogin");

const Benner = document.querySelector("#benner");
// const UserImg = document.querySelector("#user_img")
const username_html = document.getElementById("username_h3");

const contentBox = document.getElementById("contentM");

let userName = localStorage.getItem("name");

// access 토큰 만료되면 쓸거
let token = localStorage.getItem("refresh");

//진단 내역 받아올때 쓸 토큰
let access = localStorage.getItem("access");

function login_state_check() {
  if (token == undefined && access == undefined) {
    YesLogIn.classList.add("hidden");
    NotLogIn.classList.remove("hidden");

    Benner.classList.add("hidden");
    username_html.classList.add("hidden");
  } else {
    console.log("draw my page"); //로그인이 됐을 때
    NotLogIn.classList.add("hidden");
    YesLogIn.classList.remove("hidden");

    Benner.classList.remove("hidden");
    username_html.classList.remove("hidden");

    username_html.innerHTML = `${userName}님 어서오세요. `;
  }
}

async function getSeverAPI(type, id) {
  try {
    url = `${BASE_URL}`;

    if (type == "buy") {
      url += `api/v1/receipts/`;
    } else if (type == "doctor") {
      url += `api/v1/diagnosis/history/`;
    } else if (type == "jang") {
      url += `api/v1/inventories/`;
    } else if (type == "DELETE") {
      url += `api/v1/inventories/${id}/`;
    } else if (type == "GETSend") {
      url += `api/v1/receipts/${id}`;
    }

    if (type == "DELETE") {
      const res = await fetch(url, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });

      DrawJangHTML();
    } else {
      const res = await fetch(url, {
        mode: "cors",
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });

      const data = await res.json();

      if (type == "buy") {
        contentBox.innerHTML = "";

        const newDiv = document.createElement("div");
        contentBox.appendChild(newDiv);

        const buy_datetext = document.createElement("h5");
        const numberetext = document.createElement("h5");

        newDiv.appendChild(buy_datetext);
        newDiv.appendChild(numberetext);

        buy_datetext.innerHTML = `구매날짜`;
        numberetext.innerHTML = `총금액`;

        newDiv.classList.add("buyDiv");
        buy_datetext.classList.add("BDivText");
        numberetext.classList.add("BDivText");

        for (let i = 0; i < data.length; i++) {
          oderBuyH(data[i]);
        }
      } else if (type == "doctor") {
        contentBox.innerHTML = "";

        const newDiv = document.createElement("div");
        contentBox.appendChild(newDiv);

        const titleh = document.createElement("h5");
        const datah = document.createElement("h5");

        newDiv.appendChild(titleh);
        newDiv.appendChild(datah);

        titleh.innerHTML = `진단 내용`;
        datah.innerHTML = `날짜`;

        newDiv.classList.add("buyDiv");
        titleh.classList.add("DDivText");
        datah.classList.add("DDivText");

        for (let i = 0; i < data.length; i++) {
          oderDoctorH(data[i]);
        }
      } else if (type == "jang") {
        contentBox.innerHTML = "";
        const infobar = document.createElement("div");
        contentBox.appendChild(infobar);

        const nametext = document.createElement("h5");
        const companytext = document.createElement("h5");
        const numberetext = document.createElement("h5");
        const pricetext = document.createElement("h5");

        infobar.appendChild(nametext);
        infobar.appendChild(companytext);
        infobar.appendChild(numberetext);
        infobar.appendChild(pricetext);

        nametext.innerHTML = `약 이름`;
        companytext.innerHTML = `제조사`;
        numberetext.innerHTML = `개수`;
        pricetext.innerHTML = `가격(1개 기준)`;

        infobar.classList.add("buyDiv");
        nametext.classList.add("JDivText");
        companytext.classList.add("JDivText");
        numberetext.classList.add("JDivText");
        pricetext.classList.add("JDivText");

        for (let i = 0; i < data.length; i++) {
          oderJangH(data[i]);
        }
      } else if (type == "GETSend") {
        contentBox.innerHTML = "";

        const newDiv = document.createElement("div");
        contentBox.appendChild(newDiv);

        const MDiv = document.createElement("div");
        contentBox.appendChild(MDiv);

        const buy_datetext = document.createElement("h5");
        const numberetext = document.createElement("h5");
        const M_S = document.createElement("h5");

        newDiv.appendChild(numberetext);
        newDiv.appendChild(buy_datetext);
        MDiv.appendChild(M_S);

        buy_datetext.innerHTML = `구매날짜: ${data.purchase_at}`;
        numberetext.innerHTML = `총금액: ${data.total_price}`;
        M_S.innerHTML = `구매한 약 목록`;

        newDiv.classList.add("buyDiv");
        MDiv.classList.add("buyDiv");
        M_S.style.width = "98%";
        M_S.style.margin = "1%";
        buy_datetext.classList.add("B_A_DivText");
        numberetext.classList.add("B_A_DivText");

        const nametext = document.createElement("h5");
        const pricetext = document.createElement("h5");
        const number_text = document.createElement("h5");

        MDiv.appendChild(nametext);
        MDiv.appendChild(pricetext);
        MDiv.appendChild(number_text);

        nametext.innerHTML = `제품명`;
        number_text.innerHTML = `수량`;
        pricetext.innerHTML = `가격`;

        nametext.classList.add("BDivText");
        number_text.classList.add("BDivText");
        pricetext.classList.add("BDivText");

        for (let i = 0; i < data.past_medicines.length; i++) {
          DrawBuy(data.past_medicines[i]);
        }
        const btn = document.createElement("button");
        contentBox.appendChild(btn);
        btn.innerHTML = "뒤로가기";
        btn.onclick = function () {
          DrawBuyHTML();
        };
      }
    }
  } catch (error) {
    console.error("네트워크 요청 실패:", error);
    alert("검색 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
  }
}

function DrawBuyHTML() {
  getSeverAPI("buy");
}

function sendBuy(id) {
  getSeverAPI("GETSend", id);
}

function oderBuyH(data) {
  const newDiv = document.createElement("div");
  contentBox.appendChild(newDiv);

  let id = data.id;
  newDiv.id = id;

  let buy_date = data.purchase_at;
  let number = data.total_price;

  const buy_datetext = document.createElement("h5");
  const numberetext = document.createElement("h5");
  const A_D_B = document.createElement("button");
  const RB = document.createElement("button");

  newDiv.appendChild(buy_datetext);
  newDiv.appendChild(numberetext);
  newDiv.appendChild(A_D_B);
  newDiv.appendChild(RB);

  buy_datetext.innerHTML = `${buy_date}`;
  numberetext.innerHTML = `${number}`;

  A_D_B.innerHTML = "더보기";
  A_D_B.onclick = function () {
    sendBuy(id);
  };

  RB.innerHTML = "리뷰 작성";
  RB.onclick = function () {};

  newDiv.classList.add("buyDiv");
  buy_datetext.classList.add("BDivText");
  numberetext.classList.add("BDivText");
  A_D_B.classList.add("BDivTextB");
  RB.classList.add("BDivTextB");
}

function DrawBuy(m_data) {
  const newDiv = document.createElement("div");
  contentBox.appendChild(newDiv);

  const nametext = document.createElement("h5");
  const pricetext = document.createElement("h5");
  const numberetext = document.createElement("h5");

  newDiv.appendChild(nametext);
  newDiv.appendChild(pricetext);
  newDiv.appendChild(numberetext);

  nametext.innerHTML = `${m_data.medicine.name}`;
  numberetext.innerHTML = `${m_data.quantity}`;
  pricetext.innerHTML = `${m_data.medicine.price}`;

  newDiv.classList.add("buyDiv");
  nametext.classList.add("BDivText");
  numberetext.classList.add("BDivText");
  pricetext.classList.add("BDivText");
}

function DrawDoctorHTML() {
  getSeverAPI("doctor");
}

function oderDoctorH(data) {
  const newDiv = document.createElement("div");
  contentBox.appendChild(newDiv);

  let id = data.id;

  let date = data.created_at;
  let title = data.title;

  const titleh = document.createElement("h5");
  const datah = document.createElement("h5");

  newDiv.appendChild(titleh);
  newDiv.appendChild(datah);

  titleh.innerHTML = `${title}`;
  datah.innerHTML = `${date}`;

  newDiv.classList.add("buyDiv");
  titleh.classList.add("DDivText");
  datah.classList.add("DDivText");
}

function DrawJangHTML() {
  getSeverAPI("jang");
}

function sendJang(id) {
  getSeverAPI("DELETE", id);
}

function oderJangH(data) {
  const newDiv = document.createElement("div");
  contentBox.appendChild(newDiv);

  let id = data.id;

  let number = data.quantity;
  let medicine = data.medicine;

  let company = medicine.company;
  let m_id = medicine.id;
  let m_name = medicine.name;
  let m_price = medicine.price;

  const nametext = document.createElement("h5");
  const companytext = document.createElement("h5");
  const numberetext = document.createElement("h5");
  const pricetext = document.createElement("h5");
  const btn = document.createElement("button");

  newDiv.appendChild(nametext);
  newDiv.appendChild(companytext);
  newDiv.appendChild(numberetext);
  newDiv.appendChild(pricetext);
  newDiv.appendChild(btn);

  btn.innerHTML = "취소";
  btn.onclick = function () {
    sendJang(id);
  };

  nametext.innerHTML = `${m_name}`;
  companytext.innerHTML = `${company}`;
  numberetext.innerHTML = `${number}개`;
  pricetext.innerHTML = `${m_price}원`;

  newDiv.classList.add("buyDiv");
  nametext.classList.add("JDivText");
  companytext.classList.add("JDivText");
  numberetext.classList.add("JDivText");
  pricetext.classList.add("JDivText");
  btn.classList.add("JDivText");
}

document.body.addEventListener("submit", login_state_check());
