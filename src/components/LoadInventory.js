import React from 'react'

function LoadInventory({inventory}) {
    /* Initialize with null values */
    const loadINV = []
    for (var i = 0; i < 24; i++) {
        loadINV[i] = null
    }
    /* Replace for each real item */
    inventory.forEach((item, index) => {
        if (index < 24) {
            loadINV[index] = item
        }
        loadINV[index] = item
    })
    /* Generate unique keys */
    const generateKey = (pre) => {
        return `${ pre }_${new Date().getTime()}`
    }
    /* Return items */
    return loadINV.map((item, index) => (
        <div key={generateKey(index)} className="item-box">
            {item}
        </div>
    ));
}

export default LoadInventory