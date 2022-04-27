import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          it's carpooling time!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="contained">Look, an MUI button!</Button>
        </a>
      </header>
    </div>
  );
}

export default App;
