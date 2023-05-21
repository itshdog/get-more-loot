import React, {useState, useCallback} from 'react';
import './css/index.css';
import Navbar from './components/Navbar.js';
import Content from './components/Content.js';
import Inventory from './components/Inventory.js';

function App() {
  const [inventory, setInventory] = useState([])
  const updateInventory = useCallback(inv => {
    setInventory(inv);
  }, [setInventory])

  return (
    <div className="App">
        <Navbar />
        <Content 
          inventory={inventory}
          setInventory={updateInventory}
        />
        <Inventory 
          inventory={inventory} 
          setInventory={updateInventory}
        />
    </div>
  );
}

export default App;