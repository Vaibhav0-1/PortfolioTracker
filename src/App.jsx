import React, {useState } from "react";
import './App.css';
import AssetTable from "./AssetTable";
import ChainSelector from "./ChainSelector";

function App() {

  const [selectedChains, setSelectedChains] = useState(["eth", "polygon", "bsc", "optimism", "base"]);

  const [tempAddress, setTempAddress] = useState("0x209c8bbE2454257Eb1A8E630f59f4b1b50a98543")
  const [address, setAddress] = useState(tempAddress)

  const [networth, setnetworth] = useState({})

  const fetchNetWorth =async()=>{
    try{
      const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/net-worth?chains%5B0%5D=eth&exclude_spam=true&exclude_unverified_contracts=true`,{
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY,
        }
      })
      const data = await response.json();
      setnetworth(data);
    }catch(error){

    }
  }


  const handleInputChange = (e) => {
    setTempAddress(e.target.value);
  }
  
  const handleButtonClick = (e) => {
    setAddress(tempAddress)
  }

  return (
        <div className="App">
          <h1 style={{ 
      textAlign: 'center', 
      fontSize: '2.5rem', 
      color: '#999999', 
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '1px',
      textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)' 
    }}>Portfolio Tracker</h1>
       <div className="form-container">
        <input 
          type="text"
          value={tempAddress}
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

      <ChainSelector selectedChains={selectedChains} setSelectedChains={setSelectedChains}/>
      <AssetTable address={address} selectedChains={selectedChains} />
    </div>
  );
}

export default App;