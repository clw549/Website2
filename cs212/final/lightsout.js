var clicks = 0;
document.querySelector(".bigbox").addEventListener("click", function (e) {
    const buttonPressed = e.target;
    const buttonx = buttonPressed.id % 10;
    const buttony = Math.floor(buttonPressed.id / 10);
    console.log(buttonPressed);
    toggleLight(buttonPressed);
    updateNearby(buttonPressed);
    checkLights();
    clicks +=1;
    document.querySelector(".click-counter").innerText = 'clicks: '+clicks;
})

function updateNearby(originalButton) {
    const buttonx = originalButton.id % 10;
    const buttony = Math.floor(originalButton.id / 10);
    const oneup = 10*(buttony+1)+buttonx;
    const onedown = 10*(buttony-1)+buttonx;
    const oneleft = 10*buttony + (buttonx-1);
    const oneright = 10*buttony + (buttonx+1);
    
    console.log(""+(buttonx+ (10*buttony)));
    console.log(oneup)
    if (document.querySelector(".l"+oneup)!=null){
        toggleLight(document.querySelector(".l"+oneup));
    }
    if (document.querySelector(".l"+onedown)!=null){
        toggleLight(document.querySelector(".l"+onedown));
    }
    if (document.querySelector(".l"+oneleft)!=null){
        toggleLight(document.querySelector(".l"+oneleft));
    }
    if (document.querySelector(".l"+oneright)!=null){
        toggleLight(document.querySelector(".l"+oneright));
    }

}

function toggleLight(light) {
    console.log(light);
    if (light.style.backgroundColor == "white") {
        light.style.backgroundColor = "grey";
    } else {
        light.style.backgroundColor = "white";
    }
}

function checkLights() {
    let lightsOut = true;
    let box, boxId;
    const bigbox = document.querySelector(".bigbox");
    for (yindex=1; yindex<6; yindex++) {
        for (xindex=1; xindex<6; xindex++){
            boxId = yindex*10 + xindex
            box = document.querySelector(".l"+boxId);
            console.log(box.style.backgroundColor);
            if (box.style.backgroundColor == "white") {
                lightsOut = false;
            }
        }
    }
    console.log(lightsOut);
    if (lightsOut){
        window.alert("You won");
    }
}

function randomClicks() {
    const numClicks = Math.floor(Math.random()+1*15)
    for (click=0; click < numClicks; click++) {
        clickx = Math.floor(Math.random()*4+1);
        clicky = Math.floor(Math.random()*4+1)*10;
        buttonPressed = document.querySelector(".l"+(clicky+clickx));

        toggleLight(buttonPressed);
        updateNearby(buttonPressed);
    }
}
randomClicks()