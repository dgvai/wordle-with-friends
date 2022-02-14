import { doc, FieldValue, getDoc, getFirestore, increment, updateDoc } from 'firebase/firestore';
import { Colors } from '../constants/colors';
import { GameStates, LetterState } from '../constants/games';
import { secureStorage } from './SecureStorage';

function initializeMatrix(rows, cols) {

  const grid = [];
  const solv = [];

  for(var i = 0; i < rows; i++){
    grid.push([])
    solv.push([])
    for(var j = 0; j < cols; j++) {
      grid[i].push('')
      solv[i].push('')
    }
  }

  return {grid, solv};
}

async function updateGameData(gameId) {
  const db = getFirestore();
  const gameDocRef = doc(db, "games", gameId)
  await updateDoc(gameDocRef, {solves:  increment(1)});
}

export async function loadNewGameData(boardState, setBoardState, gameId) {
  
  const db = getFirestore();
  const gameDocRef = doc(db, "games", gameId)
  const gameSnap = await getDoc(gameDocRef);

  if(gameSnap.exists()) {

      localStorage.setItem('currentGameId', gameId)
      localStorage.setItem('currentGameRows', gameSnap.data().tries)
      localStorage.setItem('currentGameCols', gameSnap.data().length)
      localStorage.setItem('currentGameCreator', gameSnap.data().name ?? 'Anonymous')
      localStorage.setItem('currentGameHint', gameSnap.data().hint)
      secureStorage.setItem('currentGameSoln', gameSnap.data().word)

      const {grid, solv} = initializeMatrix(gameSnap.data().tries, gameSnap.data().length)

      boardState.id = gameId
      boardState.row = 0
      boardState.col = 0
      boardState.matrix = grid
      boardState.solves = solv
      boardState.keyset = {correct: [], misplaced: [],wrong: []}
      boardState.tempRow = null
      boardState.state = 0
      setBoardState({...boardState, ...boardState})

  } else {
    console.log('No game found')
  }
}

export function updateGameBoardState(boardState, setBoardState) {
  setBoardState({...boardState, ...boardState})
  localStorage.setItem('boardState', JSON.stringify(boardState))
}

export function compareWords(word, boardState) {

  const userWordArray = boardState.matrix[boardState.row];
  const solnWordArray = (word).toUpperCase().split('')
  var winCounter = 0;
        
  userWordArray.forEach((v,i) => {

    if(solnWordArray.includes(v)) {
      if(solnWordArray[i] == v) {
        boardState.solves[boardState.row][i] = LetterState.Correct
        boardState.keyset.correct.push(v.toLowerCase())
        winCounter++;
      } else {
        boardState.solves[boardState.row][i] = LetterState.Misplaced
        boardState.keyset.misplaced.push(v.toLowerCase())
      }
    } else {
      boardState.solves[boardState.row][i] = LetterState.Wrong
      boardState.keyset.wrong.push(v.toLowerCase())
    }
  })

  return winCounter;
}

export function PressedBackspace(boardState, setBoardState) {
  if(boardState.col > 0) {

    boardState.matrix[boardState.row][boardState.col - 1] = ''
    boardState.col--;
    updateGameBoardState(boardState, setBoardState)
  }
}

export function PressedKey(btn, boardState, setBoardState) {

  const cols = localStorage.getItem('currentGameCols') || 5;

  if(boardState.col < cols) {

    boardState.matrix[boardState.row][boardState.col] = btn.toUpperCase()
    boardState.col++;
    updateGameBoardState(boardState, setBoardState)
  }
}

export function EnterPressed(boardState, setBoardState) {
  
  const rows = localStorage.getItem('currentGameRows') || 6;
  const cols = localStorage.getItem('currentGameCols') || 5;
  const word = secureStorage.getItem('currentGameSoln')

  var winCounter = compareWords(word, boardState);

  if(winCounter == cols) {
    boardState.state = GameStates.Won;
    updateGameData(boardState.id)
  } else if(boardState.row == rows - 1) {
    boardState.state = GameStates.Lost;
  }
  
  boardState.row++;
  boardState.col = 0
  updateGameBoardState(boardState, setBoardState);
}

export function getTileBGColor(solv, row, col) {
  switch(solv[row][col]) {
    case LetterState.Correct : return Colors.Matched;
    case LetterState.Misplaced : return Colors.Misplaced;
    case LetterState.Wrong : return Colors.Wrong;
    default: return Colors.BlankTile;
  }
}

export function getTileBorder(solv, row, col) {
  return (solv[row][col]) ? 'none' : '2px solid #D1D5DB';
}

export function getTileTextColor(solv, row, col) {
  return (solv[row][col]) ? Colors.LightText : Colors.DarkText;
}

export function getTileAnimation(shakeRow, row) {
  return (shakeRow != null && shakeRow == row) ? 'shake 0.5s 1' : '';
}