let chatbotToggler = document.getElementById("chatbot-toggler");
let chatWindow = document.getElementsByClassName("chatbot-window")[0];
let menuWindow = document.getElementById("offcanvasRight");
let menuToggler = document.getElementById("menu-btn");
let nam = document.getElementById("inputName");
let temail = document.getElementById("inputEmail");
let tquestion = document.getElementById("inputQuestion");
let w = document.getElementById("form-incomplete");
chatWindow.style.bottom = "40px";
chatWindow.style.right = "0";
let chatBody = document.getElementById("messages-here");
let chatToggled = false;

var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));
console.log(dir);
class Blinker {
  constructor(){
    this.blinker = document.createElement("div");
    this.blinker.className = "typing-indicator";
    this.blinker.style.display = "none";
    for (let i = 0; i < 3; i++){
      this.blinker.appendChild(document.createElement("span"));
    }
  }
  display(){
    this.blinker.style.display = "block";
  }
  hide(){
    this.blinker.style.display = "none";
  }
  getBlinker(){
    return this.blinker;
  }
  addToDiv(theDiv){
    theDiv.appendChild(this.getBlinker());
  }
}

class BotMessage {
  constructor(messageText){
    this.message = document.createElement("p");
    this.message.className = "from-them";
    this.message.innerHTML = messageText;
    this.message.style.display = "none";
  }
  display(){
    this.message.style.display = "block";
  }
  hide(){
    this.message.style.display = "none";
  }
  addTail(){
    this.message.className = "from-them";
  }
  removeTail(){
    this.message.className = "from-them no-tail";
  }
  getMsgDiv(){
    return this.message
  }
  addToDiv(theDiv){
    theDiv.appendChild(this.getMsgDiv());
  }
}
class ClientMessage {
  constructor(messageText){
    this.message = document.createElement("p");
    this.message.className = "from-me";
    this.message.innerHTML = messageText;
    this.message.style.display = "none";
  }
  display(){
    this.message.style.display = "block";
  }
  hide(){
    this.message.style.display = "none";
  }
  addTail(){
    this.message.className = "from-me";
  }
  removeTail(){
    this.message.className = "from-me no-tail";
  }
  getClientMsgDiv(){
    return this.message;
  }
  addToDiv(theDiv){
    theDiv.appendChild(this.getClientMsgDiv());
  }
}

class BotMessageWithLink extends BotMessage {
  constructor(message, linkInfo){
    super(message);
    let alink = document.createElement("a");
    alink.innerHTML = linkInfo.linkName;
    if (window.location.pathname.indexOf("plans") != -1){
      alink.href = "../"+linkInfo.linkAddress;
    } else {
      alink.href = linkInfo.linkAddress;
    }
    
    alink.className = "btn btn-link";
    this.message.appendChild(alink);
  }
}
class BotMsgWithModal extends BotMessage {
  constructor(message, btnText){
    super(message);
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-link";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#others-modal");
    btn.innerHTML = btnText;
    btn.onclick = () => {
      w.style.display = "none";
      nam.value = "";
      temail.value = "";
      tquestion.value = "";
    }
    btn.style.height = this.message.style.minHeight;
    btn.style.width = this.message.style.minHeight;
    this.message.appendChild(btn)
  }
}

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}

function fadein(element) {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
  }, 10);
}

menuToggler.onclick = () =>{
  // fade(chatWindow);
  chatWindow.style.display = "none";
}
menuWindow.addEventListener("focusout", (event) => {
  sleep(500).then(() => {
    // fadein(chatWindow);
    chatWindow.style.display = "block";
  })
})

chatbotToggler.onclick = () => {
    chatToggled = !chatToggled;
    if (chatToggled){
      removeAllChildNodes(chatBody);
      chatWindow.style.visibility = "visible";
      removeAllChildNodes(chatBody);
      startChatbot();
    }else {
      chatWindow.style.visibility = "hidden";
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function showMsgAfterTimeout(msg, milliSec, linkInfo=null){
  let m;
  if (linkInfo !== null){
    m = new BotMessageWithLink(msg, linkInfo)
    m.removeTail();
  } else {
    m = new BotMessage(msg);
  }
  let b = new Blinker();
  b.addToDiv(chatBody);
  m.addToDiv(chatBody);
  b.display();
  sleep(milliSec).then(() => {
    b.hide();
    m.display();
    // m.scrollIntoView(true);
  })
}
function removeAllChildNodes(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}
function msgShow(message, linkInfo, hasTail=true){
  let newM = new BotMessageWithLink(message, {
    linkName: linkInfo.linkName,
    linkAddress: linkInfo.linkAddress
  })
  newM.addToDiv(chatBody);
  if (!hasTail){
    newM.removeTail();
  }
  sleep(1200).then(() => {

    newM.display();
  })
}
function startChatbot(){
  showMsgAfterTimeout("Hello there, I am Cosmic Cruiser your virtual assistant.", 1000);
  sleep(1000).then(() => {
    showMsgAfterTimeout("What would your like to learn about? Please select one:", 1000);
    msgShow("",
    {
      linkName: "Resgistration",
      linkAddress: "booking.html"
    }, false);
    msgShow("",
    {
      linkName: "Our Plans",
      linkAddress: "packages.html"
    }, false);
    msgShow("",
    {
      linkName: "Know your Spacecraft",
      linkAddress: "spacecraft.html"
    }, false);

    let b = new BotMsgWithModal("", "Others");
    b.addToDiv(chatBody);
    sleep(1200).then(() => {
      b.display();
    })
  })
}