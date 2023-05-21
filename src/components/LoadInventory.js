import React from 'react'

function LoadInventory({inventory}) {
    const loadINV = []
    for (var i = 0; i < 24; i++) {
        loadINV[i] = null
    }
    inventory.forEach((item, index) => {
        if (index < 24) {
            loadINV[index] = item
        }
        loadINV[index] = item
    })

    return loadINV.map((item) => (
        <div className="item-box">
            {item}
        </div>
    ));
}

export default LoadInventory