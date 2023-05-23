import React, {useState, useCallback, useRef} from 'react';
import './css/index.css';
import Navbar from './components/Navbar.js';
import Content from './components/Content.js';
import Inventory from './components/Inventory.js';

function App() {
  /* Inventory */
  const [inventory, setInventory] = useState([])
  const invRef = useRef();
  const updateInventory = useCallback(inv => {
    invRef.current = inv
    setInventory(inv);
  }, [setInventory])

  /* Coins */
  const [coins, setCoins] = useState(0);
  const coinRef = useRef();

  const updateCoins = useCallback(c => {
    coinRef.current = c;
    setCoins(c)
  }, [setCoins, coins])

  /* Sell Items */
  const sellItem = (id) => {
    let removedInv = []
    for (let i = 0; i < invRef.current.length; i++) {
      if (invRef.current[i].props.info.id !== id) {
        removedInv.push(invRef.current[i]);
      } else {
        updateCoins(coinRef.current + invRef.current[i].props.stats.value);
      }
    }
    updateInventory(removedInv)
  }

  return (
    <div className="App">
        <Navbar />
        <Content 
          inventory={inventory}
          setInventory={updateInventory}
          coins={coins}
          setCoins={updateCoins}
          sellItem={sellItem}
        />
        <Inventory 
          inventory={inventory} 
          setInventory={updateInventory}
        />
    </div>
  );
}

export default App;