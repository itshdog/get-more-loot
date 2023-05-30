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

  /* Equipment */
  const [equipment, setEquipment] = useState([])
  const equipRef = useRef();
  equipRef.current = equipment
  const updateEquipment = useCallback(equip => {
    equipRef.current = equip
    setEquipment(equip)
  }, [setEquipment])

  /* Coins */
  const [coins, setCoins] = useState(0);
  const coinRef = useRef(0);

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

  const equipItem = (id, type) => {
    let removedInv = []
    for (let i = 0; i < invRef.current.length; i++) {
      /* Keep all original items in the inventory */
      if (invRef.current[i].props.info.id !== id) {
        removedInv.push(invRef.current[i]);
      /* Create new arrary of Equipment */
      } else {
        const newEquip = []
        /* Keep all original equipment */
        for (let j = 0; j < equipRef.current.length; j++) {
          if (j < 9) {
            newEquip.push(equipRef.current[j]);
          }
        }
        /* Add new equipment if there is available equipment space */
        console.log("Equipping " + type + " item")
        if (type === 'accessory') {
          if (newEquip[0] !== undefined) {
            removedInv.push(newEquip[0])
          }
          newEquip[0] = invRef.current[i]
        } else if (type === 'helmet') {
          if (newEquip[1] !== undefined) {
            removedInv.push(newEquip[1])
          }
          newEquip[1] = invRef.current[i]
        } else if (type === 'amulet') {
          if (newEquip[2] !== undefined) {
            removedInv.push(newEquip[2])
          }
          newEquip[2] = invRef.current[i]
        } else if (type === 'gloves') {
          if (newEquip[3] !== undefined) {
            removedInv.push(newEquip[3])
          }
          newEquip[3] = invRef.current[i]
        } else if (type === 'chestplate') {
          if (newEquip[4] !== undefined) {
            removedInv.push(newEquip[4])
          }
          newEquip[4] = invRef.current[i]
        } else if (type === 'ring') {
          if (newEquip[5] !== undefined) {
            removedInv.push(newEquip[5])
          }
          newEquip[5] = invRef.current[i]
        } else if (type === 'sword') {
          if (newEquip[6] !== undefined) {
            removedInv.push(newEquip[6])
          }
          newEquip[6] = invRef.current[i]
        } else if (type === 'boots') {
          if (newEquip[7] !== undefined) {
            removedInv.push(newEquip[7])
          }
          newEquip[7] = invRef.current[i]
        } else if (type === 'off-hand') {
          if (newEquip[8] !== undefined) {
            removedInv.push(newEquip[8])
          }
          newEquip[8] = invRef.current[i]
        } else {
          removedInv.push(invRef.current[i]);
        }
        updateEquipment(newEquip);
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
          equipment={equipment}
          setEquipment={updateEquipment}
          coins={coins}
          setCoins={updateCoins}
          sellItem={sellItem}
          equipItem={equipItem}
        />
        <Inventory 
          equipment={equipment}
          setEquipment={updateEquipment}
          inventory={inventory} 
          setInventory={updateInventory}
        />
    </div>
  );
}

export default App;