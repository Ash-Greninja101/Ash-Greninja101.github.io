let chatbotToggler = document.getElementById("chatbot-toggler");
let chatWindow = document.getElementsByClassName("chatbot-window")[0];
let chatToggled = false;

chatbotToggler.onclick = () => {
    console.log(chatToggled)
    chatToggled = !chatToggled;
    if (chatToggled){
      chatWindow.style.visibility = "visible";
    }else {
      chatWindow.style.visibility = "hidden";
    }
}


function createBlinker(){
  document.createElement("")
}