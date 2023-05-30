import LoadEquipment from './LoadEquipment.js';
import LoadInventory from './LoadInventory.js';

function Inventory({equipment, inventory}) {
    
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
                <div className="title" style={{height: '30px'}}>Inventory</div>
                <div id="storage-container">
                    <LoadInventory
                        inventory={inventory}
                    />
                </div>
            </div>
        </div>
    )
}

export default Inventory;