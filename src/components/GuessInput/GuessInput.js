import React from 'react'

function GuessInput({ gameStatus, handleSubmitGuess }) {
  const [tentativeGuess, setTentativeGuess] = React.useState('')

  function handleChange(event) {
    setTentativeGuess(event.target.value.toUpperCase())
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (tentativeGuess.length !== 5) {
      return
    }
    handleSubmitGuess(tentativeGuess)
    setTentativeGuess('')
  }

  return (
    <form onSubmit={handleSubmit} className='guess-input-wrapper'>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        required
        value={tentativeGuess}
        minLength={5}
        maxLength={5}
        pattern='[A-Za-z]{5}'
        title='Please enter a 5-letter word.'
        onChange={handleChange}
        type='text'
        disabled={gameStatus !== 'running'}
      />
    </form>
  )
}

export default GuessInput
