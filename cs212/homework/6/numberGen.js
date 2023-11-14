

function D6() {
    let dice = Math.ceil(6*Math.random());
    return dice;
}
//dropps lowest number and adds the rest
function dropLowAdd(number1, number2, number3, number4) {
    let total = 0;
    let numbers = [number1, number2, number3, number4];
    let tempSlot;
    for (index=0; index< numbers.length; index++) {
        for (index2=0; index2< numbers.length; index2++) {
            //swap locations if lower
            if (numbers[index2]<numbers[index]){
                tempSlot = numbers[index2];
                numbers[index2] = numbers[index];
                numbers[index] = tempSlot;
            }
            
        }
    }
    console.log(numbers);
    //add all but one of the numbers
    for (index=0; index< numbers.length-1; index++) {
        total += numbers[index];
    }
    console.log("total: " + total);
    return total;
}
document.querySelector("#stat-gen").addEventListener('click', function() {
    let dexText = document.querySelector('.dex');
    let numberInsert = dropLowAdd(D6(), D6(), D6(), D6());
    dexText.innerText = "Dexdarity: " + numberInsert;
    let strText = document.querySelector('.str');
    numberInsert = dropLowAdd(D6(), D6(), D6(), D6());
    strText.innerText = "Strength: " + numberInsert;
    let conText = document.querySelector('.con');
    numberInsert = dropLowAdd(D6(), D6(), D6(), D6());
    conText.innerText = "Constitution: " + numberInsert;
    let intText = document.querySelector('.int');
    numberInsert = dropLowAdd(D6(), D6(), D6(), D6());
    intText.innerText = "Intelegence: " + numberInsert;
    let wisText = document.querySelector('.wis');
    numberInsert = dropLowAdd(D6(), D6(), D6(), D6());
    wisText.innerText = "Wisdom: " + numberInsert;
    let chaText = document.querySelector('.cha');
    numberInsert = dropLowAdd(D6(), D6(), D6(), D6());
    chaText.innerText = "Charisma: " + numberInsert;
});

dropLowAdd(1, 2, 2, 6);
dropLowAdd(2, 1, 1, 5);
dropLowAdd(6, 6, 4, 3);