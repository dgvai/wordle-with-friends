import { LetterState } from "../constants/games"

export const getKeyboardMapping = (guesses, solution) => {
  
  const charecters = {}

  const keyset = {
    correct: [],
    misplaced: [],
    wrong: []
  }

  guesses.forEach((word) => {

    word.split('').forEach((letter, i) => {
      if (!solution.includes(letter)) {
        charecters[letter] = 'absent'
        keyset.wrong.push(letter.toLowerCase())
        return
      }

      if (letter === solution[i]) {
        charecters[letter] = 'correct'
        keyset.correct.push(letter.toLowerCase())
        return
      }

      if (charecters[letter] !== 'correct') {
        charecters[letter] = 'present'
        keyset.misplaced.push(letter.toLowerCase())
        return
      }
    })
  })

  return {charecters, keyset}
}

export const getGuessStatus = (guess, solution) => {

  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses = Array.from(Array(guess.length))

  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = LetterState.Correct
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      statuses[i] = LetterState.Wrong
      return
    }

    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = LetterState.Misplaced
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = LetterState.Wrong
      return
    }
  })

  return statuses
}