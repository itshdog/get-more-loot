import React, {useState, useCallback, useRef} from 'react';
import './css/index.css';
import Navbar from './components/Navbar.js';
import Content from './components/Content.js';
import Inventory from './components/Inventory.js';

function App() {
  /* Admin Panel Bool */
  const [admin, setAdmin] = useState(false)
  const adminRef = useRef();
  const updateAdmin = useCallback(adm => {
    adminRef.current = adm
    setAdmin(adm);
  }, [setAdmin])

  /* Statistics */
  const [stats, setStats] = useState({"enemies_killed": 0, "items_dropped": 0});
  const statRef = useRef();
  const updateStats = useCallback(stat => {
    statRef.current = stat
    setStats(stat);
  });

  /* Inventory */
  const [inventory, setInventory] = useState([])
  const invRef = useRef();
  const updateInventory = useCallback(inv => {
    invRef.current = inv
    setInventory(inv);
  }, [setInventory])

  const [isAction, setAction] = useState("Equip");
  const actionRef = useRef("Equip");
  const updateAction = useCallback(action => {
    actionRef.current = action
    setAction(action);
  }, [setAction])

  /* Drop Chance */
  const [dropChance, setDropChance] = useState(30);
  const chanceRef = useRef();
  const updateChance = useCallback(chance => {
    chanceRef.current = chance
    setDropChance(chance)
  }, [setDropChance])

  /* Respawn Point bool */
  const [RP, setRP] = useState(false);
  const RPRef = useRef();
  const updateRP = useCallback(rp => {
    RPRef.current = rp
    setRP(RP)
  }, [setRP])

  /* Item Scan Bool */
  const [itemScan, setItemScan] = useState(false);
  const itemScanRef = useRef();
  const updateItemScan = useCallback(itemScan => {
    itemScanRef.current = itemScan
    setItemScan(itemScan)
  }, [setItemScan])

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
      <Content 
          inventory={inventory}
          setInventory={updateInventory}
          equipment={equipment}
          setEquipment={updateEquipment}
          Admin={admin}
          RP={RP}
          stats={stats}
          setStats={updateStats}
          coins={coins}
          setCoins={updateCoins}
          dropChance={dropChance}
          sellItem={sellItem}
          equipItem={equipItem}
          isAction={actionRef}
          setAction={updateAction}
        />
        <div className="wrapper">
          <Navbar 
            RP={RP}
            setRP={setRP}
            Admin={admin}
            setAdmin={updateAdmin}
            statInfo={stats}
            itemScan={itemScan}
            setItemScan={setItemScan}
            coins={coins}
            setCoins={updateCoins}
            dropChance={dropChance}
            updateChance={updateChance}
          />
          <Inventory 
            itemScan={itemScan}
            setItemScan={setItemScan}
            equipRef={equipRef}
            equipment={equipment}
            setEquipment={updateEquipment}
            inventory={inventory} 
            setInventory={updateInventory}
            isAction={isAction}
            setAction={updateAction}
          />
        </div>
    </div>
  );
}

export default App;