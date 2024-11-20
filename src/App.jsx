import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]=useState(false)
  const [charAllowed, setCharAllowed]=useState(false)
  const [password, setPassword]=useState('');
  const passwordGenerator=useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numberAllowed) str+='1234567890'
    if(charAllowed) str+='!@#$%^&*()-_+='

    for(let i=0; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },
  [length,numberAllowed,charAllowed,setPassword])
const passwordref=useRef(null)
const copyToClipboard=useCallback(()=>{
  passwordref.current?.select()
  passwordref.current?.setSelectionRange(0,50)
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(()=>{
    passwordGenerator()
  },
  [length,numberAllowed,charAllowed,setPassword])


  return (
    <>
    <h1 className='text-4xl text-center text-white'>Password generator</h1>
    <div className='w-full max-w-md shadow-md rounded-lg w-full mx-auto px-4 text-orange-500 bg-gary-700 '>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password} 
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}/>
      <button
      onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6} max={50}
          value={length} 
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onClick={()=>{
            setNumberAllowed((prev)=>!prev)
            
          }}
           />
           <label>numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onClick={()=>{
            setCharAllowed((prev)=>!prev)
            
          }}
           />
           <label>Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
