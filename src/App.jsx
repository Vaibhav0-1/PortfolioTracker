import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [assets, setAssets] = useState([]);
  const [address, setAddress] = useState('0x209c8bbE2454257Eb1A8E630f59f4b1b50a98543');

  const fetchAssets = async () => {
    try {
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&exclude_spam=true&exclude_unlverified_contracts=true`,
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY
          },
        }
      );
      const data = await response.json();
      setAssets(data.result);
    } catch (error) {
      console.log("Error Fetching Assets", error);
    }
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleButtonClick = () => {
    fetchAssets();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="App">
      <h1>Portfolio Tracker</h1>
      <div className="form-container">
        <input 
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter Wallet Address"
          className="search-bar"
        />
        <button 
          onClick={handleButtonClick} 
          className="custom-button"
        >
          Fetch Assets
        </button>
      </div>
      <div className="table-container">
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
                  <td>{asset.usd_price?.toFixed(2)}</td>
                  <td>{asset.usd_value?.toFixed(2)}</td>
                  <td className={asset.usd_price_24hr_percent_change < 0 ? "negative" : "positive"}>
                    {asset.usd_price_24hr_percent_change?.toFixed(2)}%
                  </td>
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
    </div>
  );
}

export default App;
