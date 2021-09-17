class Board {
    constructor(grid, matrix, pieces,turn = 1  ,spaces = []) {
        this.grid = grid
        this.matrix = matrix
        this.turn = turn
        this.spaces = spaces
        this.pieces = pieces
    }

generate_board() {
        //generate the gameboard
        for (let row = 0; row < 8; row++) {
            for (let c = 0; c < 8; c++) {
                let gamespace = document.createElement("div")
                if (row % 2 === 0) { c % 2 === 0 ? gamespace.className = "gamespace-white" : gamespace.className = "gamespace-black" }
                else { c % 2 === 0 ? gamespace.className = "gamespace-black" : gamespace.className = "gamespace-white" }
                gamespace.id = "space " + row + c
                this.spaces.push({
                    "name": gamespace.id,
                    "class": gamespace.className,
                    "element": gamespace
                })
                this.grid.appendChild(gamespace)
            }
        }
        this.pieces.forEach(piece => {
            let space = document.getElementById("space " + piece.position[0] + piece.position[1])
            let P = piece.createPiece()
            Gameboard.matrix[piece.position[0]][piece.position[1]] = piece
            space.appendChild(P)
        });
        this.game_menu_update()
    }

    whos_turn(){
        return Gameboard.turn % 2 == 0?"black" : "white" 
    }
game_menu_update(){
    let black = document.getElementById("black")
    black.style.borderColor = "black"
    let white = document.getElementById("white")
    white.style.borderColor = "black"
    let turn = this.whos_turn()
    let currentplayer = document.getElementById(turn)
    currentplayer.style.borderColor = "yellow"

}
is_check(piece,pos){
    let rPos = piece.position
    piece.setPosition(pos)
    if(piece.color == white ){
        whitepieces.forEach(piece=>{
            if(piece.status == "active"){
                
            }
        })
    }
    console.log(piece.position)
    piece.setPosition(rPos)
    return false
}
}

class Piece {
    constructor(type, color, position, shape = "", moves = 0, status = "active") {
        this.type = type
        this.color = color
        this.position = position
        this.shape = shape
        this.moves = moves
        this.status = status

    }

    createPiece() {
        let P = document.createElement("img")
        P.src = "./pieces/" + this.color + this.type + ".png"
        P.className = "piece"
        P.style.width = "80%"
        P.addEventListener("mousedown", () => { this.show_valid_moves() })
        this.shape = P
        return P
    }
    get_valid_moves() {
        if(Gameboard.whos_turn() == this.color){
            if (this.type == "Pawn" ){return  this.pawn_moves()}
            else if(this.type == "Rook"){return this.rook_moves()}   
            else if(this.type == "Bishop"){return this.bishop_moves()}
            else if(this.type == "Knight"){return this.knight_moves()}
            else if (this.type == "Queen"){return this.queen_moves()}
            else if(this.type=="King"){return this.king_moves()}
        } 
        else{return []}
    }
    pawn_moves(){
        let moves = []
        if (this.color == "white") {
            if (Gameboard.matrix [this.position[0] -1][this.position[1]] == 0 && this.is_valid_move([this.position[0]-1 , this.position[1]]) == true ){
                moves.push([this.position[0] - 1, this.position[1]])
            }
            if(this.moves == 0){
                if(Gameboard.matrix[this.position[0]-2][this.position[1]] == 0 &&Gameboard.matrix [this.position[0] -1][this.position[1]] == 0){
                moves.push([this.position[0] - 2, this.position[1]]) 
            }
            }
            if(Gameboard.matrix[this.position[0]-1][this.position[1]-1] !== 0 &&  this.is_valid_move([this.position[0]-1 , this.position[1] -1]) == true){moves.push([this.position[0]-1 , this.position[1]-1])}
            if (Gameboard.matrix[this.position[0]-1] [this.position[1] +1] !== 0 &&  this.is_valid_move([this.position[0]-1 , this.position[1] +1 ]) == true){moves.push([this.position[0]-1 ,this.position[1] +1])}
        }
        else if (this.color == "black") {
            if (Gameboard.matrix [this.position[0] +1][this.position[1]] == 0 && this.is_valid_move([this.position[0] + 1 , this.position[1]]) == true ){
                moves.push([this.position[0] + 1, this.position[1]])}
                if(this.moves == 0){
                if(Gameboard.matrix[this.position[0] + 2][this.position[1]] == 0 &&Gameboard.matrix [this.position[0] + 1][this.position[1]] == 0){
            moves.push([this.position[0] + 2, this.position[1]])
                }        
        }
            if(Gameboard.matrix[this.position[0]+1][this.position[1]-1] !== 0 &&  this.is_valid_move([this.position[0]+1 , this.position[1] -1]) == true){moves.push([this.position[0]+1 , this.position[1]-1])}
            if (Gameboard.matrix[this.position[0]+1] [this.position[1] +1] !== 0 &&  this.is_valid_move([this.position[0]+1 , this.position[1] +1 ]) == true){moves.push([this.position[0]+1 ,this.position[1] +1])}

        }
        return moves
    }

rook_moves(){
    let moves = []
    let i = 1
    while(this.is_valid_move([this.position[0]+ i , this.position[1]]) == true && Gameboard.matrix[this.position[0] + i][this.position[1]] == 0 ){
        moves.push([this.position[0] + i , this.position[1]])
        i++
            }
       if (this.is_valid_move([this.position [0] + i  ,this.position[1]]) && Gameboard.matrix[this.position[0] + i  ][this.position[1]].color != this.color && Gameboard.matrix[this.position[0] + i ][this.position[1]].color != undefined){
           moves.push([this.position[0] + i, this.position[1]])
       }
       i = 1
       while(this.is_valid_move([this.position[0]- i , this.position[1]]) == true && Gameboard.matrix[this.position[0] - i][this.position[1]] == 0 ){
        moves.push([this.position[0] - i , this.position[1]])
        i++
        }
   if(this.is_valid_move([this.position [0] - i ,this.position[1]]) && Gameboard.matrix[this.position[0] - i][this.position[1]].color != this.color && Gameboard.matrix[this.position[0] - i][this.position[1]].color != undefined){
       moves.push([this.position[0] - i, this.position[1]])
   }
   i = 1
   while(this.is_valid_move([this.position[0] , this.position[1] + i]) == true && Gameboard.matrix[this.position[0]][this.position[1]+ i ] == 0 ){
    moves.push([this.position[0] , this.position[1] + i ])
    i++
    }
    if(this.is_valid_move([this.position [0]  ,this.position[1] + i ]) && Gameboard.matrix[this.position[0]][this.position[1]+ i].color != this.color && Gameboard.matrix[this.position[0]][this.position[1]+ i].color != undefined){
    moves.push([this.position[0] , this.position[1] + i])
    }
    i = 1
    while(this.is_valid_move([this.position[0] , this.position[1] - i]) == true && Gameboard.matrix[this.position[0]][this.position[1]- i ] == 0 ){
    moves.push([this.position[0] , this.position[1] - i ])
    i++
    }
    if(this.is_valid_move([this.position [0]  ,this.position[1] - i ]) && Gameboard.matrix[this.position[0]][this.position[1]- i].color != this.color && Gameboard.matrix[this.position[0]][this.position[1]- i].color != undefined){
    moves.push([this.position[0] , this.position[1] - i])
    }
        return moves
    }
    
   bishop_moves(){
       let moves = []
       let i = 1 
       while(this.is_valid_move([this.position[0]+ i , this.position[1] + i ]) == true && Gameboard.matrix[this.position[0] + i][this.position[1] + i ] == 0 ){
           moves.push([this.position[0] + i , this.position[1]+ i ])
           i++
           }
      if (this.is_valid_move([this.position [0] + i  ,this.position[1] + i ]) && Gameboard.matrix[this.position[0] + i  ][this.position[1] + i ].color != this.color && Gameboard.matrix[this.position[0] + i ][this.position[1] + i].color != undefined){
          moves.push([this.position[0] + i, this.position[1] + i])
      } 
      i = 1
      while(this.is_valid_move([this.position[0]- i , this.position[1] - i ]) == true && Gameboard.matrix[this.position[0] - i][this.position[1] - i ] == 0 ){
       moves.push([this.position[0] - i , this.position[1]- i ])
       i++
       }
   if (this.is_valid_move([this.position [0] - i  ,this.position[1] - i ]) && Gameboard.matrix[this.position[0] - i  ][this.position[1] - i ].color != this.color && Gameboard.matrix[this.position[0] - i ][this.position[1] - i].color != undefined){
      moves.push([this.position[0] - i, this.position[1] - i])
   }             
      i = 1
      while(this.is_valid_move([this.position[0]+ i , this.position[1] - i ]) == true && Gameboard.matrix[this.position[0] + i][this.position[1] - i ] == 0 ){
       moves.push([this.position[0] + i , this.position[1]- i ])
       i++
       }
   if (this.is_valid_move([this.position [0] + i  ,this.position[1] - i ]) && Gameboard.matrix[this.position[0] + i  ][this.position[1] - i ].color != this.color && Gameboard.matrix[this.position[0] + i ][this.position[1] - i].color != undefined){
      moves.push([this.position[0] + i, this.position[1] - i ])
   }       
   i = 1
      while(this.is_valid_move([this.position[0]- i , this.position[1] + i ]) == true && Gameboard.matrix[this.position[0] - i][this.position[1] + i ] == 0 ){
       moves.push([this.position[0] - i , this.position[1]+ i ])
       i++
       }
   if (this.is_valid_move([this.position [0] - i  ,this.position[1] + i ]) && Gameboard.matrix[this.position[0] - i  ][this.position[1] + i ].color != this.color && Gameboard.matrix[this.position[0] - i ][this.position[1] + i].color != undefined){
      moves.push([this.position[0] - i, this.position[1] + i ])
   }       

return moves
   }

   knight_moves(){
       let moves = []
if(this.is_valid_move([this.position[0] + 1 , this.position[1] + 2] ) ){
    Gameboard.matrix[this.position[0] + 1] [this.position[1] + 2]  == 0 ||  Gameboard.matrix[this.position[0] + 1] [this.position[1] + 2].color  != this.color ? moves.push([this.position[0]+ 1 , this.position[1]+ 2 ]) : null
           }
if(this.is_valid_move([this.position[0] - 1 , this.position[1] - 2] ) ){
    Gameboard.matrix[this.position[0] - 1] [this.position[1] - 2]  == 0 ||  Gameboard.matrix[this.position[0] - 1] [this.position[1] - 2].color  != this.color ? moves.push([this.position[0]- 1 , this.position[1]- 2 ]) : null
}
if(this.is_valid_move([this.position[0]+ 1, this.position[1]-2])){
    Gameboard.matrix[this.position[0] + 1][this.position[1] - 2] == 0 || Gameboard.matrix[this.position[0] + 1][this.position[1] - 2] .color != this.color ? moves.push([this.position[0]+ 1, this.position[1]-2]) : null 
    }
if(this.is_valid_move([this.position[0]- 1, this.position[1]+2])){
    Gameboard.matrix[this.position[0] - 1][this.position[1] + 2] == 0 || Gameboard.matrix[this.position[0] - 1][this.position[1] + 2] .color != this.color ? moves.push([this.position[0]- 1, this.position[1]+2]) : null 
        }
if(this.is_valid_move([this.position[0] + 2 , this.position [1] + 1])){
    Gameboard.matrix[this.position[0] + 2][this.position[1] + 1 ] == 0 || Gameboard.matrix[this.position[0] + 2][this.position[1] + 1 ].color != this.color ?  moves.push([this.position[0] + 2 , this.position [1] + 1]) : null 
    }
if(this.is_valid_move([this.position[0] - 2 , this.position [1] - 1])){
        Gameboard.matrix[this.position[0] - 2][this.position[1] - 1 ] == 0 || Gameboard.matrix[this.position[0] - 2][this.position[1] - 1 ].color != this.color ?  moves.push([this.position[0] - 2 , this.position [1] - 1]) : null 
        }
if(this.is_valid_move([this.position[0] + 2 , this.position [1]  - 1])){
Gameboard.matrix[this.position[0] + 2][this.position[1] - 1 ] == 0 || Gameboard.matrix[this.position[0] + 2][this.position[1] - 1 ].color != this.color ? moves.push([this.position[0] + 2 , this.position [1] - 1]) : null
}
if(this.is_valid_move([this.position[0] - 2 , this.position [1]  + 1])){
    Gameboard.matrix[this.position[0] - 2][this.position[1] + 1 ] == 0 || Gameboard.matrix[this.position[0] - 2][this.position[1] + 1 ].color != this.color ? moves.push([this.position[0] - 2 , this.position [1] + 1]) : null
    }
return moves
   }

   queen_moves(){
       let moves = []
       let g1  = this.bishop_moves()
       let g2 = this.rook_moves()
       g1.forEach(pos  => {moves.push(pos)})
       g2.forEach(pos => {moves.push(pos)})
       return moves
   }

   king_moves(){
    let moves = []
    if(this.is_valid_move([this.position[0]+ 1  , this.position[1]])){
        Gameboard.matrix[this.position[0] + 1] [this.position[1]] == 0 || Gameboard.matrix[this.position[0] + 1] [this.position[1]].color != this.color? moves.push([this.position[0] + 1 , this.position[1]]) : null
    }
    if(this.is_valid_move([this.position[0]- 1  , this.position[1]])){
        Gameboard.matrix[this.position[0] - 1] [this.position[1]] == 0 || Gameboard.matrix[this.position[0] - 1] [this.position[1]].color != this.color? moves.push([this.position[0] - 1 , this.position[1]]) : null
    }
    if(this.is_valid_move([this.position[0]  , this.position[1] + 1])){
        Gameboard.matrix[this.position[0] ] [this.position[1] + 1] == 0 || Gameboard.matrix[this.position[0]] [this.position[1] + 1 ].color != this.color? moves.push([this.position[0] , this.position[1] + 1 ]) : null
    }
    if(this.is_valid_move([this.position[0]  , this.position[1] - 1])){
        Gameboard.matrix[this.position[0] ] [this.position[1] - 1] == 0 || Gameboard.matrix[this.position[0]] [this.position[1] - 1 ].color != this.color? moves.push([this.position[0] , this.position[1] - 1 ]) : null
    }
    if(this.is_valid_move([this.position[0]+ 1  , this.position[1] + 1 ])){
        Gameboard.matrix[this.position[0] + 1] [this.position[1] + 1 ] == 0 || Gameboard.matrix[this.position[0] + 1] [this.position[1]+ 1].color != this.color? moves.push([this.position[0] + 1 , this.position[1] + 1 ]) : null
    }
    if(this.is_valid_move([this.position[0]- 1  , this.position[1] - 1 ])){
        Gameboard.matrix[this.position[0] - 1] [this.position[1] - 1 ] == 0 || Gameboard.matrix[this.position[0] - 1] [this.position[1]- 1].color != this.color? moves.push([this.position[0] - 1 , this.position[1] - 1 ]) : null
    }
    if(this.is_valid_move([this.position[0]- 1  , this.position[1] - 1 ])){
        Gameboard.matrix[this.position[0] - 1] [this.position[1] - 1 ] == 0 || Gameboard.matrix[this.position[0] - 1] [this.position[1]- 1].color != this.color? moves.push([this.position[0] - 1 , this.position[1] - 1 ]) : null
    }
    if(this.is_valid_move([this.position[0]+ 1  , this.position[1] - 1 ])){
        Gameboard.matrix[this.position[0] + 1] [this.position[1] - 1 ] == 0 || Gameboard.matrix[this.position[0] + 1] [this.position[1]- 1].color != this.color? moves.push([this.position[0] + 1 , this.position[1] - 1 ]) : null
    }
    if(this.is_valid_move([this.position[0]- 1  , this.position[1] + 1 ])){
        Gameboard.matrix[this.position[0] - 1] [this.position[1] + 1 ] == 0 || Gameboard.matrix[this.position[0] - 1] [this.position[1]+ 1].color != this.color? moves.push([this.position[0] - 1 , this.position[1] + 1 ]) : null
    }
    return moves
   }
   
    is_valid_move(pos){   
         if(pos[0] < 8  && pos[1] < 8 && pos[0]>= 0 && pos[1] >= 0 ){
             if(Gameboard.matrix[pos[0]][pos[1]] !=0 ){
                return Gameboard.matrix[pos[0]][pos[1]].color != this.color? true : false 
             }
            else{return true}
         }
         else{
            return false
         }
        }
    
    show_valid_moves() {
        let previous_moves = document.getElementsByClassName("hint")
        while (previous_moves.length > 0) {
            let nspace = Gameboard.spaces.find(space => space.name === previous_moves.item(0).id)
            previous_moves.item(0).replaceWith(nspace.element) 
        }

        let validmoves = this.get_valid_moves()
        if (validmoves.length > 0){ 
        validmoves.forEach(position => {
            let space = document.getElementById("space " + position[0] + position[1])
            let space_has_piece = space.hasChildNodes 
            if(space_has_piece == true){space.firstChild.removeChild()}
            space.replaceWith(space.cloneNode(true))
            let new_space = document.getElementById("space " + position[0] + position[1])
            new_space.className = "hint"
            if(space_has_piece == true){new_space.appendChild(Gameboard.matrix[position[0]][position[1]])}
             new_space.addEventListener('click', () => {
                 validmoves.forEach(position => {
                     let space = document.getElementById("space " + position[0] + position[1])
                     let ogspace = Gameboard.spaces.find(space => space.name === "space " + position[0] + position[1]).element
                     space.replaceWith(ogspace)
                    })
            this.move([position[0], position[1]])
            }) 
        })
    }
    }
    setPosition(new_pos) {
        Gameboard.matrix[this.position[0]][this.position[1]] = 0 //sets previous position back to 0 
        this.position = new_pos
        Gameboard.matrix[this.position[0]][this.position[1]] = this
        this.check_special_conditions()
    }
    
    move(pos) {
        let prev_pos = document.getElementById('space ' + this.position[0] + this.position[1])
        prev_pos.removeChild(this.shape)
        this.setPosition(pos)
        let new_pos = document.getElementById('space ' + this.position[0] + this.position[1])
        new_pos.appendChild(this.shape)
        if(new_pos.childNodes.length > 1){ 
            Gameboard.pieces.forEach(piece =>{
                if (piece.shape == new_pos.firstChild){
                 piece.position = []
                 piece.status = "inactive"
                    console.log(piece)
                }
            } )
            new_pos.removeChild(new_pos.firstChild)
        
        }
        this.moves++
        Gameboard.turn ++
        Gameboard.game_menu_update()
    }

    check_special_conditions(){
        // if the Pawn reaches the end of the board bring in the menu that lets you convert it into any piece you want
    
        if(this.type == "Pawn" ){
            if(this.position[0] == 7 || this.position[0] == 0){
                let valid_pieces = ["Rook","Bishop","Knight","Queen"]
                let side = document.getElementById("side-bar")
            let selectionMenu = document.createElement("div")
            selectionMenu.className = "selection-menu"
            for(let r = 0 ; r < 4 ; r++){
                let piece_options = document.createElement("img")
                piece_options.className = "piece-option"
                piece_options.src = "./pieces/" + this.color + valid_pieces[r] + ".png"
                piece_options.addEventListener("click" , ()=>{
                    let new_piece = new Piece(valid_pieces[r], this.color,this.position)
                    new_piece.createPiece()
                    let replacementPos = document.getElementById("space " + this.position[0] + this.position[1])
                    replacementPos.removeChild(this.shape)
                    replacementPos.appendChild(new_piece.shape)
                    selectionMenu.remove()
                })
                selectionMenu.appendChild(piece_options)
            }
            side.appendChild(selectionMenu)
            }
        }
       
    }
}

//making a object for every piece

let wPawn1 = new Piece("Pawn", "white", [6, 0], "P")
let wPawn2 = new Piece("Pawn", "white", [6, 1], "P")
let wPawn3 = new Piece("Pawn", "white", [6, 2], "P")
let wPawn4 = new Piece("Pawn", "white", [6, 3], "P")
let wPawn5 = new Piece("Pawn", "white", [6, 4], "P")
let wPawn6 = new Piece("Pawn", "white", [6, 5], "P")
let wPawn7 = new Piece("Pawn", "white", [6, 6], "P")
let wPawn8 = new Piece("Pawn", "white", [6, 7], "P")
let wRook1 = new Piece("Rook", "white", [7, 0], "R")
let wRook2 = new Piece("Rook", "white", [7, 7], "R")
let wQueen = new Piece("Queen", "white", [7, 3], "Q")
let wKing = new Piece("King", "white", [7, 4], "K")
let wBishop1 = new Piece("Bishop", "white", [7, 2], "B")
let wBishop2 = new Piece("Bishop", "white", [7, 5], "B")
let wKnight1 = new Piece("Knight", "white", [7, 1], "Kn")
let wKnight2 = new Piece("Knight", "white", [7, 6], "Kn")

let bPawn1 = new Piece("Pawn", "black", [1, 0], "P")
let bPawn2 = new Piece("Pawn", "black", [1, 1], "P")
let bPawn3 = new Piece("Pawn", "black", [1, 2], "P")
let bPawn4 = new Piece("Pawn", "black", [1, 3], "P")
let bPawn5 = new Piece("Pawn", "black", [1, 4], "P")
let bPawn6 = new Piece("Pawn", "black", [1, 5], "P")
let bPawn7 = new Piece("Pawn", "black", [1, 6], "P")
let bPawn8 = new Piece("Pawn", "black", [1, 7], "P")
let bRook1 = new Piece("Rook", "black", [0, 0], "R")
let bRook2 = new Piece("Rook", "black", [0, 7], "R")
let bQueen = new Piece("Queen", "black", [0, 3], "Q")
let bKing = new Piece("King", "black", [0, 4], "K")
let bBishop1 = new Piece("Bishop", "black", [0, 2], "B")
let bBishop2 = new Piece("Bishop", "black", [0, 5], "B")
let bKnight1 = new Piece("Knight", "black", [0, 1], "Kn")
let bKnight2 = new Piece("Knight", "black", [0, 6], "Kn")

let blackpieces = [bRook1, bKnight1, bBishop1, bQueen, bKing, bBishop2, bKnight2, bRook2, bPawn1, bPawn2, bPawn3, bPawn4, bPawn5, bPawn6, bPawn7, bPawn8]
let whitepieces = [wRook1, wKnight1, wBishop1, wQueen,  wKing, wBishop2, wKnight2, wRook2, wPawn1, wPawn2, wPawn3, wPawn4, wPawn5, wPawn6, wPawn7, wPawn8]

let Gameboard = new Board(document.getElementById("board"), [ [ 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0 ] ],
[wRook1, wKnight1, wBishop1, wQueen, wKing, wBishop2, wKnight2, wRook2, wPawn1, wPawn2, wPawn3, wPawn4, wPawn5, wPawn6, wPawn7, wPawn8,
bRook1, bKnight1, bBishop1, bQueen, bKing, bBishop2, bKnight2, bRook2, bPawn1, bPawn2, bPawn3, bPawn4, bPawn5, bPawn6, bPawn7, bPawn8])

Gameboard.generate_board()
