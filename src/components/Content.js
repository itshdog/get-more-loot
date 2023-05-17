import Entity from './Entity.js';
import Player from './Player.js';
import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png'

function Content() {

    /* Player Variables */
    const [playerLevel, setPlayerLevel] = useState(1);
    const [playerATK, setPlayerATK] = useState(10);
    const [playerDEF, setPlayerDEF] = useState(5);
    const [playerHP, setPlayerHP] = useState(100);
    const [playerMAXHP, setPlayerMAXHP] = useState(100);
    const [playerXP, setPlayerXP] = useState(0);
    const [playerMAXXP, setPlayerMAXXP] = useState(20);
    /* Entity Variables */
    const [entityName, setEntityName] = useState('');
    const [entityLevel, setEntityLevel] = useState(1);
    const [entityATK, setEntityATK] = useState(6);
    const [entityDEF, setEntityDEF] = useState(1);
    const [entityHP, setEntityHP] = useState(100);
    const [entityMAXHP, setEntityMAXHP] = useState(100);
    const [entityCOUNT, setEntityCOUNT] = useState(0);

    const [defenseColor, setDefenseColor] = useState('');

    const Enemies = ["Zombie", "Skeleton", "Spider", "Goblin", "Soldier", "Troll", "Cultist"]

    /* On load, generate random enemy name */
    useEffect(() => {
        setEntityName(Enemies[(Math.random() * Enemies.length | 0)])
    }, [])

    /* In-game ticks */
    useEffect(() =>{
        const interval = setInterval(() => {
            /* Player dies */
            if (playerHP <= 0 + entityATK - playerDEF) {
                setPlayerHP(0);
                console.log("You are dead");
            /* Entity dies */
            } else if (entityHP <= 0 + playerATK - entityDEF) {
                giveXP();
                spawnEntity();
            /* Entity alive */
            } else {
                hitEntity();
                hitPlayer();
                /* console.log("Hit entity for: " + playerATK + " dmg"); */
            }
        }, 1000);
        return () => { clearInterval(interval); };
    }, [entityHP, entityDEF, entityATK, playerATK, playerDEF, playerXP]);

    const spawnEntity = () => {
        setEntityHP(entityMAXHP);
        setEntityName(Enemies[(Math.random() * Enemies.length | 0)])
        /* Level up */
        if (entityCOUNT >= 4) {
            setEntityLevel(entityLevel + 1);
            setEntityDEF(entityDEF + 1);
            setEntityATK(entityATK + 1);
            setEntityCOUNT(0);
            /* Notify that player can't do damage */
            if (entityDEF + 5 > playerATK) {
                setDefenseColor('red');
            } else {
                setDefenseColor('');
            }
        /* Count up */
        } else {
            setEntityCOUNT(entityCOUNT + 1);
        }
    }

    const giveXP = () => {
        const xp = Math.floor(Math.random() * 6);
        /* Level up */
        if (playerXP + xp > playerMAXXP) {
            setPlayerLevel(playerLevel + 1);
            setPlayerXP(0);
            setPlayerATK(playerATK + 1);
            setPlayerDEF(playerDEF + 1);
            console.log('Level up!')
        /* Give xp */
        } else {
            setPlayerXP(playerXP + xp);
            console.log(xp + ' xp dropped from ' + entityName);
        }
    }

    const hitEntity = () => {
        setEntityHP(Math.min(entityHP, entityHP - (playerATK - entityDEF)));
    }

    const hitPlayer = () => {
        setPlayerHP(Math.min(playerHP, playerHP - (entityATK - playerDEF)));
    }

    const startOver = () => {
        setEntityName(Enemies[(Math.random() * Enemies.length | 0)])
        setEntityHP(entityMAXHP);
        setEntityLevel(1);
        setEntityCOUNT(0);
        setEntityATK(5);
        setEntityDEF(1);
        setDefenseColor('');

        setPlayerHP(playerMAXHP);
    }

    /* ADMIN COMMANDS */
    const fullReset = () => {
        setPlayerLevel(1);
        setPlayerXP(0);
        setPlayerATK(10);
        setPlayerDEF(5);
        startOver();
    }

    return(
        <div id="Content">
            <div id='logo'>
                <img src={logo} alt="Get More Loot"></img>
            </div>
            <Player 
                stats={{level: playerLevel, attack: playerATK, defense: playerDEF, hp: playerHP, maxHP: playerMAXHP, xp: playerXP, maxXP: playerMAXXP}}
            />
            <Entity 
                entity={{name: entityName}}
                stats={{level: entityLevel, count: entityCOUNT, attack: entityATK, defense: entityDEF, hp: entityHP, maxHP: entityMAXHP}}
                colors={{defense: defenseColor}}
            />
            <div id="Restart">
                <button id="restart-button" onClick={startOver}>
                    Start Over
                </button>
            <div/>
            <div id="Admin">
            <div className="panel" style={{marginTop: '20px'}}>
                <div className='title' style={{padding: '5px'}}>Admin Panel</div>
                <div className='admin-buttons'>
                    <div className='admin-columns'>
                        <button onClick={fullReset}>Full reset</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button onClick={giveXP}>Give xp</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button>-----------</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button>-----------</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Content;