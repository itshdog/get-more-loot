import React from 'react'

function LoadEquipment({equipment}) {
    /* Initialize with null values */
    const loadEquip = []
    for (var i = 0; i < 9; i++) {
        if (i === 0) {
            loadEquip[i] = ["Accessory", null]
        } else if (i === 1) {
            loadEquip[i] = ["Helmet", null]
        } else if (i === 2) {
            loadEquip[i] = ["Amulet", null]
        } else if (i === 3) {
            loadEquip[i] = ["Gloves", null]
        } else if (i === 4) {
            loadEquip[i] = ["Chestplate", null]
        } else if (i === 5) {
            loadEquip[i] = ["Ring", null]
        } else if (i === 6) {
            loadEquip[i] = ["Weapon", null]
        } else if (i === 7) {
            loadEquip[i] = ["Boots", null]
        } else if (i === 8) {
            loadEquip[i] = ["Off-hand", null]
        } else {
            loadEquip[i] = ["Error", null]
        }
    }
    /* Replace for each real item */
    equipment.forEach((item, index) => {
        loadEquip[index][1] = item
    })
    /* Generate unique keys */
    const generateKey = (pre) => {
        return `${ pre }_${new Date().getTime()}`
    }
    /* Return items */
    return loadEquip.map((item, index) => (
        <div key={generateKey(index)} className="equip-box">
            {item[0]}
            {item[1]}
        </div>
    ));
}

export default LoadEquipment