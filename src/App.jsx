import { useState,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState("")
  const [numbersAllow, setNumbersAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [copied,setCopied] = useState(false);

  const copyPassword = useRef(null);

  const generatePassword = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    setCopied(false);

    if(numbersAllow){
      str += "1234567890";
    }
    if(charAllow){
      str += "!@#$%^&*(){}[]~`";
    }

    for(let i=1;i<= length;i++){
      const char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }

  const copyPasswordToClipboard = () =>{
    window.navigator.clipboard.writeText(password);
    copyPassword.current.select();
    setCopied(true);
  }

  useEffect(() => {
    generatePassword()
  },[length,numbersAllow,charAllow]);

  return (
    <>
      <h1>Password Generator</h1>
      <section className="form">
        <div className='pass'>
          <input 
            type="text" 
            name="password"
            value={password}
            ref={copyPassword}
            readOnly
          />
          <button onClick={copyPasswordToClipboard}>{copied ? "Copied" : "Copy"}</button>
        </div>
        <div className="operations">
          <div>
            <input 
              type="range" 
              min={8}
              max={50}
              name="range"
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
              />
            <label>length({length})</label>
          </div>
          <div>
            <input 
              type="checkbox"
              defaultChecked={numbersAllow}
              onClick={()=>{setNumbersAllow(prev => !prev)}}
              name="num"
              id='num'
              />
            <label htmlFor="num">Numbers</label>
          </div>
          <div>
            <input 
              type="checkbox"
              defaultChecked={charAllow}
              onClick={()=>{setCharAllow(prev => !prev)}}
              name="char"
              />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
