import React from 'react';
import Item from './Item';

function Equipment() {
    return (
        <div class="equip-container">
            <div class="equip-list">
                <div id="helmet">
                    <div class='item-box' id='helmet-image'></div>
                    <Item/>
                </div>
                <div id="chest">
                    <div class='item-box' id='chest-image'></div>
                    <Item/>
                </div>
                <div id="boots">
                    <div class='item-box' id='boots-image'></div>
                    <Item/>
                </div>
                <div id="weapon">
                    <div class='item-box' id='weapon-image'></div>
                </div>
            </div>
        </div>
    )
}

export default Equipment;