import React from 'react'

function Networth({ netWorth }) {

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
        <h1>{ USDollar.format(netWorth.total_networth_usd) }</h1>
      
    </div>
  )
}

export default Networth
