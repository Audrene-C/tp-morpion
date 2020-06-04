//create class Player
class Player {
    constructor(name, shape, nowPlaying) {
        this.name = name;
        this.shape = shape;
        this.nowPlaying = nowPlaying;
        this.turns = 0;
        this.playingTable = [];
        this.winningTable = [["box00", "box01", "box02"],
        ["box10", "box11", "box12"],
        ["box20", "box21", "box22"],
        ["box00", "box10", "box20"],
        ["box01", "box11", "box21"],
        ["box02", "box12", "box22"],
        ["box00", "box11", "box22"],
        ["box02", "box11", "box20"]];
    }

    getName() {
        return this.name;
    }
   
    getShape() {
      return this.shape;
    }

    getNowPlaying() {
        return this.nowPlaying;
    }

    setNowPlaying() {
        if(this.nowPlaying == true) {
            this.nowPlaying = false;
        } else {
            this.nowPlaying = true;
            this.speak();
        }
    }

    speak() {
        return "It's your turn "+this.getName()+" !"
    }

    getPlayingTable() {
        return this.playingTable;
    }

    fillPlayingTable(thingy) {
        this.playingTable.push(thingy);
    }

    win() {

        this.winningTable.forEach(element => {
            if(this.playingTable.sort().join(',') === element.sort().join(',')) {
                alert("Victory is yours "+this.getName()+" !");
            }
        });
    }
        
    createMessage() {
        let message = document.querySelector('#message');
        message.innerHTML = this.speak();
    }

    getTurns() {
        return this.turns;
    }

    addTurns() {
        this.turns = this.turns + 1;
        document.querySelector('#turns').innerHTML = "Turns played : " + this.turns;
    }

    createGrid() {
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div');
            row.className = "row";
            for (let j = 0; j < 3; j++) {
                let box = document.createElement('div');
                box.id = "box"+i+j;
                row.appendChild(box);
            }               
            document.querySelector('#container').appendChild(row);
        }
    }

    addListener() {
        let boxes = document.querySelectorAll('.row>div');
        boxes.forEach(box => {
            box.addEventListener('click', function play(event) {
                if(box.classList.contains('boxfull')) {
                    alert("You can't use a box already filled!");
                } else {
                    if(player1.getNowPlaying() == true) {
                        box.innerHTML = player1.getShape();
                        player1.addTurns();
                        player1.fillPlayingTable(box.id);
                        player1.win();
                        player1.setNowPlaying();
                        player2.setNowPlaying();
                        player2.createMessage();
                        box.classList.add("boxfull");
                    } else {
                        box.innerHTML = player2.getShape();
                        player2.addTurns();
                        player2.fillPlayingTable(box.id);
                        player2.win();
                        player2.setNowPlaying();
                        player1.setNowPlaying();
                        player1.createMessage();
                        box.classList.add("boxfull");
                    }
                }
                
            });
        });
    }
}

//create 2 players
const player1 = new Player("Player 1", "<i class='fas fa-times'></i>", true);
const player2 = new Player("Player 2", "<i class='fas fa-circle'></i>", false);

//create a new grid
player1.createGrid();
player1.createMessage();

//start playing
player1.addListener();