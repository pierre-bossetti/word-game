import React from 'react'

import { sample } from '../../utils'
import { WORDS } from '../../data'
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'

import GuessInput from '../GuessInput/GuessInput'
import GuessResults from '../GuessResults/GuessResults'
import WonBanner from '../WonBanner'
import LostBanner from '../LostBanner'

// Pick a random word on every pageload.
const answer = sample(WORDS)
// To make debugging easier, we'll log the solution in the console.
console.info({ answer })

function Game() {
  const [guesses, setGuesses] = React.useState([])
  const [gameStatus, setgameStatus] = React.useState('running')

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess]
    setGuesses(nextGuesses)

    if (tentativeGuess === answer) {
      setgameStatus('won')
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setgameStatus('lost')
    }
  }

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />
      {gameStatus === 'won' && <WonBanner numOfGuesses={guesses.length} />}
      {gameStatus === 'lost' && <LostBanner answer={answer} />}
    </>
  )
}

/* Valid solution but not using reusable components
function endMessage(gameStatus, answer, numberOfGuesses) {
  const className = gameStatus === 'win' ? 'happy banner' : 'sad banner'
  const message =
    gameStatus === 'win'
      ? `Congratulations! You got it in ${numberOfGuesses} guesses`
      : `You lost! The correct answer was ${answer}`
  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  )
}
*/
export default Game
