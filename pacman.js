// board
let board;
let context;

const rowCount = 21;
const columnCount = 19;
const tileSize = 32;
const boardWidth = columnCount * tileSize;
const boardHeight = rowCount * tileSize;

// images
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    loadImage();
    loadMap();

    update(); // ← Функція викликається!
};

const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX"
];

function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;

            if (tileMapChar == 'X') {
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall); // ← додано в walls
            } else if (tileMapChar == 'b') {
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'o') {
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'p') {
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'r') {
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            } else if (tileMapChar == 'P') {
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            } else if (tileMapChar == ' ') {
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        }
    }
}

function update() {
    draw();
    setTimeout(update, 50);
}

function draw() {
    // Очистка
    context.clearRect(0, 0, board.width, board.height);

    // Стінки
    for (let wall of walls) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    // Їжа
    for (let food of foods) {
        context.fillStyle = "white";
        context.fillRect(food.x, food.y, food.width, food.height);
    }

    // Привиди
    for (let ghost of ghosts) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    // Пакмен
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX = x;
        this.startY = y;
    }
}

function loadImage() {
    wallImage = new Image();
    wallImage.src = "./wall.png";

    blueGhostImage = new Image();
    blueGhostImage.src = "./blueGhost.png";

    orangeGhostImage = new Image();
    orangeGhostImage.src = "./orangeGhost.png";

    pinkGhostImage = new Image();
    pinkGhostImage.src = "./pinkGhost.png";

    redGhostImage = new Image();
    redGhostImage.src = "./redGhost.png";

    pacmanUpImage = new Image();
    pacmanUpImage.src = "./pacmanUp.png";

    pacmanDownImage = new Image();
    pacmanDownImage.src = "./pacmanDown.png";

    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./pacmanLeft.png";

    pacmanRightImage = new Image();
    pacmanRightImage.src = "./pacmanRight.png";
}
