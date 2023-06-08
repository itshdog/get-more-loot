import Entity from './Entity.js';
import Player from './Player.js';
import Item from './Item.js';
import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png'

function Content({inventory, setInventory, equipment, setEquipment, RP, setRP, coins, setCoins, dropChance, updateChance, sellItem, equipItem}) {

    /* Attack */
    const [baseATK, setBaseATK] = useState(5);
    const [equipATK, setEquipATK] = useState(0);
    const [playerATK, setPlayerATK] = useState(0);
    /* Defense */
    const [baseDEF, setBaseDEF] = useState(5);
    const [equipDEF, setEquipDEF] = useState(0);
    const [playerDEF, setPlayerDEF] = useState(0);
    /* Player */
    const [playerLevel, setPlayerLevel] = useState(1);
    const [playerHP, setPlayerHP] = useState(100);
    const [playerMAXHP, setPlayerMAXHP] = useState(100);
    const [playerXP, setPlayerXP] = useState(0);
    const [playerMAXXP, setPlayerMAXXP] = useState(30);
    const [maxRestart, setMaxRestart] = useState(1);
    const [currRestart, setCurrRestart] = useState(1);
    /* Entity */
    const [entityName, setEntityName] = useState('');
    const [entityLevel, setEntityLevel] = useState(1);
    const [entityATK, setEntityATK] = useState(3);
    const [entityDEF, setEntityDEF] = useState(2);
    const [entityHP, setEntityHP] = useState(100);
    const [entityMAXHP, setEntityMAXHP] = useState(100);
    const [entityCOUNT, setEntityCOUNT] = useState(0);

    /* Item Variables */
    const [defenseColor, setDefenseColor] = useState('');

    /* Enemy names */
    const Names = ['Banechild', 'Thunderthing', 'Soulmirage', 'Steamsoul', 'Auracreep', 'Vexmutant', 'Terrorbug', 'Metalcrackle', 'Soilspawn', 'Dreamserpent', 'Vilegolem', 'Shadowwoman', 'Webspawn', 'Infernalghoul', 'Bowelmutant', 'Glowsnake', 'Acidscreamer', 'Toxinhound', 'Steamteeth', 'Infernobrood', 'Emberfoot', 'Webstrike', 'Rustvine', 'Barbmask', 'Slagwing', 'Vortexfiend', 'Thunderhand', 'Blazeflayer', 'Boneseeker', 'Spiritstep', 'Bladefigure', 'Thundertree', 'Murksoul', 'Boulderboy', 'Cloudseeker', 'Slagfigure', 'Frostsnake', 'Smokewing', 'Moldhound', 'Bladetaur', 'Gutsoul', 'Fetidhood', 'Smokeboy', 'Frightbrute', 'Banepaw', 'Cursestrike', 'Grieveface', 'Terrorlich', 'Murkbug', 'Fogmirage', 'Vileman', 'Sorrowbug']
    const Enemies = ['Zombie', 'Skeleton', 'Spider', 'Goblin', 'Soldier', 'Troll', 'Cultist', 'Vampire', 'Witch', 'Wizard', 'Warlock', 'Warrior', 'Human', 'Alien', 'Baby', 'Android', 'Robot', 'Martian', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-elf', 'Centaur', 'Fairy', 'Goliath', 'Orc', 'Minotaur']
    const Adjectives = ['Common', 'Worst', 'Old', 'Great', 'Greatest', 'Dangerous', 'Mortal', 'Bitter', 'Real', 'Natural', 'Formidable', 'Public', 'Powerful', 'Foreign', 'Last', 'Implacable', 'Deadly', 'Potential', 'Personal', 'Chief', 'Main', 'Ancient', 'Bitterest', 'Inveterate', 'External', 'Open', 'Former', 'Traditional', 'Alien', 'Hereditary', 'Principal', 'Avowed', 'Declared', 'Victorious', 'Terrible', 'Superior', 'Invisible', 'Unseen', 'Cruel', 'Secret', 'Mine', 'Hated', 'Active', 'Internal', 'Arch', 'Fallen', 'Invading', 'Dead', 'Deadliest', 'Vanquished', 'Eternal', 'Unknown', 'Worse', 'Irreconcilable', 'Armed', 'Relentless', 'Hidden', 'Biggest', 'Conquered', 'Insidious', 'Ruthless', 'Fierce', 'Generous', 'Imaginary', 'Brave', 'Savage', 'Outside', 'Ultimate', 'Treacherous', 'Violent', 'Elusive', 'Evil', 'Stronger', 'Communist']
    /* Item names */
    const Items = ["Iron Sword", "Iron Chestplate", "Iron Boots", "Iron Helmet", "Amulet", "Iron Ring", "Iron Shield", "Iron Gloves", "Damage Tome", "Gold Sword", "Wizard Hat", "Protection Amulet", "Gold Ring", "Iron Tower Shield", "Armor Tome"]

    /* On load, generate random enemy name */
    useEffect(() => {
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
    }, [])

    /* In-game ticks */
    useEffect(() =>{
        const interval = setInterval(() => {
            /* Player dies */
            if (playerHP <= 0 + entityATK - playerDEF || playerHP === 0) {
                setPlayerHP(0);
                return
            /* Entity dies */
            } else if (entityHP <= 0 + playerATK) {
                giveDrops();
                giveLoot();
                spawnEntity();
            /* Entity alive */
            } else {
                hitEntity();
                hitPlayer();
            }
        }, 500);
        return () => { clearInterval(interval); };
    }, [entityHP, entityDEF, entityATK, playerATK, playerDEF, playerXP, playerHP]);

    /* Load equipment attack and defense */
    useEffect(() => {
        /* Set totals */
        let newEquipATK = 0
        let newEquipDEF = 0
        for (let i = 0; i < equipment.length; i++) {
            /* If no equipment, continue */
            if (equipment[i] === undefined) {
                continue;
            }
            /* Else, increase corresponding stat total */
            if (equipment[i].props.stats.type === "Damage") {
                newEquipATK += equipment[i].props.stats.base
            } else if (equipment[i].props.stats.type === "Armor") {
                newEquipDEF += equipment[i].props.stats.base
            }
        }
        /* Set new equipment stats */
        setEquipATK(newEquipATK);
        setEquipDEF(newEquipDEF);
    /* Update whenever equipment chances */
    }, [equipment])

    /* Update total/player attack and defense */
    useEffect(() => {
        setPlayerATK(baseATK + equipATK);
        setPlayerDEF(baseDEF + equipDEF);
    }, [baseATK, baseDEF, equipATK, equipDEF])

    /* Level up maxRestart at level 6, level 11, level 16, etc */
    useEffect(() => {
        if ((entityLevel - 1) % 5 === 0 && maxRestart < entityLevel)  {
            setMaxRestart(entityLevel)
        }
    }, [entityLevel])

    /* Chance to drop item */
    const giveLoot = () => {
        let random = Math.floor(Math.random() * 100);
        if (random <= (100 - dropChance)) {
            return
        }
        /* Give if available inventory space */
        if (inventory.length < 24) {
            /* Generate name and random stats */
            let itemRarity = ""
            let itemType = ""
            let statBase = 2
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
            } else if (itemName === "Gold Sword") {
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
            } else if (itemName === "Wizard Hat") {
                statType = "Damage"
                itemType = "helmet"
            } else if (itemName === "Amulet") {
                statType = "Damage"
                itemType = "amulet"
            } else if (itemName === "Protection Amulet") {
                statType = "Armor"
                itemType = "amulet"
            } else if (itemName === "Iron Ring") {
                statType = "Damage"
                itemType = "ring"
            } else if (itemName === "Gold Ring") {
                statType = "Armor"
                itemType = "ring"
            } else if (itemName === "Iron Shield") {
                statType = "Armor"
                itemType = "off-hand"
            } else if (itemName === "Iron Tower Shield") {
                statType = "Armor"
                itemType = "off-hand"
            } else if (itemName === "Iron Gloves") {
                statType = "Armor"
                itemType = "gloves"
            } else if (itemName === "Damage Tome") {
                statType = "Damage"
                itemType = "accessory"
            } else if (itemName === "Armor Tome") {
                statType = "Armor"
                itemType = "accessory"
            }

            /* Load loot into inventory array */
            let id = parseInt(Math.floor(Math.random() * 10000))

            const newLoot = [
                ...inventory,
                <Item 
                    equipItem={equipItem}
                    sellItem={sellItem}
                    drop={{enemy: entityName, level: entityLevel}}
                    info={{name: itemName, id: id, rarity: itemRarity, type: itemType}}
                    stats={{base: (Math.round(statBase * Math.pow(1.2, entityLevel - 1))), type: statType, value: (Math.round(value * Math.pow(1.2, entityLevel - 1)))}}
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
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
        /* Level up after 5 enemies killed*/
        if (entityCOUNT >= 4) {
            /* SPAWN BOSS */
            let bossHP = Math.round(entityMAXHP * 4);
            let bossATK = Math.round(entityATK * 2);
            let bossDEF = Math.round(entityDEF * 2);
            if (entityLevel%5 === 4) {
                setEntityName("BOSS: " + entityName);
                setEntityMAXHP(bossHP);
                setEntityHP(bossHP);
                setEntityATK(bossATK);
                setEntityDEF(bossDEF);
                setEntityCOUNT(5);

            /* SPAWN REGULAR ENEMY */
            } else {
                console.log("ENTITY LEVEL: " + entityLevel)
                if (entityLevel%5 === 0) { 
                    console.log("Restore from boss");
                    let HP = Math.round((bossHP / 4) * 1.2)
                    let ATK = Math.round(Math.round((bossATK / 2) * 1.25))
                    let DEF = Math.round(Math.round((bossDEF / 2) * 1.25))
                    setEntityMAXHP(Math.ceil(HP/4));
                    setEntityHP(Math.ceil(HP/4));
                    setEntityDEF(Math.ceil(DEF/2));
                    setEntityATK(Math.ceil(ATK/2));
                    setEntityCOUNT(0);
                } else {
                    console.log("Spawn regular enemy");
                    let HP = Math.round(entityMAXHP * 1.2)
                    let ATK = Math.max((entityATK + 2), Math.round(entityATK * (1.25)))
                    let DEF = Math.max((entityDEF + 2), Math.round(entityDEF * (1.25)))
                    setEntityMAXHP(HP);
                    setEntityHP(HP);
                    setEntityDEF(DEF);
                    setEntityATK(ATK);
                    setEntityCOUNT(0);
                }
            }
            setEntityLevel(entityLevel + 1);
        /* Count up if 1-4 enemies killed*/
        } else {
            setEntityHP(entityMAXHP);
            setEntityCOUNT(entityCOUNT + 1);
        }
    }

    const giveDrops = () => {
        /* Random 0-6 xp + 1.18^level * 3 */
        /* Example: 5 random XP + 1.18^level 10 * 3 = 20xp for a level 10 enemy */
        let xp = Math.floor((Math.random() * 6) + (3 * Math.pow(1.18, entityLevel - 1)));
        /* Random 0-4 coins + 1.18^level * 2 */
        /* Example: 2 random coins + 1.18^level 10 * 2 = 12 coins for a level 10 enemy */
        let coinDrop = Math.floor((Math.random() * 4) + (2 * Math.pow(1.18, entityLevel - 1)));
        setCoins(coins + coinDrop);
        /* Level up */
        if (playerXP + xp > playerMAXXP) {
            setPlayerLevel(playerLevel + 1);
            setPlayerXP(0);
            setPlayerMAXXP(Math.round(playerMAXXP * 1.17))
            let newHP = Math.round(playerMAXHP * 1.17)
            setPlayerMAXHP(newHP);
            setPlayerHP(playerHP + (newHP - playerMAXHP));
            setBaseATK(Math.round(baseATK * 1.17));
            setBaseDEF(Math.round(baseDEF * 1.17));
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
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
        setEntityMAXHP(Math.round(100 * Math.pow(1.2, currRestart  - 1)));
        setEntityHP(Math.round(100 * Math.pow(1.2, currRestart  - 1)));
        setEntityLevel(currRestart);
        setEntityCOUNT(0);
        if (currRestart >= 6) {
            setEntityATK(Math.round(11 * (Math.pow(1.25, currRestart - 5))));
            setEntityDEF(Math.round(10 * (Math.pow(1.25, currRestart - 5))));
        } else {
            setEntityATK(3);
            setEntityDEF(2);
        }
        setDefenseColor('');

        setPlayerHP(playerMAXHP);
    }

    const incRestart = () => {
        if (currRestart + 5 <= maxRestart) {
            setCurrRestart(currRestart + 5);
        }
    }

    const decRestart = () => {
        if (currRestart - 5 >= 1) {
            setCurrRestart(currRestart - 5);
        }
    }

    /* ADMIN COMMANDS */
    const fullReset = () => {
        setPlayerLevel(1);
        setPlayerXP(0);
        setBaseATK(5);
        setBaseDEF(5);
        startOver();
        clearInv();
        setCoin(0);
    }
    const clearInv = () => {
        setInventory([]);
    }
    const clearEquip = () => {
        setEquipment([]);
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
                equip={{attack: playerATK - baseATK, defense: playerDEF - baseDEF,}}
                base={{attack: baseATK, defense: baseDEF}}
            />
            <Entity 
                entity={{name: entityName, drop: dropChance}}
                stats={{level: entityLevel, count: entityCOUNT, attack: entityATK, defense: entityDEF, hp: entityHP, maxHP: entityMAXHP}}
                colors={{defense: defenseColor}}
            />
            <div id="Restart">
                { RP ? 
                    <div>
                    <div>Level {currRestart}</div>
                    <button onClick={decRestart}>Less</button>
                    <button id="restart-button" onClick={() => startOver(currRestart)}>
                        Start Over
                    </button>
                    <button onClick={incRestart}>More</button>
                    </div> 
                    :
                    <button id="restart-button" onClick={() => startOver(currRestart)}>
                    Start Over
                    </button>
            }
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
                        <button onClick={clearEquip}>Clear Equipment</button>
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