import LoadInventory from './LoadInventory.js';

function Inventory({inventory}) {
    
    return(
        <div id="Inventory">
            <div className="title" style={{height: '50px', padding: '10px'}}>
                Equipment
            </div>
            <div id="Equipment">
                <div className="equip-column">
                    <div className="regular accessory">Accessory</div>
                    <div className="regular ring1">Ring</div>
                    <div className="lg weapon1">Weapon</div>
                </div>
                <div className="equip-column">
                    <div className="armor helmet">Helmet</div>
                    <div className="armor chestplate">Chestplate</div>
                    <div className="armor boots">Boots</div>
                </div>
                <div className="equip-column">
                    <div className="regular amulet">Amulet</div>
                    <div className="regular ring2">Ring</div>
                    <div className="lg weapon2">Off-hand</div>
                </div>
            </div>
            <div id="Storage">
                <div className="title" style={{height: '50px', paddingTop: '20px'}}>Inventory</div>
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