//var map = [
//    [1, 1, 1,1,2,1],
//    [1, 1, 1,1,".",1],
//    [ ".","." ,".",1,1 ,1],
//    [1, 1, 1,1,1,1]
//];

var map = [];

var gameContainer = {
    playerPosX: 2,
    playerPosY: 2,
    cycles: 0
};

var fps = 20,
    interval = 1000 / fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

function gameLoop() {

    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if (delta > interval) {

        gameContainer.cycles++;

        lastTime = currentTime - (delta % interval);

        displayMap();


    }

}

function init() {
    console.log('here');
    jQuery.get('Engine/Levels/sample.txt',
        function (data) {
            var rows = data.split("\n");



            jQuery.each(rows,
                function(index, item) {
                    map.push(item.split(","));
                });


        });

    $(document.body).on('keyup', function (e) {
        switch (e.which) {
        case 37:
                console.log('left');
            gameContainer.playerPosX--;
            break;

        case 38:
                console.log('up');
            gameContainer.playerPosY--;
            break;

        case 39:
                console.log('right');
            gameContainer.playerPosX++;
            break;

        case 40:
                console.log('down');
            gameContainer.playerPosY++;
            break;
        }
    });
}

function displayMap() {


    var mapString = "";

    jQuery.each(map,
        function (indexY, row) {

            jQuery.each(row,
                function (indexX, col) {

                    if (indexX == gameContainer.playerPosX && indexY == gameContainer.playerPosY) {
                        mapString += "@";
                    } else {
                        mapString += col;
                    }

                });
            mapString += '<br/>';
        });



    $("#map").html(mapString);
}

init();

gameLoop();

//displayMap();