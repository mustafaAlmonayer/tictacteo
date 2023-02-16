//dom elements
let xScore = document.querySelector('#p1Score');
let oScore = document.querySelector('#p2Score');
let cells = document.querySelectorAll('.cell');
let turnInfo = document.querySelector('#turn');
let resetButton = document.querySelector('#reset');

//to know which turn for any player
let turn = 'x';

//to know how many turns played in the round
let turnsPlayed = 0;

//to alter turn
function alterTurn() {
	let char;
	if (turn == 'x') {
		char = 'o';
	} else {
		char = 'x';
	}
	turn = char;
	turnInfo.innerText = `${char.toUpperCase()}'s Turn`;
	turnInfo.classList = char;
}

//to reset the round and the game
function resetRound() {
	turn = 'x';
	turnInfo.innerHTML = "X's Turn";
	turnInfo.classList = 'x';
	playerX.takenCells = new Array(9);
	playerO.takenCells = new Array(9);
	turnsPlayed = 0;
	for (const cell of cells) {
		cell.innerText = '';
		cell.classList.remove('x');
		cell.classList.remove('o');
	}
}

//to check winner
function checkWinner(player) {
	let winCombs = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];

	let cellCounter = 0;

	for (let i = 0; i < winCombs.length; i++) {
		for (let j = 0; j < winCombs[i].length; j++) {
			if (player.takenCells[winCombs[i][j]]) {
				cellCounter++;
			} else {
				continue;
			}
		}

		if (cellCounter == 3) {
			player.score++;
			player.scoreElement.innerText = parseInt(player.scoreElement.innerText) + 1;
			cellCounter = 0;
			resetRound();
			break;
		}

		cellCounter = 0;
	}

	if (turnsPlayed == 9) {
		resetRound();
	}
}

class Player {
	name;
	char;
	takenCells;
	score;
	scoreElement;

	constructor(name, char, scoreElement) {
		this.name = name;
		this.char = char;
		this.scoreElement = scoreElement;
		this.score = 0;
		this.takenCells = new Array(9);
	}

	submitMove(cell) {
		if (cell.innerText) {
			return '';
		}

		turnsPlayed++;

		cell.innerText = this.char;
		cell.classList.add(this.char);

		this.takenCells[parseInt(cell.id)] = true;

		alterTurn();

		checkWinner(this);
	}
}

//the players obj
let playerX = new Player('p1', 'x', xScore);
let playerO = new Player('p2', 'o', oScore);

//reset game button fun
resetButton.addEventListener('click', () => {
	resetRound();
	playerX.score = 0;
	playerO.score = 0;
	xScore.innerText = 0;
	oScore.innerText = 0;
});

for (const cell of cells) {
	cell.addEventListener('click', () => {
		cell.style.backgroundColor = '';
		if (turn == 'x') {
			playerX.submitMove(cell);
		} else {
			playerO.submitMove(cell);
		}
	});
}

for (const cell of cells) {
	cell.addEventListener('mouseenter', () => {
		if (cell.classList.contains('x') || cell.classList.contains('o')) {
			return '';
		}
		if (turn == 'x') {
			cell.style.backgroundColor = 'rgb(28, 28, 221)';
		} else {
			cell.style.backgroundColor = 'rgb(226, 58, 58)';
		}
	});
}

for (const cell of cells) {
	cell.addEventListener('mouseleave', () => {
		if (cell.classList.contains('x') || cell.classList.contains('o')) {
			return '';
		}
		cell.style.backgroundColor = '';
	});
}
