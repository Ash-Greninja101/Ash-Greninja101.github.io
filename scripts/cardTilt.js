// TODO set this by getting color of element
const originalColor = [200,200,210];

var yTilt;
var xTilt;

function updateTilt(container, e){
    // get the card element from the container to apply transform
    card = container.childNodes[1];
    // console.log(card.childNodes);
    // stop transition time from messing up look
    card.style.transition = "none";

    var rect = container.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width; // normalized x position within the card.
    var y = (e.clientY - rect.top) / rect.height;  // normalized y position within the card.

    // modified x and y to be from -1 to 1, multiplied by max tilt angle
    yTilt = ((y-0.5) * 2) * 30;
    xTilt = ((x-0.5) * 2) * 30;

    // set 3d rotation transform based on mouse pos
    card.style.transform = `rotateX(${yTilt}deg) rotateY(${-xTilt}deg)`;
    // console.log({xTilt,yTilt});
    // console.log(card.style.transform);

    updateColor(card);

}

function updateColor(card){
    // update color of card based on vertical tilt, to simulate lighting
    card.style.background = `rgb(${originalColor[0] - yTilt},${originalColor[1] - yTilt},${originalColor[2] - yTilt}`;

}

function resetTilt(container){
    card = container.childNodes[1];
    
    card.style.transition = "0.5s linear";
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';

    yTilt = 0;
    xTilt = 0;

    updateColor(card);
    // console.log("stopped?");
    
}