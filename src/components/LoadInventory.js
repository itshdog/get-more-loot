import React from 'react'

function LoadInventory({itemScan, equipment, inventory}) {
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
    return loadINV.map((item, index) => {
        if (item === null || itemScan === false) {
            return (
                <div key={generateKey(index)} className="item-box">
                    {item}
                </div>
            )
        } else {
            let equip = equipment.current
            for (let i = 0; i < equip.length; i++) {
                if (equip[i] !== undefined) {
                    /*console.log(equip[i].props.info.type)*/
                    /*console.log(item.props.info.type)*/
                    if (item.props.info.type === equip[i].props.info.type && item.props.stats.base > equip[i].props.stats.base)
                        return (
                            <div key={generateKey(index)} className="item-box highlighted">
                                {item}
                            </div>
                        )
                }
            }
            return (
                <div key={generateKey(index)} className="item-box">
                    {item}
                </div>
            )
        }
    });
}

export default LoadInventory