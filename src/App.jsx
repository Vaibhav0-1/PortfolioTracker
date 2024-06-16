import React, { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [assets, setAssets] = useState([]);
  const [address, setAddress] = useState("");

  const fetchAssets = async() =>{
    try{
      const response = await fetch('https://deep-index.moralis.io/api/v2.2/wallets/0x3d0b45Bc914457E027094E509eBE631E356cbB03/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true',{
        method:"GET",
        headers: {
          "Content-Type":"applocation/json",
          "X-API-Key": import.meta.env.REACT_APP_MORALIS_API_KEY
        }
      })
      const data  = await response.json();
      setAssets(data.result)
      }catch(error){
        console.log("Error Fetching Assets", error);
    }
  }

  useEffect(()=>{
    fetchAssets()
  },[])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
