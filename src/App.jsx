import React, { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [assets, setAssets] = useState([]);
  const [address, setAddress] = useState("");

  const fetchAssets = async() =>{
    try{
      const response = await fetch('https://deep-index.moralis.io/api/v2.2/wallets/0x3d0b45Bc914457E027094E509eBE631E356cbB03/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true',{
        method:"GET",
        headers: {
          "Content-Type":"application/json",
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
      <div className='App'>
        <h1>Portfolio Tracker</h1>
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Value</th>
              <th>24hr Change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset)=>{
              <tr key={asset.token_address}>
                <td><img src={asset.thumbnail} alt={asset.name} className='asset-logo'/></td>
                <td>{asset.name}</td>
                <td>{asset.usd_price}</td>
                <td>{asset.usd_value}</td>
                <td>{asset.usd_price_24hr_percent_change}</td>
              </tr>
            })}
          </tbody>
        </table>
      
      </div>
  )
}

export default App
