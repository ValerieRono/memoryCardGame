const cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
const cardsToHide = document.querySelectorAll(".open");


//STARS


//STOPWATCH
var seconds = document.getElementById("sec");
var minutes = document.getElementById("min");
var hours = document.getElementById("hour");

var s = 0;
var m = 0;
var h = 0;

//function to time the player
function stopWatch(){
    s++;
    if(s>=60){
        s=0;
        m++;
        if(m>=60){
            m=0;
            h++;
        }
    }
    
    seconds.textContent = s? (s > 9 ? s : "0" + s) : "00";
    minutes.textContent = m? (m > 9 ? m : "0" + m) : "00";
    hours.textContent = h? (h > 9 ? h : "0" + h) : "00";

    timer();
}

// delay stopWacth function by 1 second
function timer(){
    t = setTimeout(stopWatch, 1000);
}

// start timer when the player clicks on the deck of cards, do this only once
function startTimer(){
    deck.addEventListener("click", timer, {once : true})
}

// stop timer
function stopTimer(){
    clearTimeout(t);
}

//reset stopWatch
function resetStopWatch(){
    seconds.textContent = "00";
    minutes.textContent = "00";
    hours.textContent = "00";
    s = 0;
    m = 0; 
    h = 0;
}

//MOVES AND STAR RATING
const moveCounter = document.getElementById("moves");
const stars = document.getElementsByClassName("fa-star");

counter=0;

//increment the move counter and display it on the page
function count(){
    counter++;
    moveCounter.textContent=counter;
    //determine stars awarded
    if(counter>20 && counter<=30){
        stars[2].classList.remove("checked");
    } else if(counter>30){
        stars[1].classList.remove("checked");   
    }
}

//reset moves made when restart icon is clicked
function resetCount(){
    counter = 0;
    moveCounter.textContent=counter;
}

//RESTART/REFRESH GAME

const restart = document.querySelector(".fa-repeat");
var cardsArray = Array.prototype.slice.call( cards );

//add event listener to the restart icon
restart.addEventListener('click', refresh, false);

function refresh(){
    shuffle(cardsArray);
    drawCards(cardsArray);
    resetDeck();
    stopTimer();
    resetStopWatch();
    resetCount();
    startTimer();
    resetStarRating();
    onClick();
    
}

//shuffle method provided
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//delete all cards from the deck so as to add shuffled cards
function emptyDeck(){
    while(deck.firstChild){
        deck.removeChild(deck.firstChild);
    }
}

//add shuffled cards to deck
function drawCards(a){
    emptyDeck();
    for(i=0; i<a.length; i++){
        deck.appendChild(a[i]);
    }
}

//hide all card symbols so as to reset deck
function resetDeck(){
    for(i=0; i<cards.length; i++){
        cards[i].classList.remove("open", "match", "show");
    }
}

//reset star rating
function resetStarRating(){
    for(i=0; i<stars.length; i++){
        stars[i].classList.add("checked");
    }
}

//GAME

//Create a list that holds all "open" cards
const openCards = document.createElement("ul");
document.body.appendChild(openCards);
openCards.classList.add("new");

//main function used to add event listener to each card 
function onClick(){
    for(var i=0; i<cards.length; i++){
        cards[i].addEventListener("click", playTime, false);
    }
}

//function called when user clicks on a card, contains several other functions
function playTime(event){
    if(this.classList.contains("open")){
        console.log("do nothing")
    } else {
        show(this);
        addOpenCards(this);
        setTimeout(check, 500);
    }
    count();
}

//display the card's symbol
function show(b){
    b.classList.add("open", "show");
}

//add the card to a *list* of "open" cards
function addOpenCards(add){
    var clone = add.cloneNode(true);
    openCards.appendChild(clone);
}

//if the list already has another card, check to see if the two cards match
function check(){
    if(openCards.childNodes.length>1){
        const checkCards = openCards.getElementsByTagName("li");
        if(checkCards[0].isEqualNode(checkCards[1])){
            matched();
            removeChildren();
        } else {
            removeChildren();
            hide();
        }
    }
    if(document.getElementsByClassName("match").length === 16){
        stopTimer();
        finishGame();
    }
}

const replace = document.getElementsByClassName("show");

//if the cards do match, lock the cards in the open position
function matched(){
    for(j=0; j<replace.length; j++){
        replace[j].classList.replace("open", "match");
        replace[j].removeEventListener("click", playTime, false);
    }
}

//remove the cards from the "open" list
function removeChildren(){
    while (openCards.firstChild) {
        openCards.removeChild(openCards.firstChild);
    }
}

//if the cards do not match hide the card's symbol
function hide(){
    const cardsToHide = document.querySelectorAll(".open");
    cardsToHide.forEach(function(a, b, c){
        a.classList.remove("show");
        a.classList.remove("open");
    })
}

//if all cards have matched, display a message with the final score
function finishGame(){
    const deck = document.getElementsByClassName("match");
    if(deck.length == 16){

        const starsGot = document.getElementsByClassName("checked");
        if(starsGot.length === 3){
            var sthstars = 3;
        } else if(starsGot.length === 2){
            var sthstars = 2;
        } else if(starsGot.length === 1){
            var sthstars = 1;
        }


        var sthmoves = moveCounter.textContent;

        var sthtime = hours.textContent + " hours " + minutes.textContent + " minutes " + seconds.textContent + " seconds. ";
            if(confirm("congratulations on finishing the game! you finished the game with " + sthstars + " star(s) and " + sthmoves + " moves in " + sthtime + "Would you like to play again?")){
                shuffle(cardsArray);
                drawCards(cardsArray);
                resetDeck();
                stopTimer();
                resetStopWatch();
                resetCount();
                startTimer();
                resetStarRating();
                onClick();
            } 
    }
}

onClick();
startTimer();



