import Entity from './Entity.js';
import Player from './Player.js';
import Item from './Item.js';
import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png'

function Content({inventory, setInventory, equipment, setEquipment, Admin, setAdmin, RP, stats, setStats, coins, setCoins, dropChance, sellItem, equipItem, isAction, setAction}) {

    /* Attack */
    const [baseATK, setBaseATK] = useState(5);
    const [equipATK, setEquipATK] = useState(0);
    const [playerATK, setPlayerATK] = useState(0);
    /* Defense */
    const [baseDEF, setBaseDEF] = useState(5);
    const [equipDEF, setEquipDEF] = useState(0);
    const [playerDEF, setPlayerDEF] = useState(0);
    /* Critical Hit Damage */
    const [baseCritDamage, setBaseCritDamage] = useState(50);
    const [equipCritDamage, setEquipCritDamage] = useState(0);
    /* Critical Strike Chance */
    const [baseCritChance, setBaseCritChance] = useState(5);
    const [equipCritChance, setEquipCritChance] = useState(0);
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
    const [entityHP, setEntityHP] = useState(30);
    const [entityMAXHP, setEntityMAXHP] = useState(30);
    const [entityCOUNT, setEntityCOUNT] = useState(0);

    /* Item Variables */
    const [defenseColor, setDefenseColor] = useState('');

    /* Enemy names */
    const [bossStatus, setBossStatus] = useState('hidden');
    const Names = ['Banechild', 'Thunderthing', 'Soulmirage', 'Steamsoul', 'Auracreep', 'Vexmutant', 'Terrorbug', 'Metalcrackle', 'Soilspawn', 'Dreamserpent', 'Vilegolem', 'Shadowwoman', 'Webspawn', 'Infernalghoul', 'Bowelmutant', 'Glowsnake', 'Acidscreamer', 'Toxinhound', 'Steamteeth', 'Infernobrood', 'Emberfoot', 'Webstrike', 'Rustvine', 'Barbmask', 'Slagwing', 'Vortexfiend', 'Thunderhand', 'Blazeflayer', 'Boneseeker', 'Spiritstep', 'Bladefigure', 'Thundertree', 'Murksoul', 'Boulderboy', 'Cloudseeker', 'Slagfigure', 'Frostsnake', 'Smokewing', 'Moldhound', 'Bladetaur', 'Gutsoul', 'Fetidhood', 'Smokeboy', 'Frightbrute', 'Banepaw', 'Cursestrike', 'Grieveface', 'Terrorlich', 'Murkbug', 'Fogmirage', 'Vileman', 'Sorrowbug']
    const Enemies = ['Zombie', 'Skeleton', 'Spider', 'Goblin', 'Soldier', 'Troll', 'Cultist', 'Vampire', 'Witch', 'Wizard', 'Warlock', 'Warrior', 'Human', 'Alien', 'Baby', 'Android', 'Robot', 'Martian', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-elf', 'Centaur', 'Fairy', 'Goliath', 'Orc', 'Minotaur']
    const Adjectives = ['Common', 'Worst', 'Old', 'Great', 'Greatest', 'Dangerous', 'Mortal', 'Bitter', 'Real', 'Natural', 'Formidable', 'Public', 'Powerful', 'Foreign', 'Last', 'Implacable', 'Deadly', 'Potential', 'Personal', 'Chief', 'Main', 'Ancient', 'Bitterest', 'Inveterate', 'External', 'Open', 'Former', 'Traditional', 'Alien', 'Hereditary', 'Principal', 'Avowed', 'Declared', 'Victorious', 'Terrible', 'Superior', 'Invisible', 'Unseen', 'Cruel', 'Secret', 'Mine', 'Hated', 'Active', 'Internal', 'Arch', 'Fallen', 'Invading', 'Dead', 'Deadliest', 'Vanquished', 'Eternal', 'Unknown', 'Worse', 'Irreconcilable', 'Armed', 'Relentless', 'Hidden', 'Biggest', 'Conquered', 'Insidious', 'Ruthless', 'Fierce', 'Generous', 'Imaginary', 'Brave', 'Savage', 'Outside', 'Ultimate', 'Treacherous', 'Violent', 'Elusive', 'Evil', 'Stronger', 'Communist']

    /* On load, generate random enemy name */
    useEffect(() => {
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
    }, [])

    /* In-game ticks */
    useEffect(() =>{
        const interval = setInterval(() => {
            /* Player stays dead */
            if (playerHP == 0) {
                return
            }
            /* Player dies */
            if (playerHP <= 0 + entityATK - playerDEF) {
                let newStats = stats
                newStats['times_died'] = (newStats['times_died'] || 0) + 1
                setStats(newStats);
                setPlayerHP(0);
                return
            /* Entity dies */
            } else if (entityHP <= 0 + playerATK - entityDEF) {
                giveDrops();
                giveLoot();
                let newStats = stats
                newStats['enemies_killed'] = (newStats['enemies_killed'] || 0) + 1
                setStats(newStats);
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
        let newCritDMG = 0
        let newCritCHANCE = 0
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
            /* Increase affixes if item is NOT common, meaning 0 added stats */
            if (equipment[i].props.info.rarity !== 'Common' ) {
                /* Iterate all added affixes */
                for (var j = 0; j < equipment[i].props.affixes.length; j++) {
                    /* Incrase CritDMG and CritChance as needed */
                    if (equipment[i].props.affixes[j][0] === "Critical Hit Damage") {
                        newCritDMG += equipment[i].props.affixes[j][1]
                    } else if (equipment[i].props.affixes[j][0] === "Critical Hit Chance") {
                        newCritCHANCE += equipment[i].props.affixes[j][1]
                    }
                }
            }
        }
        /* Set new equipment stats */
        setEquipATK(newEquipATK);
        setEquipDEF(newEquipDEF);
        setEquipCritDamage(newCritDMG);
        setEquipCritChance(newCritCHANCE);
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

    /* Rarities */
    let rarities = {
        "Ultimate": 11,
        "Exotic": 25,
        "Mythic": 75,
        "Legendary": 125,
        "Elite": 250,
        "Epic": 500,
        "Rare": 1000,
        "Uncommon": 3300,
        "Common": 5500
    }
    let totalWeight = 0
    for (const [key, value] of Object.entries(rarities)) {
        totalWeight += value
    }
    useEffect(() => {
        totalWeight = 0
        for (const [key, value] of Object.entries(rarities)) {
            totalWeight += value
        }
    }, [rarities])

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
            /* Sell value */
            let value = 0
            /* Number of affixes to give */
            let modifiers = 0
            /* Affix storage */
            let affixes = []
            
            /* Item names */
            const Items = ["Iron Sword", "Iron Chestplate", "Iron Boots", "Iron Helmet", "Amulet", "Iron Ring", "Iron Shield", "Iron Gloves", "Damage Tome", "Gold Sword", "Wizard Hat", "Protection Amulet", "Gold Ring", "Iron Tower Shield", "Armor Tome"]
            let itemName = Items[(Math.random() * Items.length | 0)]
            console.log(totalWeight)
            let chances = Math.floor(Math.random() * totalWeight)
            let counter = 0

            console.log(chances)

            for (const [key, v]  of Object.entries(rarities)) {
                counter += v
                if (chances <= counter) {
                    itemRarity = key
                    if (key === 'Ultimate') {
                        value = 400
                        modifiers = 4
                        statBase += 25
                    } else if (key === 'Exotic') {
                        value = 250
                        modifiers = 4
                        statBase += 18
                    } else if (key === 'Mythic') {
                        value = 150
                        modifiers = 3
                        statBase += 13
                    } else if (key === 'Legendary') {
                        value = 75
                        modifiers = 3
                        statBase += 9
                    } else if (key === 'Elite') {
                        value = 50
                        modifiers = 2
                        statBase += 6
                    } else if (key === 'Epic') {
                        value = 35
                        modifiers = 2
                        statBase += 4
                    } else if (key === 'Rare') {
                        value = 25
                        modifiers = 1
                        statBase += 2
                    } else if (key === 'Uncommon') {
                        value = 15
                        modifiers = 1
                        statBase += 1
                    } else if (key === 'Common') {
                        value = 10
                    }
                    break
                }
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
            let id = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substring(1, 6);

            const listModifiers = [['Critical Hit Chance', 2], ['Critical Hit Damage', 5], ['Block Chance', 3], ['Maximum Health', 25], ['Gold Drops', 15], ['Damage', 5], ['XP', 10]]
            if (modifiers != 0) {
                for (var i = 0; i < modifiers; i++) {
                    let pick = listModifiers[Math.floor(Math.random() * listModifiers.length)]
                    while (affixes.includes(pick)) {
                        pick = listModifiers[Math.floor(Math.random() * listModifiers.length)]
                    }
                    affixes.push(listModifiers[Math.floor(Math.random() * listModifiers.length)])
                }
            }

            let newStats = stats
            newStats['items_dropped'] = (newStats['items_dropped'] || 0) + 1
            setStats(newStats)

            const newLoot = [
                ...inventory,
                <Item 
                    equipItem={equipItem}
                    sellItem={sellItem}
                    drop={{enemy: entityName, level: entityLevel}}
                    info={{name: itemName, id: id, rarity: itemRarity, type: itemType, boss: bossStatus}}
                    stats={{base: (Math.round(statBase * Math.pow(1.2, entityLevel - 1))), type: statType, value: (Math.round(value * Math.pow(1.2, entityLevel - 1)))}}
                    affixes={affixes}
                    action={isAction}
                    setAction={setAction}
                />];
            console.log("New item: " + itemName + " " + id);
            setInventory(newLoot);
        /* Else, no loot */
        } else {
            return
        }
    }

    const calcHP = (level, bossScale = 1) => {
        let base = 30
        let scale = 1.2
        return Math.round(base + (((base * Math.pow(scale, level)) - base) * bossScale));
    }

    const spawnEntity = () => {
        /* Set HP and random name */
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
        /* Level up after 5 enemies killed*/
        if (entityCOUNT >= 4) {
            /* SPAWN BOSS */
            let bossATK = Math.round(entityATK * 2);
            let bossDEF = Math.round(entityDEF * 2);
            if (entityLevel%5 === 4) {
                setBossStatus('show');
                setEntityMAXHP(calcHP(entityLevel, 4));
                setEntityHP(calcHP(entityLevel, 4));
                setEntityATK(bossATK);
                setEntityDEF(bossDEF);
                setEntityCOUNT(5);

            /* SPAWN REGULAR ENEMY */
            } else {
                console.log("ENTITY LEVEL: " + entityLevel)
                setBossStatus('hidden');
                if (entityLevel%5 === 0) { 
                    console.log("Restore from boss");
                    let ATK = Math.round(Math.round((bossATK / 2) * 1.25))
                    let DEF = Math.round(Math.round((bossDEF / 2) * 1.25))
                    setEntityMAXHP(calcHP(entityLevel));
                    setEntityHP(calcHP(entityLevel));
                    setEntityDEF(Math.ceil(DEF/2));
                    setEntityATK(Math.ceil(ATK/2));
                    setEntityCOUNT(0);
                } else {
                    console.log("Spawn regular enemy");
                    let ATK = Math.max((entityATK + 2), Math.round(entityATK * (1.25)))
                    let DEF = Math.max((entityDEF + 2), Math.round(entityDEF * (1.25)))
                    setEntityMAXHP(calcHP(entityLevel));
                    setEntityHP(calcHP(entityLevel));
                    setEntityDEF(DEF);
                    setEntityATK(ATK);
                    setEntityCOUNT(0);
                }
            }
            setEntityLevel(entityLevel + 1);
        /* Count up if 1-4 enemies killed*/
        } else {
            setBossStatus('hidden');
            setEntityHP(entityMAXHP);
            setEntityCOUNT(entityCOUNT + 1);
        }
    }

    const giveDrops = () => {
        /* Random 0-6 xp + 1.18^level * 3 */
        /* Example: 5 random XP + 1.18^level 10 * 3 = 20xp for a level 10 enemy */
        let xp = Math.floor((Math.random() * 6) + (3 * Math.pow(1.18, entityLevel - 1)));
        let newStats = stats
        newStats['total_xp'] = (newStats['total_xp'] || 0) + xp
        setStats(newStats);
        /* Random 0-4 coins + 1.18^level * 2 */
        /* Example: 2 random coins + 1.18^level 10 * 2 = 12 coins for a level 10 enemy */
        let coinDrop = Math.floor((Math.random() * 4) + (2 * Math.pow(1.18, entityLevel - 1)));
        newStats = stats
        newStats['total_coins'] = (newStats['total_coins'] || 0) + coinDrop
        setStats(newStats);
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
        let critHit = Math.floor(Math.random() * 100);
        if (critHit <= (99 - (equipCritChance + baseCritChance))) {
            /* REGULAR HIT */
            setEntityHP(Math.min(entityHP, entityHP - (playerATK - entityDEF)));
        } else {
            /* CRITICAL HIT */
            let critDMG = Math.floor(playerATK * (1 + ((baseCritDamage + equipCritDamage)/100)))
            console.log("CRITICAL HIT! " + playerATK + "dmg -> " + critDMG + "dmg");
            setEntityHP(Math.min(entityHP, Math.floor(entityHP - (critDMG - entityDEF))));
        }
    }

    const hitPlayer = () => {
        setPlayerHP(Math.min(playerHP, playerHP - (entityATK - playerDEF)));
    }

    const startOver = () => {
        let newStats = stats
        newStats['started_over'] = (newStats['started_over'] || 0) + 1
        setStats(newStats);

        setBossStatus('hidden');
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
        setEntityMAXHP(Math.round(30 * Math.pow(1.2, currRestart  - 1)));
        setEntityHP(Math.round(30 * Math.pow(1.2, currRestart  - 1)));
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
        let newStats = stats
        newStats['times_died'] = (newStats['times_died'] || 0) + 1
        setStats(newStats);
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
                equip={{attack: playerATK - baseATK, defense: playerDEF - baseDEF, critChance: equipCritChance, critDamage: equipCritDamage}}
                base={{attack: baseATK, defense: baseDEF, critChance: baseCritChance, critDamage: baseCritDamage}}
                dropRates={{rarities: rarities, weight: totalWeight}}
                admin={{admin: Admin, setAdmin: setAdmin}}
            />
            <Entity 
                setEntityHP={{setEntityHP}}
                entity={{name: entityName, drop: dropChance, boss: bossStatus}}
                stats={{level: entityLevel, count: entityCOUNT, attack: entityATK, defense: entityDEF, hp: entityHP, maxHP: entityMAXHP}}
                dropRates={{rarities: rarities, weight: totalWeight}}
            />
            <div id="Restart">
                { RP ? 
                    <div>
                    <div>Level {currRestart}</div>
                    <button onClick={decRestart}><i class="fa-solid fa-left-long"></i></button>
                    <button id="restart-button" onClick={() => startOver(currRestart)}>
                        Start Over
                    </button>
                    <button onClick={incRestart}><i class="fa-solid fa-right-long"></i></button>
                    </div> 
                    :
                    <button id="restart-button" onClick={() => startOver(currRestart)}>
                    Start Over
                    </button>
            }
            <div/>
        { Admin ?
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
        :
        <div></div>
        }
        </div>
        </div>
    )
}

export default Content;