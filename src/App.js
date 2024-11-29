import './App.css';
import React, { useState } from 'react';

function App() {

  const words = ['HUMAN','PYTHON','XENOMORPH',
    'PNEUMONOULTRAMICROSCOPICSILICOVOLCANOCONIOSIS',
    'DRAGON','DELEGATE','EGG','TULIP','ROSE','RAINBOW'];
  const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  const [visibleLetters, setVisibleLetters] = useState('');
  const [absentLetters, setAbsentLetters] = useState('');

  const setWord = () =>{
    return words[Math.floor(Math.random() * words.length)];
  }
  const [selectedWord, setSelectedWord] = useState(setWord());

  const [errorsCounter, setErrorsCounter] = useState(0);

  const handleClick = (letter) =>{
    if(selectedWord.includes(letter)){
      if(!visibleLetters.includes(letter)){
        setVisibleLetters((currValue) => currValue + letter);
      }      
    }
    else{
      if(!absentLetters.includes(letter)){
        setAbsentLetters((currValue) => currValue + letter);
        setErrorsCounter((currValue) => currValue + 1);
      }      
    }
  }

  return (
    <div className="app">
      <h1 className='main-header'>Hangman</h1>
      <p className='instructions-p'>Guess the word.</p>
      <p className='instructions-p'>Use the letters below.</p>
      <div className='word-container'>
        {selectedWord.split('').map((letter, letterId) =>
        <div key={letterId}
        className={`word-letter ${visibleLetters.includes(letter) ? '' : 'hidden'}`}>{letter}</div>)}
      </div>
      <p className='counter-p'>Errors Count: <b>{errorsCounter}</b></p>
      <div className='letters-container'>
        {letters.split('').map((letter,letterId) =>
          <button key={letterId} 
          className={`letter-button ${visibleLetters.includes(letter) ? 'correct' : ''} 
          ${absentLetters.includes(letter) ? 'incorrect' : ''}`} 
          onClick={() => handleClick(letter)}>{letter}</button>
        )}
      </div>
      {visibleLetters.length === selectedWord.split('')
      .filter((char, index, arr) => arr.indexOf(char) === index)
      .join('').length && 
      <button className='new-game-button' 
      onClick={() => window.location.reload()}>New Game</button>}      
    </div>
  );
}

export default App;
