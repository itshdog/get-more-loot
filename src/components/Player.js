import React from 'react';
import Coin from '../images/icons/48x48/coin_01d.png'

function Player({stats}) {
    const percentage = (stats.hp / stats.maxHP) * 100;
    const hp = percentage + "%";
    const xpPercent = (stats.xp / stats.maxXP) * 100;
    const xp = xpPercent + "%";

    return(
        <div id="Player">
            <div className="panel">
                Player [Level {stats.level}]
                <div className="player-coins">{stats.coins.toLocaleString()}<img className="coin-count" src={Coin} alt="Coins"></img></div>
                <div className="xp-bar">
                    <div className="remaining-xp-bar" style={{width: xp}}></div>
                </div>
                <div className="health-bar">
                    <div className="remaining-health-bar" style={{width: hp}}></div>
                    <div className="total-health-bar">{stats.hp}/{stats.maxHP}</div>
                </div>
                <div classname="stats">
                    <div>Attack: {stats.attack}</div>
                    <div>Defense: {stats.defense}</div>
                </div>
            </div>
        </div>
    )
}

export default Player;