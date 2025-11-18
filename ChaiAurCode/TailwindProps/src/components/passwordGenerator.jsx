import { useCallback, useState, useRef,useEffect } from "react";
import "./passwordGenerator.css";

function Password() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
     <div className="password-page-wrapper ">
    
    <div className="password-container">
      <h1 className="title">Password Generator</h1>

      <div className="password-box">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="password-input"
        />
        <button className="copy-btn" onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>

      <div className="options">
        <div>
          <input
            type="range"
            min="6"
            max="100"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
          />
          <label>Include Numbers</label>
        </div>

        <div>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed(!charAllowed)}
          />
          <label>Include Symbols</label>
        </div>
      </div>
    </div>
    </div>
  );
}


export default Password;
