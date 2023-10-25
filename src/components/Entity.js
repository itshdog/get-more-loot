import React from 'react';

function Entity({setEntityHP, stats, entity, dropRates}) {
    const percentage = (stats.hp / stats.maxHP) * 100;
    const hp = percentage + "%";

    function percent(rarity) {
        return (dropRates.rarities[rarity] / dropRates.weight * 100).toFixed(2)
    }

    return(
        <div id="Entity">
            <div className="panel">
                <div id="entity-name"><i class={"fa-solid fa-crown " + entity.boss}></i> {" " + entity.name}</div>
                <div id="entity-level">[Level {stats.level}]</div>
                <div className="health-bar">
                    <div className="remaining-health-bar" style={{width: hp}}></div>
                    <div className="total-health-bar">{stats.hp}/{stats.maxHP}</div>
                </div>
                <div className="stats">
                    <div className="entity-count">{stats.count}/5 Enemies killed</div>
                    <div className="center">Attack: {stats.attack} | Defense: {stats.defense}</div>
                    <div>Drop Chance: {entity.drop}%</div>
                </div>
                <div id="rarity-display">
                    <div className='rarity-tab Common'>Common: <br></br>{percent('Common')}%</div>
                    <div className='rarity-tab Uncommon'>Uncommon: <br></br>{percent('Uncommon')}%</div>
                    <div className='rarity-tab Rare'>Rare: <br></br>{percent('Rare')}%</div>
                    <div className='rarity-tab Epic'>Epic: <br></br>{percent('Epic')}%</div>
                    <div className='rarity-tab Elite'>Elite: <br></br>{percent('Elite')}%</div>
                    <div className='rarity-tab Legendary'>Legendary: <br></br>{percent('Legendary')}%</div>
                    <div className='rarity-tab Mythic'>Mythic: <br></br>{percent('Mythic')}%</div>
                    <div className='rarity-tab Exotic'>Exotic: <br></br>{percent('Exotic')}%</div>
                    <div className='rarity-tab Ultimate'>Ultimate: <br></br>{percent('Ultimate')}%</div>
                </div>
            </div>
        </div>
    )
}

export default Entity;