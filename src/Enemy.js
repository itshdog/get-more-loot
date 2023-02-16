import React, { useState, useEffect } from 'react';

function Enemy() {

    useEffect(() => {
        const data = window.localStorage.getItem("dataCoins");
        console.log("Loading user data...")
        if ( data !== 0 || data !== null ) set_coins(JSON.parse(data));
    }, []);

    /* Constants */
    const [curr_hp, set_curr_hp] = useState(10);
    const [max_hp, set_max_hp] = useState(10);
    const [hp_maxwidth, set_hp_maxwidth] = useState(250);
    const [hp_width, set_hp_width] = useState({
        width: 250,
    });
    const [hit, setHit] = useState(0);
    const [damage, setDamage] = useState(1);

    /* Called on clicking click-button. On hit, lower HP and lower HP bar */
    function hitEnemy() {
        setHit(1)
        set_curr_hp(curr_hp - damage);
        set_hp_width({width: hp_width.width - ((hp_maxwidth / max_hp) * damage)});
        /* If killed (Goes to 0HP), reset hp and hp bar. Run killEnemy */
        if (curr_hp - damage <= 0) {
            set_curr_hp(max_hp);
            set_hp_width({width: hp_maxwidth})
            killEnemy();
        }
    }

    /* Coins for upgrades */
    const [coins, set_coins] = useState(0);

    /* Called when enemy is killed using hitEnemy() */
    function killEnemy() {
        const earned = getCoin();
        if (earned != 0) {
            console.log("Earned %d coins!", earned);
        } 
        set_coins(coins + earned);
        window.localStorage.setItem("dataCoins", JSON.stringify(coins));

        generateItem();
    }

    /* Generates a random number of coins */
    function getCoin() {
        /* roll 1-4 means 0 coins, 5-6 means 1 coin, 7 means 2 coins, 8 means 3 coins */
        const max = 9
        const min = 1
        const roll = Math.floor(Math.random() * (max - min) + min);
        if (roll <= 4) {
            return 0
        } else if (roll === 5 || roll === 6) {
            return 1
        } else if (roll === 7) {
            return 2
        } else if (roll === 8) {
            return 3
        } else {
            return 0
        }
    }

    function generateItem() {
    }

    return (
    <div>
        <div id="click-container">
            <div 
            id="click-button"
            onClick={() => hitEnemy()}
            onAnimationEnd={() => setHit(0)}
            hit={hit}
            >
            </div>
        </div>
        <div id="health-bar">
            <div id="detail-health">{curr_hp}/{max_hp}</div>
            <div id="remaining-health" style={hp_width}></div>
        </div>
        <div id="stats">
            <div id="coins" class="stat">
                Coins: {coins}
            </div>
            <div id="attack" class="stat">
                Attack: {damage}
            </div>
            {/* <div class="stat alt clickable" onClick={() => setDamage(2)}>
                Set Attack: 2
            </div>
            <div class="stat alt clickable" onClick={() => setDamage(1)}>
                Set Attack: 1
            </div> */}
        </div>
    </div>
    )
}

export default Enemy;