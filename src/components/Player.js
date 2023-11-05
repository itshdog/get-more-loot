import React from 'react';
import Coin from '../images/icons/48x48/coin_01d.png'

function Player({stats, equip, base, admin}) {
    const percentage = (stats.hp / stats.maxHP) * 100;
    const hp = percentage + "%";
    const xpPercent = (stats.xp / stats.maxXP) * 100;
    const xp = xpPercent + "%";

    const handleChange = (e) => {
        if (e.target.value === "itshdog") {
            admin.setAdmin(true);
        } else {
            admin.setAdmin(false);
        }
    }

    return(
        <div id="Player">
            <div className="panel">
                <input type="text" placeholder="Player" id="username" onChange={handleChange}></input>
                <div id="player-level">[Level {stats.level}]</div>
                <div className="player-coins">{stats.coins.toLocaleString()}<img className="coin-count" src={Coin} alt="Coins"></img></div>
                <div className="health-xp">
                    <div className="xp-bar">
                        <div className="remaining-xp-bar" style={{width: xp}}></div>
                    </div>
                    <div className="health-bar">
                        <div className="remaining-health-bar" style={{width: hp}}></div>
                        <div className="total-health-bar">{stats.hp}/{stats.maxHP}</div>
                    </div>
                </div>
                <div className="stats">
                    <div>Attack: {stats.attack} | Defense: {stats.defense}</div>
                    <div>Critical Hit Chance: {base.critChance + equip.critChance}%</div>
                    <div>Critical Hit Damage: {base.critDamage + equip.critDamage}%</div>
                </div>
            </div>
        </div>
    )
}

export default Player;