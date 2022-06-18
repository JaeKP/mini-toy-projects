const socket = io();
const chat = document.querySelector(".chat");
const chatBottom = document.querySelector(".chat-bottom");  
const chatEmoji = document.querySelector(".chat-emoji");    
const chatForm = document.querySelector(".chat-form");      
const chatEmojiForm = document.querySelector(".chat-emoji-form");
const infoForm = document.querySelector(".info-modal-form");
const alertElem = document.querySelector(".alert");
const badWord = ["바보", "멍청이"];

/* 서버로부터 데이터 받은 경우 */
socket.on("update", function (data) {
  const date = new Date();
  const time = presentTime();
  const messageData = {
    type: data.type,
    message: data.message,
    name: data.name,
    time: time,
  };
  new CreateMessage(messageData);
});

// 현재 시간을 return 하는 함수
function presentTime() {
  const date = new Date();
  let timeZone;
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours === "0") {
    timeZone = "오전";
    hours = "12";
  } else if (hours < 12) {
    timeZone = "오전";
  } else if (hours === 12) {
    timeZone = "오후";
    hours = "12";
  } else {
    timeZone = "오후";
    hours = hours - 12;
  }

  if (date.getMinutes().toString().length === 1) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }

  const time = `${timeZone} ${hours}:${minutes}`;
  return time;
}

// 전송 함수
function send(inputMessage) {
  const message = inputMessage;
  const time = presentTime();

  // 내가 전송한 메시지를 화면에 보여준다.
  const messageData = {
    type: "self",
    message: message,
    time: time,
  };
  new CreateMessage(messageData);

  // 서버로 send 이벤트를 전달한다. (데이터를 객체에 담아 전달)
  socket.emit("send", { type: "message", message: message });
}

//욕설 필터링 함수
function checkWord(data) {
  return badWord.some((elem) => data.includes(elem));
}

infoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const infoModal = event.target.parentNode;
  const name = event.target[0].value;
  event.target[0].value = "";

  if (!name) {
    name = "익명";
  }

  // modal창 사라짐
  infoModal.style.display = "none";

  // 서버에 새로운 유저가 왔다고 알림
  socket.emit("join", name);
});

// 채팅 필터링
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputMessage = event.target[0].value;
  const alertMessage = alertElem.children[0].children[1];
  if (checkWord(inputMessage)) {
    alertMessage.innerText = "부적절한 언어가 포함되어 있습니다.";
    alertElem.style.display = "flex";
    setTimeout(() => {
      alertElem.style.display = "none";
    }, 1400);
    return;
  }

  if (inputMessage === "") {
    alertMessage.innerText = "메시지를 입력해주세요.";
    alertElem.style.display = "flex";
    setTimeout(() => {
      alertElem.style.display = "none";
    }, 1400);
    return;
  }

  event.target[0].value = "";
  send(inputMessage);
});

alertElem.addEventListener("click", () => {
  alertElem.style.display = "none";
});

// 이모지 모드로 전환
chatEmoji.addEventListener("click", (event) => {
  chat.style.height = "60%";
  chatBottom.style.height = "calc(40% - 0.5em)";
  chatForm.style.height = "15%";
  chatEmojiForm.style.display = "flex";
});

// 채팅 모드로 전환
chat.addEventListener("click", (event) => {
  if (chatEmojiForm.style.display === "none") {
    return;
  }
  chat.style.height = "90%";
  chatBottom.style.height = "calc(10% - 0.5em)";
  chatForm.style.height = "75%";
  chatEmojiForm.style.display = "none";
});

// 이모지 클릭
chatEmojiForm.addEventListener("click", (event) => {
  if( event.target.localName !== "span" ) {return}
  const clickEmoji = event.target.textContent;
  const inputData = `${chatForm.children[0].value}${clickEmoji}`
  chatForm.children[0].value = inputData
});
