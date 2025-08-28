import { useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [specialallowed, setSpecialAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let newPassword = '';
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberallowed) characters += '0123456789';
    if (specialallowed) characters += '!@#$%^&*()_+[]{}|;:,.<>?';

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <label>Length: </label>
        <input
          type="range"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="8"
          max="20"
        /><div style={{
          border: "2px solid black",
          padding: "5px",
          width: "50px",
          textAlign: "center",
          marginTop: "10px",
          borderRadius: "5px",
          backgroundColor: "#f0f0f0"
        }}>{length}</div>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={numberallowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={specialallowed}
            onChange={(e) => setSpecialAllowed(e.target.checked)}
          />
          Include Special Characters
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      {password && (
        <div>
          <h2>Generated Password:</h2>
          <p>{password}</p>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );

}

export default App
