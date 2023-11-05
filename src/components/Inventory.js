import React, {useState} from 'react';
import LoadEquipment from './LoadEquipment.js';
import LoadInventory from './LoadInventory.js';

function Inventory({itemScan, setItemScan, equipRef, equipment, inventory, isAction, setAction}) {

    const inventoryAction = (clicked) => {
        if (clicked === "Equip") {
            setAction("Equip");
            document.getElementById("equip").className = "action active-equip";
            document.getElementById("sell").className = "action";
        }
        else if (clicked === "Sell") {
            setAction("Sell");
            document.getElementById("sell").className = "action active-sell";
            document.getElementById("equip").className = "action";
        } 
        else if (clicked === "Clear") {
            setAction(null);
            document.getElementById("sell").className = "action";
            document.getElementById("equip").className = "action";
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
                        <div id="clear" className="action" onClick={() => inventoryAction("Clear")}>X</div>
                        <div id='equip' className="action active-equip" onClick={() => inventoryAction("Equip")}>
                            Equip
                        </div>
                        <div id='sell' className="action" onClick={() => inventoryAction("Sell")}>
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