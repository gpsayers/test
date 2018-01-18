function Card(id, name, suite, description, value)
{
    this.id = id;
    this.name = name;
    this.suite = suite;
    this.description = description;
    this.value = value;

}

function Coords(x, y) {
    this.x = x;
    this.y = y;
}

function Sprite(id, name, location, grid, visible) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.grid = grid;
    this.visible = visible;
}

var SpriteArray = [];

SpriteArray.push(new Sprite(1, "A", new Coords(171, 32), new Coords(1, 1), true));
SpriteArray.push(new Sprite(2, "B", new Coords(171, 392), new Coords(3, 3), true));
SpriteArray.push(new Sprite(3, "C", new Coords(475, 300), new Coords(1, 1), true));
SpriteArray.push(new Sprite(4, "1", new Coords(475, 330), new Coords(1, 1), true));
SpriteArray.push(new Sprite(5, "2", new Coords(475, 360), new Coords(1, 1), true));

//var Deck = [];

//Deck.push(new Card(1, "Ace", "Hearts", "Ace of Hearts", 1));
//Deck.push(new Card(2, "Two", "Hearts", "Two of Hearts", 2));
//Deck.push(new Card(3, "Three", "Hearts", "Three of Hearts", 3));
//Deck.push(new Card(4, "Four", "Hearts", "Four of Hearts", 4));
//Deck.push(new Card(5, "Five", "Hearts", "Five of Hearts", 5));
//Deck.push(new Card(6, "Six", "Hearts", "Six of Hearts", 6));
//Deck.push(new Card(7, "Seven", "Hearts", "Seven of Hearts", 7));
//Deck.push(new Card(8, "Eight", "Hearts", "Eight of Hearts", 8));
//Deck.push(new Card(9, "Nine", "Hearts", "Nine of Hearts", 9));
//Deck.push(new Card(10, "Ten", "Hearts", "Ten of Hearts", 10));
//Deck.push(new Card(11, "Jack", "Hearts", "Jack of Hearts", 11));
//Deck.push(new Card(12, "Queen", "Hearts", "Queen of Hearts", 12));
//Deck.push(new Card(13, "King", "Hearts", "King of Hearts", 13));
//Deck.push(new Card(14, "Ace", "Spades", "Ace of Spades", 1));
//Deck.push(new Card(15, "Two", "Spades", "Two of Spades", 2));
//Deck.push(new Card(16, "Three", "Spades", "Three of Spades", 3));
//Deck.push(new Card(17, "Four", "Spades", "Four of Spades", 4));
//Deck.push(new Card(18, "Five", "Spades", "Five of Spades", 5));
//Deck.push(new Card(19, "Six", "Spades", "Six of Spades", 6));
//Deck.push(new Card(20, "Seven", "Spades", "Seven of Spades", 7));
//Deck.push(new Card(21, "Eight", "Spades", "Eight of Spades", 8));
//Deck.push(new Card(22, "Nine", "Spades", "Nine of Spades", 9));
//Deck.push(new Card(23, "Ten", "Spades", "Ten of Spades", 10));
//Deck.push(new Card(24, "Jack", "Spades", "Jack of Spades", 11));
//Deck.push(new Card(25, "Queen", "Spades", "Queen of Spades", 12));
//Deck.push(new Card(26, "King", "Spades", "King of Spades", 13));


//function shuffle(a) {
//    var j, x, i;
//    for (i = a.length - 1; i > 0; i--) {
//        j = Math.floor(Math.random() * (i + 1));
//        x = a[i];
//        a[i] = a[j];
//        a[j] = x;
//    }
//}

//shuffle(Deck);

//var newDeck = JSON.parse(JSON.stringify(Deck));

var turn = 1;

var fps = 1000,
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

        if (turn = 0) {
            //AI takes a turn




            turn = 1;
        }


        //if (cycles % 50 === 0) {
        //    var newCard = newDeck.pop();

        //    console.log(newCard);

        //    $("#map").html(JSON.stringify(newCard));
        //}
        drawBoard();
        drawSprites();
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
//context.textAlign = "center";
canvas.width = 520;
canvas.height = 420;

var clickedItem = false;
var index;

canvas.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var x = parseInt(mousePos.x/cell);
    var y = parseInt(mousePos.y/cell);

    var clickId = checkClick(mousePos.x, mousePos.y);

    index = SpriteArray.findIndex(x => x.id == clickId);

    //SpriteArray[index].visible = false;




}, false);

canvas.addEventListener('mousemove', function (event) {
    var mousePos = getMousePos(canvas, event);

    if (clickedItem) {
        SpriteArray[index].location.x = mousePos.x - 10;
        SpriteArray[index].location.y = mousePos.y + 10;
    }

}, false);

canvas.addEventListener('mouseup', function (event) {
    var mousePos = getMousePos(canvas, event);
    var x = parseInt(mousePos.x / cell);
    var y = parseInt(mousePos.y / cell);

    if (clickedItem) {
        clickedItem = false;

        SpriteArray[index].grid.x = x;
        SpriteArray[index].grid.y = y;
        SpriteArray[index].location.x = (x * cell) + 11;
        SpriteArray[index].location.y = ((y + 1) * cell) - 8;
        console.log(mousePos.x + ", " + mousePos.y);
    }


})

function checkClick(x,y) {

    var id;

    var search = jQuery.grep(SpriteArray, function (x) {
        return x.visible == true;
    });

    jQuery.each(search, function (index, item) {

        if (x >= (item.location.x) && x <= (item.location.x + context.measureText(item.name).width)
            && y <= item.location.y && y >= (item.location.y - 22)) {
            id = item.id;
            clickedItem = true;
        }

    });
    return id;
}

function drawSprites() {

    var search = jQuery.grep(SpriteArray, function (x) {
        return x.visible == true;
    });

    jQuery.each(search, function (index, value) {

        if (value.visible == true) {

            context.font = "30px Arial";
            context.fillText(value.name, value.location.x, value.location.y);

        }
    })
}



function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);

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










