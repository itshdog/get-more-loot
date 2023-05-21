import React, {useState} from 'react';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
const images = importAll(require.context('../images/icons/48x48', false, /\.(png|jpe?g|svg)$/));
/* const Items = ["Iron Sword", "Iron Chestplate", "Iron Boots", "Iron Helmet", "Amulet", "Iron Ring", "Iron Shield"] */
function Item({info, stats}) {
    let itemImage = '';
    if (info.name === 'Iron Sword') {
        itemImage = images['sword_01b.png']
    } else if (info.name === 'Iron Chestplate') {
        itemImage = images['armor_01b.png']
    } else if (info.name === 'Iron Boots') {
        itemImage = images['boots_01b.png']
    } else if (info.name === 'Iron Helmet') {
        itemImage = images['helmet_01b.png']
    }  else if (info.name === 'Amulet') {
        itemImage = images['necklace_02b.png']
    }  else if (info.name === 'Iron Ring') {
        itemImage = images['ring_01b.png']
    }  else if (info.name === 'Iron Shield') {
        itemImage = images['shield_01b.png']
    }
    return(
        <div className='item'>
            <div className={'img-container ' + info.rarity}><img src={itemImage} alt={info.name}></img></div>
            <div className='tooltip'>
                <div className='tooltip-title'>{info.name}</div>
                <div className='tooltip-rarity'>{info.rarity} {info.type}</div>
                <div className='tooltip-stat'>+{stats.base} {stats.type}</div>
                <div className='tooltip-value'>Sell Value {stats.value}<img className="coin" src={images['coin_01d.png']} alt="Coins"></img></div>
                <button>Equip</button><button>Sell</button>
            </div>
        </div>
    )
}

export default Item;