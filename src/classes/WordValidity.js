import { words5 } from './../data/word5';
import { words6 } from './../data/word6';

export const checkWordValidity = (word) => {
  switch(word.length) {
    case 5: return words5.includes(word.toLowerCase()); 
    case 6: return words6.includes(word.toLowerCase()); 
    default: return false;
  }
}