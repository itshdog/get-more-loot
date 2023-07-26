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
                {entity.name} [Level {stats.level}]
                <div className="entity-count">{stats.count}/5 Enemies killed</div>
                <div className="health-bar">
                    <div className="remaining-health-bar" style={{width: hp}}></div>
                    <div className="total-health-bar">{stats.hp}/{stats.maxHP}</div>
                </div>
                <div className="stats">
                    <div className="center">Attack: {stats.attack} | Defense: {stats.defense}</div>
                    <div>Drop Chance: {entity.drop}%</div>
                </div>
                <div id="rarity-display">
                    <div className='rarity-tab rarity-Common'>Common: <br></br>{percent('Common')}%</div>
                    <div className='rarity-tab rarity-Uncommon'>Uncommon: <br></br>{percent('Uncommon')}%</div>
                    <div className='rarity-tab rarity-Rare'>Rare: <br></br>{percent('Rare')}%</div>
                    <div className='rarity-tab rarity-Epic'>Epic: <br></br>{percent('Epic')}%</div>
                    <div className='rarity-tab rarity-Elite'>Elite: <br></br>{percent('Elite')}%</div>
                    <div className='rarity-tab rarity-Legendary'>Legendary: <br></br>{percent('Legendary')}%</div>
                    <div className='rarity-tab rarity-Mythic'>Mythic: <br></br>{percent('Mythic')}%</div>
                    <div className='rarity-tab rarity-Exotic'>Exotic: <br></br>{percent('Exotic')}%</div>
                    <div className='rarity-tab rarity-Ultimate'>Ultimate: <br></br>{percent('Ultimate')}%</div>
                </div>
            </div>
        </div>
    )
}

export default Entity;