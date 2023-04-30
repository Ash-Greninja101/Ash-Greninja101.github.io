function updateTilt(card, e){
    // console.log(card);
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    var rect = card.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width; // normalized x position within the element.
    var y = (e.clientY - rect.top) / rect.height;  // normalized y position within the element.

    var yTilt = Math.round((y-0.5) * 80);
    var xTilt = Math.round((x-0.5) * 80);

    // set 3d rotation transform based on mouse pos
    card.style.transform = `rotateX(${yTilt}deg) rotateY(${xTilt}deg)`;
    // card.style.transform = `rotate3d(1,0,0,${yTilt}deg)`;
    console.log({xTilt,yTilt});

}

function resetTilt(card){
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    console.log("stopped?");
    
}