import React, { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [assets, setAssets] = useState([]);
  const [address, setAddress] = useState('0x209c8bbE2454257Eb1A8E630f59f4b1b50a98543');

  const fetchAssets = async() =>{
    try{
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true`,
        {
        method:'GET',
        headers: {
          "Content-Type":"application/json",
          "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY
        },
      });
      const data  = await response.json();
      setAssets(data.result)
      }catch(error){
        console.log("Error Fetching Assets", error);
    }
  }

  useEffect(()=>{
    fetchAssets(address);
  },[address]);

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
            
          {assets.length > 0 ? (
            assets.map((asset) => (
              <tr key={asset.token_address}>
                <td>
                  <img
                    src={asset.thumbnail}
                    alt={asset.name}
                    className="asset-logo"
                  />
                </td>
                <td>{asset.name}</td>
                <td>{asset.usd_price}</td>
                <td>{asset.usd_value}</td>
                <td>{asset.usd_price_24hr_percent_change}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No assets available</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default App
