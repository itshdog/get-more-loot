import Entity from './Entity.js';
import Player from './Player.js';
import Item from './Item.js';
import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png'

function Content({inventory, setInventory, equipment, setEquipment, coins, setCoins, sellItem, equipItem}) {

    /* Attack */
    const [baseATK, setBaseATK] = useState(10);
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
    const [playerMAXXP, setPlayerMAXXP] = useState(20);
    /* Entity */
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
    const Names = ['Banechild', 'Thunderthing', 'Soulmirage', 'Steamsoul', 'Auracreep', 'Vexmutant', 'Terrorbug', 'Metalcrackle', 'Soilspawn', 'Dreamserpent', 'Vilegolem', 'Shadowwoman', 'Webspawn', 'Infernalghoul', 'Bowelmutant', 'Glowsnake', 'Acidscreamer', 'Toxinhound', 'Steamteeth', 'Infernobrood', 'Emberfoot', 'Webstrike', 'Rustvine', 'Barbmask', 'Slagwing', 'Vortexfiend', 'Thunderhand', 'Blazeflayer', 'Boneseeker', 'Spiritstep', 'Bladefigure', 'Thundertree', 'Murksoul', 'Boulderboy', 'Cloudseeker', 'Slagfigure', 'Frostsnake', 'Smokewing', 'Moldhound', 'Bladetaur', 'Gutsoul', 'Fetidhood', 'Smokeboy', 'Frightbrute', 'Banepaw', 'Cursestrike', 'Grieveface', 'Terrorlich', 'Murkbug', 'Fogmirage', 'Vileman', 'Sorrowbug']
    const Enemies = ['Zombie', 'Skeleton', 'Spider', 'Goblin', 'Soldier', 'Troll', 'Cultist', 'Vampire', 'Witch', 'Wizard', 'Warlock', 'Warrior', 'Human', 'Alien', 'Baby', 'Android', 'Robot', 'Martian', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-elf', 'Centaur', 'Fairy', 'Goliath', 'Orc', 'Minotaur']
    const Adjectives = ['Common', 'Worst', 'Old', 'Great', 'Greatest', 'Dangerous', 'Mortal', 'Bitter', 'Real', 'Natural', 'Formidable', 'Public', 'Powerful', 'Foreign', 'Last', 'Implacable', 'Deadly', 'Potential', 'Personal', 'Chief', 'Main', 'Ancient', 'Bitterest', 'Inveterate', 'External', 'Open', 'Former', 'Traditional', 'Alien', 'Hereditary', 'Principal', 'Avowed', 'Declared', 'Victorious', 'Terrible', 'Superior', 'Invisible', 'Unseen', 'Cruel', 'Secret', 'Mine', 'Hated', 'Active', 'Internal', 'Arch', 'Fallen', 'Invading', 'Dead', 'Deadliest', 'Vanquished', 'Eternal', 'Unknown', 'Worse', 'Irreconcilable', 'Armed', 'Relentless', 'Hidden', 'Biggest', 'Conquered', 'Insidious', 'Ruthless', 'Fierce', 'Generous', 'Imaginary', 'Brave', 'Savage', 'Outside', 'Ultimate', 'Treacherous', 'Violent', 'Elusive', 'Evil', 'Stronger', 'Communist']
    /* Item names */
    const Items = ["Iron Sword", "Iron Chestplate", "Iron Boots", "Iron Helmet", "Amulet", "Iron Ring", "Iron Shield"]

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
            } else if (entityHP <= 0 + playerATK - entityDEF) {
                giveDrops();
                giveLoot();
                spawnEntity();
            /* Entity alive */
            } else {
                hitEntity();
                hitPlayer();
                /* console.log("Hit entity for: " + playerATK + " dmg"); */
            }
        }, 1000);
        return () => { clearInterval(interval); };
    }, [entityHP, entityDEF, entityATK, playerATK, playerDEF, playerXP, playerHP]);

    useEffect(() => {
        let newEquipATK = 0
        let newEquipDEF = 0
        for (let i = 0; i < equipment.length; i++) {
            if (equipment[i] === undefined) {
                continue;
            }
            if (equipment[i].props.stats.type === "Damage") {
                newEquipATK += equipment[i].props.stats.base
            } else if (equipment[i].props.stats.type === "Armor") {
                newEquipDEF += equipment[i].props.stats.base
            }
        }
        setEquipATK(newEquipATK);
        setEquipDEF(newEquipDEF);
    }, [equipment])

    useEffect(() => {
        setPlayerATK(baseATK + equipATK);
        setPlayerDEF(baseDEF + equipDEF);
    }, [baseATK, baseDEF, equipATK, equipDEF])

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
                    equipItem={equipItem}
                    sellItem={sellItem}
                    drop={{enemy: entityName}}
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
        setEntityName(Names[Math.random() * Names.length | 0] + " the " + Adjectives[Math.random() * Adjectives.length | 0] + " " + Enemies[(Math.random() * Enemies.length | 0)])
        /* Level up after 5 enemies killed*/
        if (entityCOUNT >= 4) {
            setEntityLevel(entityLevel + 1);
            /* Increase entity stats by 2 or 25%, whichever is greater */
            setEntityDEF(Math.max((entityDEF + 2), Math.round(entityDEF * (1.25))));
            setEntityATK(Math.max((entityATK + 2), Math.round(entityATK * (1.25))));
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
            setBaseATK(Math.round(baseATK * 1.12));
            setBaseDEF(Math.round(baseDEF + 1.12));
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