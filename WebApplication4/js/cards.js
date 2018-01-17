function Card(id, name, suite, description, value)
{
    this.id = id;
    this.name = name;
    this.suite = suite;
    this.description = description;
    this.value = value;

}

var Deck = [];

Deck.push(new Card(1, "Ace", "Hearts", "Ace of Hearts", 1));
Deck.push(new Card(2, "Two", "Hearts", "Two of Hearts", 2));
Deck.push(new Card(3, "Three", "Hearts", "Three of Hearts", 3));
Deck.push(new Card(4, "Four", "Hearts", "Four of Hearts", 4));
Deck.push(new Card(5, "Five", "Hearts", "Five of Hearts", 5));
Deck.push(new Card(6, "Six", "Hearts", "Six of Hearts", 6));
Deck.push(new Card(7, "Seven", "Hearts", "Seven of Hearts", 7));
Deck.push(new Card(8, "Eight", "Hearts", "Eight of Hearts", 8));
Deck.push(new Card(9, "Nine", "Hearts", "Nine of Hearts", 9));
Deck.push(new Card(10, "Ten", "Hearts", "Ten of Hearts", 10));
Deck.push(new Card(11, "Jack", "Hearts", "Jack of Hearts", 11));
Deck.push(new Card(12, "Queen", "Hearts", "Queen of Hearts", 12));
Deck.push(new Card(13, "King", "Hearts", "King of Hearts", 13));
Deck.push(new Card(14, "Ace", "Spades", "Ace of Spades", 1));
Deck.push(new Card(15, "Two", "Spades", "Two of Spades", 2));
Deck.push(new Card(16, "Three", "Spades", "Three of Spades", 3));
Deck.push(new Card(17, "Four", "Spades", "Four of Spades", 4));
Deck.push(new Card(18, "Five", "Spades", "Five of Spades", 5));
Deck.push(new Card(19, "Six", "Spades", "Six of Spades", 6));
Deck.push(new Card(20, "Seven", "Spades", "Seven of Spades", 7));
Deck.push(new Card(21, "Eight", "Spades", "Eight of Spades", 8));
Deck.push(new Card(22, "Nine", "Spades", "Nine of Spades", 9));
Deck.push(new Card(23, "Ten", "Spades", "Ten of Spades", 10));
Deck.push(new Card(24, "Jack", "Spades", "Jack of Spades", 11));
Deck.push(new Card(25, "Queen", "Spades", "Queen of Spades", 12));
Deck.push(new Card(26, "King", "Spades", "King of Spades", 13));


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}


function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}


shuffle(Deck);

var newDeck = JSON.parse(JSON.stringify(Deck));

console.log(JSON.stringify(newDeck));


var fps = 20,
    interval = 1000 / fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0,
    cycles = 0;

function gameLoop() {

    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if (delta > interval) {

        cycles++;

        lastTime = currentTime - (delta % interval);


        //if (cycles % 50 === 0) {
        //    var newCard = newDeck.pop();

        //    console.log(newCard);

        //    $("#map").html(JSON.stringify(newCard));
        //}


    }

}



gameLoop();

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


// Box width
var bw = 400;
// Box height
var bh = 400;
// Padding
var p = 0;
var cell = 40;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.addEventListener('mouseup', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

    var x = parseInt(mousePos.x/cell);
    var y = parseInt(mousePos.y/cell);
    console.log(x + ", " + y);
    console.log(message);
}, false);

function drawBoard() {
    for (var x = 0; x <= bw; x += cell) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += cell) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
}

drawBoard();








