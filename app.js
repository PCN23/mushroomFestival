// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';


const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

//console.log();

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newFriend = {
        name: friendInputEl.value,
        satisfaction: 1,
    };
    // get the name from the input
    // create a new friend object
    friendData.push(newFriend);
    // push it into the friends state array, passed in as an argument
    // reset the input
    friendInputEl.value = '';
    // display all the friends (use a function here)
    displayFriends();
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        const friendEl = renderFriend(friend);
        friendsEl.appendChild(friendEl);

        friendEl.addEventListener('click', () => {
            if (mushroomCount === 0){
                alert('no more mushrooms left.');
            } else if (mushroomCount > 0 && friend.satisfaction < 3){
                friend.satisfaction++;
                mushroomCount--;

                displayMushrooms();
                displayFriends();
            }
        });
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}


function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroomEl = renderMushroom();
        mushroomsEl.append(mushroomEl);
    }
}

displayFriends();
displayMushrooms();
