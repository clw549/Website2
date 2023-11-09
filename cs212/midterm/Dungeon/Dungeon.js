let health = 10;
let attackPower = 3;

// common action buttons:
const danceButton = document.querySelector('#dance');
const investigateButton = document.querySelector('#investigate');
const attackButton = document.querySelector('#attack');
// constant to alter happen text easier
const happenText = document.querySelector('.happen')
//room variable used accross events and functions to alter rooms, always an object, and often linked to other object to navigate connected rooms.
let currentRoom;

// (what monster), (number of monsters), health, attack, maxhealth
let twoBats = ['bat', 2, 2, 1, 2];
let beast = ['beast', 1, 7, 2, 7];

let entrance, hall, smallRoom, prologue, bigRoom, treasureRoom, leaveEnd;

//rooms are defined in reverse order in order for them to refrence eachother, how navigation works

leaveEnd = {
    name: 'Leave', 
    description: 'You leave the dungeon with what you have. Although not explored fully, you are alive. The end.', 
    dance: 'You celebrate your life away with dance! hooray!',
    image: 'walk_away.png'
};

deathEnd = {
    name: 'Dead', 
    description: 'You died in the dungeon. RIP, the end.', 
    dance: 'even in death your joy cannot be ruined, your skeleton comes to life and dance battles intruders!', 
    attack: 'HAH! death will not stop you! This is your dungeon and you will show intruders what for now!', 
    investigate: "Yeah you're dead, no doubt about it...",
    image: 'skull.png'
};

winEnd = {
    name: 'Treasure Room!',
    description: 'You have found treasure! Congratulations! Finding this is just what you needed to get your adventuring career started! But wait, who are you? what are your goals and asperations? What is your name? You cannot remember. With this though, your future is clear. Aventure and find out! The end.',
    dance: 'If one thing is true for you, you love to dance!! You do not care who you were, live in the now! live your life to the fullest!', 
    attack: 'You are a fierce warrior! ready for many adventures, to find your meaning in this world.', 
    investigate: 'You are inquisitive, and quite thurough. You will become a great detective and learn your past.',
    image: 'treasure.png'
};

bigRoom = {
    name: 'Big Room', 
    description: 'You enter a large room, mostly empty smells of wet hair, moss, and damp. there is a door ahead.', 
    battle: 'In the room is a beast! It sees you! What do you do??', 
    monsters: beast, 
    attack: 'You attack the beast!',
    investigate: 'You find a seam in the wall, it seems like a door on the right side of the room.',
    forward: winEnd,
    dance: 'You dance and subdue the beast. you are safe to move on. :)',
    image: 'beast.png'
};


hall = {
    name: 'Hall', 
    description: 'the hall is barren. only lit by torches and a singular door at the other end.', 
    battle: 'In the room are '+ twoBats[1] +' bat(s) startled awake by the now lit torches', 
    monsters: twoBats, 
    attack: 'You attack a bat!', 
    forward: bigRoom,
    image: 'bat.png'
};

smallRoom = {name: 'Small Room', description: 'You enter a small room, there is a chair, and a cabinet for some sort of storage.', investigate: 'You find a small passageway behind the cabinet. (go left)', left: bigRoom, backward: entrance, image: 'cabinet.png'}; 

entrance = {name: 'Entrance', description: 'You enter the door of the dungeon. The heavy door opens and creaks as it does, the room revealed is unlit. All you can see is what the light behind you reveals, the room is dim but you can make out some crates, two doors one forward and one right, and some things in the corner.', forward: hall, backward: leaveEnd, right: smallRoom, image:'crates.png'};

prologue = {name: 'Prologue', description: 'You find yourself in a dungeon, damp and full of moss. Seems like nobody has been here in quite some time. With what little equipment you have, do you challenge the dungeon?', investigate: "You investigated, and found story.", forward: entrance, backward: leaveEnd, image: 'sword.png'};

//reassigning proporties so further rooms can reach rooms behind, for backtracking
smallRoom.backward = entrance;
bigRoom.backward = hall;
hall.backward = entrance;
bigRoom.right = smallRoom;



//helper function to reduce code complexity in click event.
function bigRoomDance(action) {
    if (currentRoom.name == bigRoom.name) {
        //if the player dances in the big room with the beast
        if (action == 'dance') {
            //set beast attack power to 0 to not attack the player
            beast[3] = 0;
            //remove restrictions to movement
            currentRoom.battle = undefined;
        }
    }
}

function deadMonsters() {
    if (currentRoom.monsters[2] < 0) {
        //set battle mode to undefined
        currentRoom.battle = undefined;
        currentRoom.attack = undefined;
        currentRoom.monsters = undefined;

        happenText.innerText = 'You killed all the monsters in this room!';
        //reset room text
        newRoom();
    } else {
        //otherwise the monster attacks back!
        health += -currentRoom.monsters[1]*currentRoom.monsters[3];
        healthUpdate();
    }
}

//helper function for health, just makes some code easier to read.
function healthUpdate() {
    //reset health text
    document.querySelector('.health').innerText = 'health: ' + health;
    //check if health below or equal to 0, if so, death end
    if (health <= 0) {
        currentRoom = deathEnd;
        newRoom();
    }
}

function newRoom() {

    let currentRoomName = document.querySelector('h1');
    currentRoomName.innerText = currentRoom['name'];
    let CurrentRoomDescription = document.querySelector('.description');
    CurrentRoomDescription.innerText = currentRoom.description;
    let RoomHappening = happenText;
    RoomHappening = "You entered a new room.";
    let roomBattle = document.querySelector('.battle-text');
    if (typeof currentRoom.battle == typeof ''){
        roomBattle.innerText = currentRoom.battle;
    } else {
        roomBattle.innerText = 'There are no monsters in the room';
    }
    let roomImage = document.querySelector('img')
    roomImage.src = currentRoom.image;
    

}

function hitMonster(monster) {
    happenText.innerText = 'You attacked ' + monster[0] + ' for ' + attackPower;
    monster[2] += -attackPower;
    //if this monster is dead,
    if (monster[2] <= 0) {
        //reduce number of monsters
        monster[1] += -1;
        //if there are more monsters
        if (monster[1] >= 1) {
            //reset health
            monster[2] = monster[4];
        }
        console.log(monster);
        console.log(twoBats);
        console.log(beast);
    }
    newRoom();

}

// options (as in what options are available) button listeners:
document.querySelector('.options').addEventListener('click', function(e){
    // e is where the event was detected (learned from video, unlcear if could be any variable name)
    console.log('You decide to ' + e.target.getAttribute('id') + '...');
    const buttonPressed = e.target;
    console.log(typeof buttonPressed.id);
    console.log(typeof(currentRoom[buttonPressed.id]));

    //if the action is not defined in the current room
    if (currentRoom[buttonPressed.id] == undefined){
        //give a general response of nothing happened
        happenText.innerText = 'nothing happened';
    } else {
        //if the action is defined, use the room's attribute to explain
        happenText.innerText = currentRoom[buttonPressed.id];
        bigRoomDance(buttonPressed.id);
        if (buttonPressed.id == 'attack') {
            hitMonster(currentRoom.monsters);
            //if mosnters are all dead (hp is 0 for all monsters)
            
        }
    }
    //kinda weirdly named function, checks for if all monsters and dead, buut also deals damage to player if some remain and the player does a different action.
    deadMonsters();

})

document.querySelector('.directions').addEventListener('click', function(e){
    const buttonPressed = e.target;
    console.log(buttonPressed.id)
    if (currentRoom.battle == undefined) {
        if (currentRoom[buttonPressed.id] != undefined) {
            currentRoom = currentRoom[buttonPressed.id];
            happenText.innerText = 'You went ' + buttonPressed.id;
        } else {
            happenText.innerText = 'Oof! You ran into a wall in your confusion.'
        }
    } else {
        happenText.innerText = 'You try to move but there is clearly danger about!';
    }
    newRoom();
})
//start the adventure with the prologue!
currentRoom = prologue;
newRoom();



