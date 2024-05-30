const Signup_id = document.querySelector("#id_create");
const Signup_PW = document.querySelector("#PW_create");
const Create_ID_input = document.querySelector("#id_create input");
const Create_PW_input = document.querySelector("#PW_create input");

const MakeButton = document.querySelector("#make_account");

var UserID, UserPW;

function SaveID(event){
    event.preventDefault();
    const SaveID = Create_ID_input.value;
    
    return UserID=SaveID;
}

function SavePW(event){
    event.preventDefault();
    const SavePW = Create_PW_input.value;

    return UserPW=SavePW;
}

function make_account(){
    if (UserID==null||UserPW==null||UserID==""||UserPW==""){
        alert("계정을 생성할 수 없습니다.")
    }
    else{
        alert("계정 생성 완료.")
        console.log(UserID)
        console.log(UserPW)
    }
}
  
Signup_id.addEventListener("submit", SaveID);
Signup_PW.addEventListener("submit", SavePW);
  