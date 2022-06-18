function CreateMessage(messageData){
  this.containerElem = document.createElement("div");
  this.messageElem = document.createElement("p");
  this.messageElem.textContent = messageData.message
  let containerClass;

  switch (messageData.type) {
    // 내 메시지
    case "self":
      containerClass = "message-me"
      this.tiemElem = document.createElement("p");
      this.tiemElem.textContent = messageData.time
      this.messageElem.classList.add("me")
      this.tiemElem.classList.add("me-time")
      this.containerElem.append(this.messageElem, this.tiemElem);      
      break
      
      // 타인 메시지 
      case "message":
      containerClass = "message-other"
      this.tiemElem = document.createElement("p");
      this.nameElem = document.createElement("p");
      this.tiemElem.textContent = messageData.time
      this.nameElem.textContent = messageData.name
      this.messageElem.classList.add("other")
      this.tiemElem.classList.add("other-time")
      this.nameElem.classList.add("other-name")
      this.containerElem.append(this.nameElem,this.messageElem, this.tiemElem);
      break

    // 입장 메시지
    case "connect":
      containerClass = "message-connect"
      this.messageElem.classList.add("connect")
      this.containerElem.append(this.messageElem)
      break

    case "disconnect":
      containerClass = "message-disconnect"
      this.messageElem.classList.add("disconnect")
      this.containerElem.append(this.messageElem)
      break
  }

  this.containerElem.classList.add(containerClass);
  document.querySelector(".chat").appendChild(this.containerElem);
  
  this.init();
}

CreateMessage.prototype = {
  constructor: CreateMessage,
  init: function(){
    const chat = document.querySelector(".chat");
    chat.scrollTop = chat.scrollHeight;
  }
}
