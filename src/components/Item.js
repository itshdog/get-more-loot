import React from 'react';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
const images = importAll(require.context('../images/icons/48x48', false, /\.(png|jpe?g|svg)$/));
/* const Items = ["Iron Sword", "Iron Chestplate", "Iron Boots", "Iron Helmet", "Amulet", "Iron Ring", "Iron Shield"] */
function Item({equipItem, sellItem, drop, info, stats}) {
    let itemImage = '';
    if (info.name === 'Iron Sword') {
        itemImage = images['sword_01b.png']
    } else if (info.name === 'Gold Sword') {
        itemImage = images['sword_01d.png']
    } else if (info.name === 'Iron Chestplate') {
        itemImage = images['armor_01b.png']
    } else if (info.name === 'Iron Boots') {
        itemImage = images['boots_01b.png']
    } else if (info.name === 'Iron Helmet') {
        itemImage = images['helmet_01b.png']
    } else if (info.name === 'Wizard Hat') {
        itemImage = images['hat_01a.png']
    } else if (info.name === 'Amulet') {
        itemImage = images['necklace_02b.png']
    } else if (info.name === 'Protection Amulet') {
        itemImage = images['necklace_02d.png']
    } else if (info.name === 'Iron Ring') {
        itemImage = images['ring_01b.png']
    } else if (info.name === 'Gold Ring') {
        itemImage = images['ring_01d.png']
    } else if (info.name === 'Iron Shield') {
        itemImage = images['shield_01b.png']
    } else if (info.name === 'Iron Tower Shield') {
        itemImage = images['shield_02b.png']
    } else if (info.name === 'Iron Gloves') {
        itemImage = images['gloves_01b.png']
    } else if (info.name === 'Armor Tome') {
        itemImage = images['book_05a.png']
    } else if (info.name === 'Damage Tome') {
        itemImage = images['book_06d.png']
    }
    return(
        <div className={'item ' + info.rarity}>
            <div className='img-container'><img src={itemImage} alt={info.name}></img></div>
            <div className='tooltip'>
                <div className='tooltip-title'>{info.name}<div>Level {drop.level}</div></div>
                <div className={'tooltip-rarity-' + info.rarity}>{info.rarity} {info.type}<div style={{float: 'right'}}>ID: {info.id}</div></div>
                <div className={'tooltip-drop'}>{drop.enemy}</div>
                <div className='tooltip-stat'>+{stats.base} {stats.type}</div>
                <div className='tooltip-value'>Sell Value {stats.value}<img className="coin" src={images['coin_01d.png']} alt="Coins"></img></div>
                <button onClick={() => equipItem(info.id, info.type)}>Equip</button><button onClick={() => sellItem(info.id)}>Sell</button>
            </div>
        </div>
    )
}

export default Item;