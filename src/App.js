import logo from './logo.svg';
import './App.css';

import LetterNode from './LetterNode';
import Trie from './Trie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


        <table>
          <tr>
            <td>
              <button className="App-button">1
              <p className="App-buttonText">&nbsp;</p>
              </button>
            </td>
            <td>
              <button className="App-button">2
              <p className="App-buttonText">abc</p>
              
              </button>
            </td>
            <td>
              <button className="App-button">3
              <p className="App-buttonText">def</p>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="App-button">4
              <p className="App-buttonText">ghi</p>
              </button>
            </td>
            <td>
              <button className="App-button">5
              <p className="App-buttonText">jkl</p>
              </button>
            </td>
            <td>
              <button className="App-button">6
              <p className="App-buttonText">mno</p>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="App-button">7
              <p className="App-buttonText">pqrs</p>
              </button>
            </td>
            <td>
              <button className="App-button">8
              <p className="App-buttonText">tuv</p>
              </button>
            </td>
            <td>
              <button className="App-button">9
              <p className="App-buttonText">wxyz</p>
              </button>
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default App;
