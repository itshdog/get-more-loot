import Entity from './Entity.js';
import Player from './Player.js';
import Item from './Item.js';
import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png'

function Content({inventory, setInventory, coins, setCoins, sellItem}) {

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

    /* Item Variables */
    const [defenseColor, setDefenseColor] = useState('');

    /* Enemy names */
    const Enemies = ["Zombie", "Skeleton", "Spider", "Goblin", "Soldier", "Troll", "Cultist"]
    /* Item names */
    const Items = ["Iron Sword", "Iron Chestplate", "Iron Boots", "Iron Helmet", "Amulet", "Iron Ring", "Iron Shield"]

    /* On load, generate random enemy name */
    useEffect(() => {
        setEntityName(Enemies[(Math.random() * Enemies.length | 0)])
    }, [])

    /* In-game ticks */
    useEffect(() =>{
        const interval = setInterval(() => {
            /* Player dies */
            if (playerHP <= 0 + entityATK - playerDEF || playerHP === 0) {
                setPlayerHP(0);
                return
            /* Entity dies */
            } else if (entityHP <= 0 + playerATK - entityDEF) {
                giveDrops();
                spawnEntity();
                giveLoot();
            /* Entity alive */
            } else {
                hitEntity();
                hitPlayer();
                /* console.log("Hit entity for: " + playerATK + " dmg"); */
            }
        }, 1000);
        return () => { clearInterval(interval); };
    }, [entityHP, entityDEF, entityATK, playerATK, playerDEF, playerXP, playerHP]);

    const giveLoot = () => {
        let dropChance = Math.floor(Math.random() * 100);
        if (dropChance <= 70) {
            return
        }
        /* Give if available inventory space */
        if (inventory.length < 24) {
            /* Generate name and random stats */
            let itemRarity = ""
            let itemType = ""
            let statBase = 5
            let statType = ""
            let value = 0

            let itemName = Items[(Math.random() * Items.length | 0)]
            let chances = Math.floor(Math.random() * 100)

            if (chances < 100 && chances > 95) {
                itemRarity = "Rare"
                statBase = statBase + 2
                value = 25
            } else if (chances < 95 && chances > 70) {
                itemRarity = "Uncommon"
                statBase = statBase + 1
                value = 15
            } else {
                itemRarity = "Common"
                value = 10
            }

            if (itemName === "Iron Sword") {
                statType = "Damage"
                itemType = "sword"
            } else if (itemName === "Iron Chestplate") {
                statType = "Armor"
                itemType = "chestplate"
            } else if (itemName === "Iron Boots") {
                statType = "Armor"
                itemType = "boots"
            } else if (itemName === "Iron Helmet") {
                statType = "Armor"
                itemType = "helmet"
            } else if (itemName === "Amulet") {
                statType = "Damage"
                itemType = "amulet"
            } else if (itemName === "Iron Ring") {
                statType = "Damage"
                itemType = "ring"
            } else if (itemName === "Iron Shield") {
                statType = "Armor"
                itemType = "off-hand"
            }

            /* Load loot into inventory array */
            let id = parseInt(Math.floor(Math.random() * 10000))

            const newLoot = [
                ...inventory,
                <Item 
                    sellItem={sellItem}
                    info={{name: itemName, id: id, rarity: itemRarity, type: itemType}}
                    stats={{base: statBase, type: statType, value: value}}
                />];
            console.log("New item: " + itemName + " " + id);
            setInventory(newLoot);
        /* Else, no loot */
        } else {
            return
        }
    }

    const spawnEntity = () => {
        /* Set HP and random name */
        setEntityHP(entityMAXHP);
        setEntityName(Enemies[(Math.random() * Enemies.length | 0)])
        /* Level up after 5 enemies killed*/
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
        /* Count up if 1-4 enemies killed*/
        } else {
            setEntityCOUNT(entityCOUNT + 1);
        }
    }

    const giveDrops = () => {
        /* Generate 0-6 XP at random */
        let xp = Math.floor(Math.random() * 6);
        let coinDrop = Math.floor(Math.random() * 4);
        setCoins(coins + coinDrop);
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
            console.log(xp + ' xp and ' + coinDrop + ' coins dropped from ' + entityName);
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
        setEntityATK(6);
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
        clearInv();
        setCoin(0);
    }
    const clearInv = () => {
        setInventory([]);
    }
    const killPlayer = () => {
        setPlayerHP(0);
    }
    const killEnemy = () => {
        setEntityHP(0);
    }
    function setCoin(amt) {
        setCoins(amt);
    }

    return(
        <div id="Content">
            <div id='logo'>
                <img src={logo} alt="Get More Loot"></img>
            </div>
            <Player 
                stats={{level: playerLevel, attack: playerATK, defense: playerDEF, hp: playerHP, maxHP: playerMAXHP, xp: playerXP, maxXP: playerMAXXP, coins: coins}}
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
                        <button onClick={fullReset}>Full Reset</button>
                        <button onClick={() => setCoin(999999999)}>Set 999M coins</button>
                        <button onClick={() => setCoin(0)}>Set 0 coins</button>
                    </div>
                    <div className='admin-columns'>
                        <button onClick={giveLoot}>Give Item</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button onClick={clearInv}>Clear Inventory</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button onClick={killPlayer}>Kill Player</button>
                        <button onClick={killEnemy}>Kill entity</button>
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