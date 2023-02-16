import React from 'react';
import Item from './Item';

function Backpack() {
    return (
        <div class="backpack-container">
            <div class="backpack-list">
                <div class="item-box">
                    <Item/>
                </div>
                <div class="item-box">
                    <Item/>
                </div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
                <div class="item-box"></div>
            </div>
        </div>
    )
}

export default Backpack;