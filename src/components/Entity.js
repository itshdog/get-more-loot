import React from 'react';

function Entity({stats, colors, entity}) {
    const percentage = (stats.hp / stats.maxHP) * 100;
    const hp = percentage + "%";

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
                    <div>Attack: {stats.attack}</div>
                    <div style={{color: colors.defense}}>Defense: {stats.defense}</div>
                    <div>Drop Chance: {entity.drop}%</div>
                </div>
            </div>
        </div>
    )
}

export default Entity;