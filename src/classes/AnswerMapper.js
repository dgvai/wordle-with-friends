import { LetterState } from "../constants/games";

export function MapToTextTiles(matrix) {
  this.matrix = matrix.map(v => {
    return v.map(w => {
      switch(w) {
          case LetterState.Correct : return '🟩';
          case LetterState.Misplaced : return '🟨';
          case LetterState.Wrong : return '⬛';
          default: return ''
      }
    }).join('')
  }).join("\r\n").trim()
}

MapToTextTiles.prototype.AddTitle = function(name) {
  const tries = this.matrix.split("\n").length;
  const lines = `${name}'s wordle\nWWF         ${tries}/6\n\n`;
  this.text =  lines+this.matrix;
}