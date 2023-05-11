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
    alink.href = linkInfo.linkAddress;
    this.message.appendChild(alink);
  }
}

let chatbotToggler = document.getElementById("chatbot-toggler");
let chatWindow = document.getElementsByClassName("chatbot-window")[0];
let menuWindow = document.getElementById("offcanvasRight");
let menuToggler = document.getElementById("menu-btn");
chatWindow.style.bottom = "40px";
chatWindow.style.right = "0";
let chatBody = document.getElementById("messages-here");
let chatToggled = false;

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
    m.scrollIntoView(true);
  })
}
function removeAllChildNodes(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}
function startChatbot(){
  showMsgAfterTimeout("Hello there, I am Cosmic Cruiser your virtual assistant.", 1000);
  sleep(1000).then(() => {
    showMsgAfterTimeout("How can I help you today? Please select one:", 1000);
    sleep(1000).then(() => {
      showMsgAfterTimeout("To register for the program click here -> ",1000,
      {
        linkName: "Registration",
        linkAddress: "booking.html"
      })
      showMsgAfterTimeout("To learn about the matters click here -> ",1000,
      {
        linkName: "Our Plans",
        linkAddress: "packages.html"
      })
      showMsgAfterTimeout("To learn about the cost of the different plans click here -> ",1000,
      {
        linkName: "Cost of Plans",
        linkAddress: "packages.html"
      })
      showMsgAfterTimeout("If none of the above work then click here -> ",1000,
      {
        linkName: "Others",
        linkAddress: "packages.html"
      })
      
    })
  })
}