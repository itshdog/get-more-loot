import React, {useState} from 'react';
import LoadEquipment from './LoadEquipment.js';
import LoadInventory from './LoadInventory.js';

function Inventory({itemScan, setItemScan, equipRef, equipment, inventory, isAction, setAction}) {

    const [actionBool, setActionBool] = useState(true);
    const inventoryAction = (clicked) => {
        if (clicked === "Equip") {
            setAction("Equip");
            setActionBool(true);
            console.log("set equip");
        }
        else if (clicked === "Sell") {
            setAction("Sell");
            setActionBool(false);
            console.log("set sell");
        }
    }
    
    return(
        <div id="Inventory">
            <div className="title" style={{height: '50px', padding: '10px'}}>
                Equipment
            </div>
            <div id="Equipment">
                <LoadEquipment
                    equipment={equipment}
                />
            </div>
            <div id="Storage">
                <div id="inventory-holder" className="title">
                    <div id="inventory-label">Inventory</div>
                    <div id='action-buttons'>
                        <div id='equip' className={actionBool ? "action active-equip" : "action"} onClick={() => inventoryAction("Equip")}>
                            Equip
                        </div>
                        <div id='sell' className={actionBool ? "action" : "action active-sell"} onClick={() => inventoryAction("Sell")}>
                            Sell
                        </div>
                    </div>
                </div>
                <div id="storage-container">
                    <LoadInventory
                        itemScan={itemScan}
                        equipment={equipRef}
                        inventory={inventory}
                    />
                </div>
            </div>
        </div>
    )
}

export default Inventory;