//create class Player
class Player {
    constructor(name, shape, nowPlaying) {
        this.name = name;
        this.shape = shape;
        this.nowPlaying = nowPlaying;
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
}

//create a new object Grid on load
function Grid() {
    document.body.onload = createGrid;

    function createGrid() {
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div');
            row.className = "row";
            for (let j = 0; j < 3; j++) {
                let box = document.createElement('div');
                box.className = "box";
                row.appendChild(box);
            }                
            document.querySelector('#container').appendChild(row);
        }//create 2 players
        const player1 = new Player("Player 1", "<i class='fas fa-times'></i>", true);
        const player2 = new Player("Player 2", "<i class='fas fa-circle'></i>", false);
        //create a message container
        let message = document.querySelector('#message');
        message.innerHTML = player1.speak();
        //add event listener 
        boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.addEventListener('click', function play(event) {
                console.log(event.target.innerHTML);
                if(event.target.innerHTML === "") {
                    if(player1.getNowPlaying() == true) {
                        event.target.innerHTML = player1.getShape();
                        player1.setNowPlaying();
                        player2.setNowPlaying();
                        message.innerHTML = player2.speak();
                    } else {
                        event.target.innerHTML = player2.getShape();
                        player2.setNowPlaying();
                        player1.setNowPlaying();
                        message.innerHTML = player1.speak();
                    }
                } else {
                    alert("You can't use a box already filled!"); 
                }
                
            });
        });
    }
}

const myGrid = new Grid();