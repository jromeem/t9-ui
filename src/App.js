import logo from './logo.svg';
import './App.css';

import Trie from './Trie';
import LetterNode from './LetterNode';
import wordlist from './wordlist.10000.txt';
import { useEffect, useState } from 'react';

// filtering out the permutations that are words using the dictionary's isWord function
function filterWords(listAllPerms, listAllWords) {
  return listAllPerms.filter(listAllWords.isWord);
}

/**
 * Find all of the valid (according to {@code dict#isWord(string)}) words which
 * can be formed from the given input sequence.
 *
 * If you want to use a different input format, alternatives can be discussed.
 *
 * @param {string} input the sequence of buttons pressed
 * @param {{ isWord: (in: string) => boolean }} dict the dictionary implementation
 */
function findWords(input, dict) {
  const perms = makePerms(input);
  const foundWords = filterWords(perms, dict);
  return foundWords;
}

// creating the permutations using tail recursion
function makePerms(input) {
  const perms = [];
  return makePermsRecursive(perms, input);
}

// tail recursive function
function makePermsRecursive(perms, input) {
  // representing our phone keyboard
  const keyboard = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz',
  };

  // base case
  if (input.length === 0) {
      return perms;

  // first recursive case
  } else {
      const firstDigit = parseInt(input[0]);
      const keysLetters = keyboard[firstDigit] ? keyboard[firstDigit].split('') : [];
      const restSeq = input.slice(1);
  
      // the first recursive iteration
      if (perms.length === 0) {
          perms = keysLetters.slice('');

      // create a new set of permutations
      } else {
          const newPerms = [];
          perms.forEach((item) => {
              keysLetters.forEach((letter) => {
                  newPerms.push(item + letter);
              });
          });

          // update the permutations after
          perms = newPerms;
      }

      // recurs over the new set of permutations
      return makePermsRecursive(perms, restSeq);
  }
}

const Dropdown = ({words}) => {
  console.log(words);
  return (
    <></>
  );
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [newText, setNewText] = useState('');
  const [message, setMessage] = useState('');
  const [wordDictionary, setWordlistArr] = useState(null);
  const [hasFoundWords, setHasFoundWords] = useState(false);
  const [wordsFound, setWordsFound] = useState([]);

  // determines if UI dropdown is visible on page
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    fetch(wordlist)
      .then((response) => response.text())
      .then((text) => {
        const words = text.split('\n');
        setWordlistArr({
          isWord: (input) => words.includes(input)
        });
      });
  }, []);

  useEffect(() => {
    if (wordDictionary) {
      const newWords = findWords(newText, wordDictionary);
      setWordsFound(newWords);
      setHasFoundWords(newWords.length > 0);
      setCurrentIndex(0); // Reset the current index
      setIsDropdownOpen(newWords.length > 0);
    }
  }, [newText, wordDictionary]);

  useEffect(() => {
    // Update the current word displayed based on the current index
    if (wordsFound.length > 0 && currentIndex < wordsFound.length) {
      setCurrentWord(wordsFound[currentIndex]);
    } else {
      setCurrentWord('');
    }
  }, [currentIndex, wordsFound]);

  const handleSelectWord = () => {
    setMessage(prevMessage => `${prevMessage}${prevMessage ? ' ' : ''}${currentWord}`);
    setNewText('');
    setHasFoundWords(false);
    setCurrentWord('');
    setWordsFound([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-textPreview">
          &gt; {message} {hasFoundWords ? `${currentWord}|` : '|'}
          <div>{isDropdownOpen ? <Dropdown words={wordsFound}/> : ''}</div>
        </p>
        <table>
          <tr>
            <td>
              <button className="App-button" onClick={() => setCurrentIndex((currentIndex - 1 + wordsFound.length) % wordsFound.length)}>&lt;
              <p className="App-buttonText">&nbsp;</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}2`)}>O
              <p className="App-buttonText">select</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setCurrentIndex((currentIndex + 1) % wordsFound.length)}>&gt;
              <p className="App-buttonText"></p>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}1`)}>1
              <p className="App-buttonText">&nbsp;</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}2`)}>2
              <p className="App-buttonText">abc</p>
              
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}3`)}>3
              <p className="App-buttonText">def</p>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}4`)}>4
              <p className="App-buttonText">ghi</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}5`)}>5
              <p className="App-buttonText">jkl</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}6`)}>6
              <p className="App-buttonText">mno</p>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}7`)}>7
              <p className="App-buttonText">pqrs</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}8`)}>8
              <p className="App-buttonText">tuv</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => setNewText(`${newText}9`)}>9
              <p className="App-buttonText">wxyz</p>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="App-button" onClick={() => {}}>*
              <p className="App-buttonText"></p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={handleSelectWord}>0
              <p className="App-buttonText">_</p>
              </button>
            </td>
            <td>
              <button className="App-button" onClick={() => {}}>#
              <p className="App-buttonText"></p>
              </button>
            </td>
          </tr>
        </table>
      </header>
    </div>

  );
}

export default App;
