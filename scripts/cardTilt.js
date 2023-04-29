function updateTilt(card, e){
    console.log(card);
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log("Left? : " + x + " ; Top? : " + y + ".");
}

window.onload = () => {
    console.log("weoijfweoifjd");
};