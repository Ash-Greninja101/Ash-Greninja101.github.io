let n = document.getElementById("inputName");
let email = document.getElementById("inputEmail");
let question = document.getElementById("inputQuestion");
let warner = document.getElementById("form-incomplete");
let form = document.getElementById("qForm");
let submitter = document.getElementById("inquiry-submitter");
const successModal = new bootstrap.Modal("#submission_success");
const otherModal = new bootstrap.Modal("#others-modal");
// let url = "/Users/pandeys01/Developer/webmaster-22-23 Project/server.js";
// let connection = new WebSocket(url);

function isEmpty(str){
    return str.trim()==="";
};

submitter.onclick =  () => {
    if (isEmpty(n.value) || isEmpty(email.value) || isEmpty(question.value)){
        warner.style.display = 'block';
    } else {
        warner.style.display = 'none';
        // alert("form submitted successfully");
        // connection.send(JSON.stringify({
        //     msgType: "signIn",
        //     personName: n.value,
        //     emailAddress: email.value,
        //     personQuestion: question.value
        // }))
        n.value = "";
        email.value = "";
        question.value = "";
        otherModal.hide();
        successModal.show();
    }
}
// connection.onopen = () => {
//     // document.getElementById("statuss").style.display = "none";
//     // document.getElementById("tBody").disabled = false;
//     console.log("connected to the websocket server");
//     connection.onmessage = e => {
//       e = JSON.parse(e.data);
//       if (e.msgType === "Warning"){
//         alert(e.msg);
//       }
//       else if (e.msgType === "goTo"){
//         window.location.href = window.location.href+e.msg
//       }
//     }
// }