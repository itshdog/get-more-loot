import React from 'react';
import Item from './Item';

function Equipment() {
    return (
        <div class="equip-container">
            <div class="equip-list">
                <div class='item-box' id='helmet-image'>
                    <Item/>
                </div>
                <div class='item-box' id='chest-image'>
                </div>
                <div class='item-box' id='boots-image'>
                    <Item/>
                </div>
                <div class='item-box' id='weapon-image'>
                </div>
            </div>
        </div>
    )
}

export default Equipment;