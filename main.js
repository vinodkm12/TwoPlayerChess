const BOARD_SIZE = 480
function filterOnBoard(coord) {
	let i = coord[0]
	let j = coord[1]
	return ((0 <= i && i <= 7) && (0 <= j && j <= 7));
}

function isDef(x) {
	return !(x === undefined || x === null)
}

function includes(a, listA) {
	for (let i = 0; i < listA.length; i++) {
		if (listA[i][0] === a[0] && listA[i][1] === a[1])
			return true;
	}
	return false;
}

class GameBoard {
	constructor () {
		this.squares = Array.from(Array(8), () => new Array(8));
		for (let i = 0; i <= 7; i++) {
			for (let j = 0; j <= 7; j++) {
				this.squares[i][j] = null
			}
		}

		this.whiteKingHasMoved= false
		this.blackKingHasMoved = false
		this.whiteRook0HasMoved = false
		this.blackRook0HasMoved = false
		this.whiteRook1HasMoved = false
		this.blackRook1HasMoved = false
		
	}

	add(myPiece, i, j) {
		this.squares[i][j] = myPiece
	}
	remove(myPiece, i, j) {
		this.squares[i][j] = null
	}

	setup() {
	for (let i = 0; i <= 7; i++) {
		for (let j = 0; j <= 7; j++) {
			if ((i + j) % 2 == 0)
				context.fillStyle = "#9A7B4F"
			else
				context.fillStyle = "#481F01"
			context.fillRect(i*(BOARD_SIZE/8), j*(BOARD_SIZE/8), (BOARD_SIZE/8), (BOARD_SIZE/8))
			
			if (i == 1 && j == 7) {
				this.squares[i][j] = new Knight("knightWhite0", i, j, "White")
				this.squares[i][j].draw()
			}
			else if (i == 6 && j == 7) {
				this.squares[i][j] = new Knight("knightWhite1", i, j, "White")
				this.squares[i][j].draw()
			}
			else if (i == 1 && j == 0) {
				this.squares[i][j] = new Knight("knightBlack0", i, j, "Black")
				this.squares[i][j].draw()
			}
			else if (i == 6 && j == 0) {
				this.squares[i][j] = new Knight("knightBlack1", i, j, "Black")
				this.squares[i][j].draw()
			}
			else if (i == 4 && j == 0) {
				this.squares[i][j] = new King("kingBlack", i, j, "Black")
				this.squares[i][j].draw()		
			}
			else if (i == 4 && j == 7) {
				this.squares[i][j] = new King("kingWhite", i, j, "White")
				this.squares[i][j].draw()		
			}	
			else if (i == 2 && j == 0) {
				this.squares[i][j] = new Bishop("bishopBlack0", i, j, "Black")
				this.squares[i][j].draw()			
			}
			else if (i == 5 && j == 0) {
				this.squares[i][j] = new Bishop("bishopBlack1", i, j, "Black")
				this.squares[i][j].draw()			
			}	
			else if (i == 2 && j == 7) {
				this.squares[i][j] = new Bishop("bishopWhite0", i, j, "White")
				this.squares[i][j].draw()		
			}
			else if (i == 5 && j == 7) {
				this.squares[i][j] = new Bishop("bishopWhite1", i, j, "White")
				this.squares[i][j].draw()			
			}			
			else if (i == 0 && j == 0) {
				this.squares[i][j] = new Rook("rookBlack0", i, j, "Black")
				this.squares[i][j].draw()			
			}
			else if (i == 7 && j == 0) {
				this.squares[i][j] = new Rook("rookBlack1", i, j, "Black")
				this.squares[i][j].draw()		
			}	
			else if (i == 0 && j == 7) {
				this.squares[i][j] = new Rook("rookWhite0", i, j, "White")
				this.squares[i][j].draw()			
			}
			else if (i == 7 && j == 7) {
				this.squares[i][j] = new Rook("rookWhite1", i, j, "White")
				this.squares[i][j].draw()		
			}
			else if (i == 3 && j == 0) {
				this.squares[i][j] = new Queen("queenBlack", i, j, "Black")
				this.squares[i][j].draw()		
			}	
			else if (i == 3 && j == 7) {
				this.squares[i][j] = new Queen("queenWhite", i, j, "White")
				this.squares[i][j].draw()	
			}
			
			else if (j == 1) {
				this.squares[i][j] = new Pawn("pawnBlack" + i, i, j, "Black")
				this.squares[i][j].draw()	
			}
			else if (j == 6) {
				this.squares[i][j] = new Pawn("pawnWhite" + i, i, j, "White")
				this.squares[i][j].draw() 
			}
		}
	}
	}

	move(initX, initY, newX, newY) {
		var ans = null

		//Set all the justmovedTwos to false
		for (let i = 0; i <= 7; i++) {
			for (let j = 0; j <= 7; j++)	{
				if (isDef(this.squares[i][j]) && this.squares[i][j].color === this.squares[initX][initY].color)
					this.squares[i][j].justMovedTwo = false
			}
		}
		//Deal with en pesent
		if (this.squares[initX][initY].name.substring(0,5) === "pawnB") {
			if (initY == 1 && newY == 3)
				this.squares[initX][initY].justMovedTwo = true

		}
		else if (this.squares[initX][initY].name.substring(0,5) === "pawnW"){
			if (initY == 6 && newY == 4)
				this.squares[initX][initY].justMovedTwo = true
		}
		if ((this.squares[initX][initY].name.substring(0,4) === "pawn") && (initX != newX) && !isDef(this.squares[newX][newY])) {
			//It is en pessant
			this.squares[newX][initY] = null
			ans = ["Ep", newX, initY]
		}


		if (this.squares[initX][initY].name === "kingBlack")
			this.blackKingHasMoved = true;
		else if (this.squares[initX][initY].name === "kingWhite")
			this.whiteKingHasMoved = true;

		else if (this.squares[initX][initY].name === "rookBlack0")
			this.blackRook0HasMoved = true;

		else if (this.squares[initX][initY].name === "rookBlack1")
			this.blackRook1HasMoved = true;

		else if (this.squares[initX][initY].name === "rookWhite0")
			this.whiteRook0HasMoved = true;

		else if (this.squares[initX][initY].name === "rookWhite1")
			this.whiteRook1HasMoved = true;

		if (this.squares[initX][initY].name.substring(0, 5) === "pawnB" && newY == 7) {
			this.squares[newX][newY] = new Queen(this.squares[initX][initY].name, newX, newY, "Black")
		}
		else if (this.squares[initX][initY].name.substring(0, 5) === "pawnW" && newY == 0) {
			this.squares[newX][newY] = new Queen(this.squares[initX][initY].name, newX, newY, "White")
		}
		else {
			this.squares[newX][newY] = this.squares[initX][initY].copyPiece(newX, newY)
		}



		if (this.squares[initX][initY].name.substring(0,4) === "king" && Math.abs(initX - newX) >= 2) {
			//It's a castle
	
			if (newX == 2 && newY == 0) {
				this.squares[3][0] = new Rook("rookBlack0", 3, 0, "Black")
				this.squares[3][0].draw()
				this.squares[0][0] = null
				ans = ["Castle", 0, 0, 3, 0]
			}

			else if (newX == 6 && newY == 0) {
				this.squares[5][0] = new Rook("rookBlack1", 5, 0, "Black")
				this.squares[5][0].draw()
				this.squares[7][0] = null
				ans = ["Castle", 7, 0, 5, 0]
			}

			else if (newX == 2 && newY == 7) {
				this.squares[3][7] = new Rook("rookWhite0", 3, 7, "White")
				this.squares[3][7].draw()
				this.squares[0][7] = null
				ans = ["Castle", 0, 7, 3, 7]
			}

			else if (newX == 6 && newY == 7) {
				this.squares[5][7] = new Rook("rookWhite1", 5, 7, "White")
				this.squares[5][7].draw()
				this.squares[7][7] = null
				ans = ["Castle", 7, 7, 5, 7]
			}
		}



		this.squares[newX][newY].draw()
		this.squares[initX][initY] = null
		return ans
	}

	//Returns a list of all the squares of the color variable that are checking the opposite color king
	//Note that the first coordinate in this list is always the king square of the opposite color
	lookForChecks(color) {
		let ans = []
		var kingSquare = []
		if (color === "White") {
			//Find the king
			for (let j = 0; j <= 7; j++) {
				for (let i = 0; i <= 7; i++) {
					if (isDef(this.squares[i][j]) && this.squares[i][j].name === "kingBlack") {
						kingSquare = [i, j]
						i = 8; 
						j = 8;
					}
				}
			}
			ans.push(kingSquare)

			//Go through all squares looking for white pieces and checks on them
			for (let i = 0; i <= 7; i++) {
				for (let j = 0; j <= 7; j++) {
					if (isDef(this.squares[i][j]) && this.squares[i][j].color === "White") {
						if (includes(kingSquare, this.squares[i][j].getMoves(this)))
							ans.push([i, j]);
					}
				}
			}
		}
		else if (color === "Black") {
			//Find the king
			for (let j = 0; j <= 7; j++) {
				for (let i = 7; i >= 0; i--) {
					if (isDef(this.squares[i][j]) && this.squares[i][j].name === "kingWhite") {
						kingSquare = [i, j]
						i = -1; 
						j = 8;
					}
				}
			}
			ans.push(kingSquare)

			//Go through all squares looking for black pieces and checks on them
			for (let i = 0; i <= 7; i++) {
				for (let j = 0; j <= 7; j++) {
					if (isDef(this.squares[i][j]) && this.squares[i][j].color === "Black") {
						if (includes(kingSquare, this.squares[i][j].getMoves(this)))
							ans.push([i, j]);
					}
				}
			}
		}
		return ans
	}

	//check if color variable's move leads to check
	moveUnderCheck(color, initX, initY, newX, newY) {
		var ans = true
		let temp1 = this.squares[initX][initY]
		let temp2 = this.squares[newX][newY]

		this.squares[newX][newY] = temp1
		this.squares[initX][initY] = null

		var opcolor;
		if (color === "White")
			opcolor = "Black"
		else
			opcolor = "White"

		if (this.lookForChecks(opcolor).length == 1)
			ans = false
		else
			ans = true
		
		this.squares[initX][initY] = temp1
		this.squares[newX][newY] = temp2
		return ans
	}

	endingConditions(whitesTurn) {
		var flag = true;
		var mmoves;
		for (let i = 0; i <= 7; i++) {
			for (let j = 0; j <= 7; j++) {
				if (isDef(this.squares[i][j]) && this.squares[i][j].color === "Black") {
					mmoves = this.squares[i][j].getMoves(this)
					for (let cnt = 0; cnt < mmoves.length; cnt++) {
						if (!this.moveUnderCheck("Black", i, j, mmoves[cnt][0], mmoves[cnt][1])) {
							flag = false;
							i = 8;
							j = 8;
							break;
						}
					}
				}
			}
		}
		if (flag) {
			if ( this.lookForChecks("White").length > 1) {
				document.getElementById("winner_bar").innerHTML = "White wins!"
				let border = document.querySelector("canvas")
				border.style["border-color"] = "Red"
				return true
			}
			else if (whitesTurn){
				document.getElementById("winner_bar").innerHTML = "It's a draw!"
				let border = document.querySelector("canvas")
				border.style["border-color"] = "White"
				return true
			}
		}

		flag = true
		for (let i = 0; i <= 7; i++) {
			for (let j = 0; j <= 7; j++) {
				if (isDef(this.squares[i][j]) && this.squares[i][j].color === "White") {
					mmoves = this.squares[i][j].getMoves(this)
					for (let cnt = 0; cnt < mmoves.length; cnt++) {
						if (!this.moveUnderCheck("White", i, j, mmoves[cnt][0], mmoves[cnt][1])) {
							flag = false;
							i = 8;
							j = 8;
							break;
						}
					}
				}
			}
		}
		if (flag) {
			if (this.lookForChecks("Black").length > 1) {
				document.getElementById("winner_bar").innerHTML = "Black wins!"
				let border = document.querySelector("canvas")
				border.style["border-color"] = "Red"
				return true
			}
			else if (!whitesTurn){
				document.getElementById("winner_bar").innerHTML = "It's a draw!"
				let border = document.querySelector("canvas")
				border.style["border-color"] = "White"
				return true
			}
		}
		return false
	}
}

class Piece {
	constructor(name, xPos, yPos, color) {
		this.name = name
		this.xPos = xPos
		this.yPos = yPos
		this.color = color
		this.image = new Image(); 
		this.justMovedTwo = false
	}
	copyPiece(newX, newY) {
		var ans = new this.constructor(this.name, newX, newY, this.color);
		ans.justMovedTwo = this.justMovedTwo;
		return ans;
	}
}

class Pawn extends Piece {
	constructor(name, xPos, yPos, color) {
		super(name, xPos, yPos, color)
	}
	draw() {
		//this.image = new Image();
		if (this.color === "Black") {
			this.image.src = "pawnBlack.png"
		}
		else {
			this.image.src = "pawnWhite.png"
		}
	}
	getMoves (board) {
		let ans = []
		if (this.color === "Black") {
			
			//Push one square down
			if (!isDef(board.squares[this.xPos][this.yPos + 1])) {
				ans.push([this.xPos, this.yPos + 1])
				if (!isDef(board.squares[this.xPos][this.yPos + 2]) && this.yPos == 1)
					ans.push([this.xPos, this.yPos + 2])
			}
			//Take to the left
			if (this.xPos > 0) {
				//Take regular
				if (isDef(board.squares[this.xPos - 1][this.yPos + 1]) && board.squares[this.xPos - 1][this.yPos + 1].color === "White") {
					ans.push([this.xPos - 1, this.yPos + 1]);
				}
				//Take en pessant
				if (isDef(board.squares[this.xPos - 1][this.yPos]) && board.squares[this.xPos - 1][this.yPos].color === "White") {
					if (board.squares[this.xPos - 1][this.yPos].justMovedTwo)
						ans.push([this.xPos - 1, this.yPos + 1]);
				}
			}

			if (this.xPos < 7) {
				//Take to the right
				if (isDef(board.squares[this.xPos + 1][this.yPos + 1]) && board.squares[this.xPos + 1][this.yPos + 1].color === "White") {
					ans.push([this.xPos + 1, this.yPos + 1]);
				}
				//Take en pessant
				if (isDef(board.squares[this.xPos + 1][this.yPos]) && board.squares[this.xPos + 1][this.yPos].color === "White") {
					if (board.squares[this.xPos + 1][this.yPos].justMovedTwo)
						ans.push([this.xPos + 1, this.yPos + 1]);
				}
			}


		}
		else if (this.color === "White") {
			//Push one square up
			if (!isDef(board.squares[this.xPos][this.yPos - 1])) {
				ans.push([this.xPos, this.yPos - 1])
				if (!isDef(board.squares[this.xPos][this.yPos - 2]) && this.yPos === 6)
					ans.push([this.xPos, this.yPos - 2])
			}
			//Take to the left
			if (this.xPos > 0) {
				if (isDef(board.squares[this.xPos - 1][this.yPos - 1]) && board.squares[this.xPos - 1][this.yPos - 1].color === "Black") {
					ans.push([this.xPos - 1, this.yPos - 1]);
				}
				if (isDef(board.squares[this.xPos - 1][this.yPos]) && board.squares[this.xPos - 1][this.yPos].color === "Black") {
					if (board.squares[this.xPos - 1][this.yPos].justMovedTwo)
						ans.push([this.xPos - 1, this.yPos - 1]);
				}
			}

			if (this.xPos < 7) {
				//Take to the right
				if (isDef(board.squares[this.xPos + 1][this.yPos - 1]) && board.squares[this.xPos + 1][this.yPos - 1].color === "Black") {
					ans.push([this.xPos + 1, this.yPos - 1]);
				}
				if (isDef(board.squares[this.xPos + 1][this.yPos]) && board.squares[this.xPos + 1][this.yPos].color === "Black") { 
					if (board.squares[this.xPos + 1][this.yPos].justMovedTwo)
						ans.push([this.xPos + 1, this.yPos - 1]);
				}
			}
		}
		ans = ans.filter(filterOnBoard)
		return ans
	}
}


class Knight extends Piece {
	constructor(name, xPos, yPos, color) {
		super(name, xPos, yPos, color)
	}
	getMoves (board) {
		let ans = []
		let increments = [[1,2], [2,1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]
		for (let index = 0; index < increments.length; index++) {
			let newX = this.xPos + increments[index][0]
			let newY = this.yPos + increments[index][1]
			if (filterOnBoard([newX, newY]))
			if (!isDef(board.squares[newX][newY]) || board.squares[newX][newY].color !== this.color)
				ans.push([newX , newY])
		}
		return ans
	}
	draw(context) {
		if (this.color === "Black") {
			this.image.src = "knightBlack.png"
		}
		else {
			this.image.src = "knightWhite.png"
		}
	}
}
class Bishop extends Piece {
	constructor(name, xPos, yPos, color) {
		super(name, xPos, yPos, color)
	}
	getMoves (board) {
		let ans = []
		//Quadrant 1 diagonal
		for (let i = 1; (i + this.xPos) <= 7 && (i + this.yPos) <= 7; i++) { 
			let newX = i + this.xPos
			let newY = i + this.yPos
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		//Quadrant 2 diagonal
		for (let i = 1; (this.xPos - i) >= 0 && (i + this.yPos) <= 7; i++) { 
			let newX = this.xPos - i
			let newY = i + this.yPos
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		//Quadrant 3 diagonal
		for (let i = 1; (i + this.xPos) <= 7 && (this.yPos - i) >= 0; i++) { 
			let newX = i + this.xPos
			let newY = this.yPos - i
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		//Quadrant 4 diagonal
		for (let i = 1; (this.xPos - i) >= 0 && (this.yPos - i) >= 0; i++) { 
			let newX = this.xPos - i
			let newY = this.yPos - i
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		ans = ans.filter(filterOnBoard)
		return ans
	}
	draw(context) {
		//this.image = new Image();
		if (this.color === "Black") {
			this.image.src = "bishopBlack.png"
		}
		else {
			this.image.src = "bishopWhite.png"
		}
	}
}
class Rook extends Piece {
	constructor(name, xPos, yPos, color) {
		super(name, xPos, yPos, color)
	}
	getMoves (board) {
		let ans = []
		//Right
		for (let i = 1; (i + this.xPos) <= 7; i++) { 
			let newX = i + this.xPos
			let newY = this.yPos
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		//Up
		for (let i = 1; (i + this.yPos) <= 7; i++) { 
			let newX = this.xPos
			let newY = i + this.yPos
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		//Left
		for (let i = 1; (this.xPos - i) >= 0; i++) { 
			let newX = this.xPos - i
			let newY = this.yPos
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		//Down
		for (let i = 1; (this.yPos - i) >= 0; i++) { 
			let newX = this.xPos
			let newY = this.yPos - i
			if (!isDef(board.squares[newX][newY]))
				ans.push([newX, newY])
			else if (board.squares[newX][newY].color !== this.color){
				ans.push([newX, newY])
				break;
			}
			else 
				break;
		}

		ans = ans.filter(filterOnBoard)
		return ans
	}


	draw(context) {
		//this.image = new Image();
		if (this.color === "Black") {
			this.image.src = "rookBlack.png"
		}
		else {
			this.image.src = "rookWhite.png"
		}
	}
}

class Queen extends Piece {
	constructor(name, xPos, yPos, color) {
		super(name, xPos, yPos,  color)
	}
	getMoves (board) {
		let ans = []
		//Right
		for (let i = 1; (i + this.xPos) <= 7; i++) { 
			let newX = i + this.xPos
			let newY = this.yPos
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Up
		for (let i = 1; (i + this.yPos) <= 7; i++) { 
			let newX = this.xPos
			let newY = i + this.yPos
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Left
		for (let i = 1; (this.xPos - i) >= 0; i++) { 
			let newX = this.xPos - i
			let newY = this.yPos
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Down
		for (let i = 1; (this.yPos - i) >= 0; i++) { 
			let newX = this.xPos
			let newY = this.yPos - i
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Quadrant 1 diagonal
		for (let i = 1; (i + this.xPos) <= 7 && (i + this.yPos) <= 7; i++) { 
			let newX = i + this.xPos
			let newY = i + this.yPos
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Quadrant 2 diagonal
		for (let i = 1; (this.xPos - i) >= 0 && (i + this.yPos) <= 7; i++) { 
			let newX = this.xPos - i
			let newY = i + this.yPos
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Quadrant 3 diagonal
		for (let i = 1; (i + this.xPos) <= 7 && (this.yPos - i) >= 0; i++) { 
			let newX = i + this.xPos
			let newY = this.yPos - i
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		//Quadrant 4 diagonal
		for (let i = 1; (this.xPos - i) >= 0 && (this.yPos - i) >= 0; i++) { 
			let newX = this.xPos - i
			let newY = this.yPos - i
			if (filterOnBoard([newX, newY])) {
				if (!isDef(board.squares[newX][newY]))
					ans.push([newX, newY])
				else if (board.squares[newX][newY].color !== this.color){
					ans.push([newX, newY])
					break;
				}
				else 
					break;
			}
		}

		ans = ans.filter(filterOnBoard)
		return ans
	}
	draw(context) {
		//this.image = new Image();
		if (this.color === "Black") {
			this.image.src = "queenBlack.png"
		}
		else {
			this.image.src = "queenWhite.png"
		}
	}
}
class King extends Piece {
	constructor(name, xPos, yPos, color) {
		super(name, xPos, yPos, color)
	}
	getMoves (board) {
		let ans = []
		let increments = [[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]]
		for (let index = 0; index < increments.length; index++) {
			let newX = this.xPos + increments[index][0]
			let newY = this.yPos + increments[index][1]
			if (filterOnBoard([newX, newY]))
			if (!isDef(board.squares[newX][newY]) || board.squares[newX][newY].color !== this.color)
				ans.push([newX , newY])
		}

		//Add castling moves
		
		if (this.color === "White") {
			if (!board.whiteKingHasMoved && !board.whiteRook0HasMoved && !isDef(board.squares[1][7]) && !isDef(board.squares[2][7]) && !isDef(board.squares[3][7]))
				ans.push([2, 7])

			if (!board.whiteKingHasMoved && !board.whiteRook1HasMoved && !isDef(board.squares[5][7]) && !isDef(board.squares[6][7]))
				ans.push([6, 7])
		}
		else {
			if (!board.blackKingHasMoved && !board.blackRook0HasMoved && !isDef(board.squares[1][0]) && !isDef(board.squares[2][0]) && !isDef(board.squares[3][0]))
				ans.push([2, 0])
			if (!board.blackKingHasMoved && !board.blackRook1HasMoved && !isDef(board.squares[5][0]) && !isDef(board.squares[6][0]))
				ans.push([6, 0])
		}
		
		return ans
	}

	draw(context) {
		if (this.color === "Black") {
			this.image.src = "kingBlack.png"
		}
		else {
			this.image.src = "kingWhite.png"
		}
	}
}

const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')
const board = new GameBoard()

board.setup()
for (let i = 0; i <= 7; i++) {
	for (let j = 0; j <= 7; j++) {
		let temp = board.squares[i][j]
		if (temp !== null) {
			temp.image.onload = function() {context.drawImage(temp.image, temp.xPos*(BOARD_SIZE/8), temp.yPos*(BOARD_SIZE/8),(BOARD_SIZE/8),(BOARD_SIZE/8))}
		}
	}
}

var highlightedMoves = []
var checks = []
var squaresAreHighlighted = false
var storeSquare = []
var whitesTurn = true
const rect = canvas.getBoundingClientRect()
var gameOver = false
var movesList

//let audio = new Audio("thud.mp3")

canvas.addEventListener('click', 
	(event) => {

		if (gameOver)
			return
			
		//Get the location of this click
		const xClick = Math.floor((event.clientX - rect.left)/(BOARD_SIZE/8))
		const yClick = Math.floor((event.clientY - rect.top)/(BOARD_SIZE/8))
		var temp;

		//If we clicked on a blank square trying to move it or we picked a square of the wrong color
		if (!squaresAreHighlighted) {
			if (  !isDef(board.squares[xClick][yClick])  || (board.squares[xClick][yClick].color === "White" && !whitesTurn) 
					|| (board.squares[xClick][yClick].color === "Black" && whitesTurn) )   
				return;
		}
		
		//If we want to move a piece and it is valid
		if (!squaresAreHighlighted ) {
			storeSquare = [xClick, yClick]
			highlightedMoves = board.squares[xClick][yClick].getMoves(board)
			
			//Filter the highlighted moves to look for checks
			let crntcolor = "Black"
			if (whitesTurn)
				crntcolor = "White"
			highlightedMoves = highlightedMoves.filter(function (move) {return !board.moveUnderCheck(crntcolor, xClick, yClick, move[0], move[1])} )
			
			if (highlightedMoves.length == 0)
				return;
			
			for (let i = 0; i < highlightedMoves.length; i++) {
				let xCircle = highlightedMoves[i][0]
				let yCircle = highlightedMoves[i][1]
				context.fillStyle = "blue"
				context.fillRect(xCircle*(BOARD_SIZE/8), yCircle*(BOARD_SIZE/8), (BOARD_SIZE/40), (BOARD_SIZE/40))
			}
			squaresAreHighlighted = true
		}

		//We select a square not in the highlighted list
		else if (squaresAreHighlighted &&  !includes([xClick, yClick], highlightedMoves)) {
			//Clear the previous highlightedMoves list
			for (let i = 0; i < highlightedMoves.length; i++) {
				let xCircle = highlightedMoves[i][0]
				let yCircle = highlightedMoves[i][1]
				if ((xCircle + yCircle) % 2 == 0)
					context.fillStyle = "#9A7B4F"
				else
					context.fillStyle = "#481F01"
				context.fillRect(xCircle * (BOARD_SIZE/8), yCircle * (BOARD_SIZE/8), (BOARD_SIZE/40), (BOARD_SIZE/40))
			}
			squaresAreHighlighted = false;
		}

		//Move the piece
		else if (squaresAreHighlighted) {
			let ans = board.move(storeSquare[0], storeSquare[1], xClick, yClick)
			
			//Remove the piece's image from its previous square
			temp = board.squares[storeSquare[0]][storeSquare[1]];
			if ((storeSquare[0] + storeSquare[1]) % 2 == 0)
				context.fillStyle = "#9A7B4F"
			else
				context.fillStyle = "#481F01"
			context.fillRect(storeSquare[0] * (BOARD_SIZE/8), storeSquare[1] * (BOARD_SIZE/8), (BOARD_SIZE/8), (BOARD_SIZE/8))
	

			//Load the new image onto piece's new square
			temp = board.squares[xClick][yClick]
			if ((xClick + yClick) % 2 == 0)
				context.fillStyle = "#9A7B4F"
			else
				context.fillStyle = "#481F01"
			context.fillRect(xClick * (BOARD_SIZE/8), yClick * (BOARD_SIZE/8), (BOARD_SIZE/8), (BOARD_SIZE/8))
			if (isDef(temp)) {
				temp.image.onload = function() {context.drawImage(temp.image, temp.xPos*(BOARD_SIZE/8), temp.yPos*(BOARD_SIZE/8),(BOARD_SIZE/8),(BOARD_SIZE/8))}
			}

			//Deal with castling
			if (ans !== null && ans[0] === "Castle") {
				if ((ans[1] + ans[2]) % 2 == 0)
					context.fillStyle = "#9A7B4F"
				else
					context.fillStyle = "#481F01"
				context.fillRect(ans[1] * (BOARD_SIZE/8), ans[2] * (BOARD_SIZE/8), (BOARD_SIZE/8), (BOARD_SIZE/8))
				let temp = board.squares[ans[3]][ans[4]]
				temp.image.onload = function() {context.drawImage(temp.image, temp.xPos*(BOARD_SIZE/8), temp.yPos*(BOARD_SIZE/8),(BOARD_SIZE/8),(BOARD_SIZE/8))}
			}

			//Deal with en pessant
			if (ans !== null && ans[0] === "Ep") {
				if ((ans[1] + ans[2]) % 2 == 0)
					context.fillStyle = "#9A7B4F"
				else
					context.fillStyle = "#481F01"
				context.fillRect(ans[1] * (BOARD_SIZE/8), ans[2] * (BOARD_SIZE/8), (BOARD_SIZE/8), (BOARD_SIZE/8))
			}

			//Clear highlighted squares
			for (let i = 0; i < highlightedMoves.length; i++) {
				let xCircle = highlightedMoves[i][0]
				let yCircle = highlightedMoves[i][1]
				if ((xCircle + yCircle) % 2 == 0)
					context.fillStyle = "#9A7B4F"
				else
					context.fillStyle = "#481F01"
				context.fillRect(xCircle * (BOARD_SIZE/8), yCircle * (BOARD_SIZE/8), (BOARD_SIZE/40), (BOARD_SIZE/40))
			}
			squaresAreHighlighted = false;

			//Clear the current check if there is a check
			if (checks.length > 0) {
				if ((checks[0][0] + checks[0][1]) % 2 == 0)
					context.fillStyle = "#9A7B4F"
				else
					context.fillStyle = "#481F01"
				context.fillRect(checks[0][0] * (BOARD_SIZE/8), checks[0][1] * (BOARD_SIZE/8), (BOARD_SIZE/40), (BOARD_SIZE/40))
			}

			//Add a check if there is a check
			if (whitesTurn) 
				checks = board.lookForChecks("White")
			else 
				checks = board.lookForChecks("Black")
			
			if (checks.length > 1) {	
				context.fillStyle = "Red"
				context.fillRect(checks[0][0] * (BOARD_SIZE/8), checks[0][1] * (BOARD_SIZE/8), (BOARD_SIZE/40), (BOARD_SIZE/40))
			}

			gameOver = board.endingConditions(whitesTurn)
			whitesTurn = !whitesTurn;
		}
	}
)