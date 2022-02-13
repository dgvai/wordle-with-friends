import { words5 } from './../data/word5';

export const checkWordValidity = (word) => {
  if(word.length == 5) {
    return words5.includes(word.toLowerCase())
  }
}