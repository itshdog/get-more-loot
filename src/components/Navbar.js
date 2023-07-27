import React, { useState, useEffect } from 'react';
import Coin from '../images/icons/48x48/coin_01d.png'

function Navbar({RP, setRP, Admin, setAdmin, statInfo, itemScan, setItemScan, coins, setCoins, dropChance, updateChance}) {

    const [upgrade, setUpgrade] = useState('none');
    const [stats, setStats] = useState('none');
    const [settings, setSettings] = useState('none');

    const [selected, setSelected] = useState(['selected', '', '', '', '']);

    const openAdmin = () => { (Admin === false) ? setAdmin(true) : setAdmin(false) }

    const openStorage = () => {
        setSelected(['selected', '', '', '', '']);
        setUpgrade('none');
        setStats('none');
        setSettings('none');
    }

    const openUpgrade = () => {
        if (upgrade === 'none') {
            setSelected(['', 'selected', '', '', '']);
            setUpgrade('block');
            setStats('none');
            setSettings('none');
        } else if (upgrade === 'block') {
            setUpgrade('none');
        }
    }

    const openStats = () => {
        if (stats === 'none') {
            setSelected(['', '', 'selected', '', '']);
            setStats('block');
            setUpgrade('none');
            setSettings('none');
        } else if (stats === 'block') {
            setStats('none');
        }
    }
    const openSettings = () => {
        if (settings === 'none') {
            setSelected(['', '', '', 'selected', '']);
            setSettings('block');
            setUpgrade('none');
        } else if (settings === 'block') {
            setSettings('none');
            setSettings('none');
        }
    }

    const [invalid1, setInvalid1] = useState(false);
    const [invalid2, setInvalid2] = useState(false);
    const [invalid3, setInvalid3] = useState(false);
    const [invalid4, setInvalid4] = useState(false);
    const [luckyDayCost, setLuckyDayCost] = useState(10);
    const luckyDay = (cost) => {
        if (coins < cost || cost > 10000000) {
            setInvalid1(true);
            setTimeout(() => {
                setInvalid1(false);
            }, 150);
            return
        }
        if (cost > 10000000) {
            setLuckyDayCost("MAX");
        }
        setCoins(coins - cost);
        updateChance(dropChance + 1);
        setLuckyDayCost(luckyDayCost * 2)
    }

    const buyRP = (cost) => {
        if (coins < cost || RP === true) {
            setInvalid2(true);
            setTimeout(() => {
                setInvalid2(false);
            }, 150);
            return
        }
        setCoins(coins - cost);
        setRP(true);
    }

    const buyItemScan = (cost) => {
        if (coins < cost || itemScan === true) {
            setInvalid3(true);
            setTimeout(() => {
                setInvalid3(false);
            }, 150);
            return
        }
        setCoins(coins - cost);
        setItemScan(true);
    }

    const placeholderUpgrade4 = (cost) => {
        if (coins < cost) {
            setInvalid4(true);
            setTimeout(() => {
                setInvalid4(false);
            }, 150);
            return
        }
    }

    return(
        <div className="Navbar">
            <div className={"nav-button " + selected[0]} onClick={openStorage}>Storage<i class="fa-solid fa-list"></i></div>
            <div className={"nav-button " + selected[1]} onClick={openUpgrade}>Upgrades<i class="fa-solid fa-circle-up"></i></div>
            <div className={"nav-button " + selected[2]} onClick={openStats}>Statistics<i class="fa-solid fa-circle-up"></i></div>
            <div className={"nav-button " + selected[3]} onClick={openSettings}>Settings<i class="fa-solid fa-sliders"></i></div>
            <div className={"nav-button " + selected[4]} onClick={openAdmin}>Admin<i class="fa-solid fa-lock"></i></div>

            <div className="Tab" style={{display: upgrade}}>
            <button className='back' onClick={openUpgrade}>Back</button>
            <div className='title'>Upgrades</div>
            <div className={invalid1 ? 'navbar-button invalid' : 'navbar-button'} onClick={() => luckyDay(luckyDayCost)} style={{marginTop: '20px'}}>
                <div className="upgrade-title">Lucky Day</div>
                <div className="upgrade-stats">
                    Increase drop chance by 1%
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">{luckyDayCost.toLocaleString()}<img className="coin-count" src={Coin}></img></div>
                </div>
            </div>
            { RP ?
            <div className={'navbar-button purchased'}>
                <div className="upgrade-title">Respawn point</div>
                <div className="upgrade-stats">
                    Start over after any completed boss
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">--<img className="coin-count" src={Coin}></img></div>
                </div>
            </div>
            :
            <div className={invalid2 ? 'navbar-button invalid' : 'navbar-button'} onClick={() => buyRP(1000)}>
                <div className="upgrade-title">Respawn point</div>
                <div className="upgrade-stats">
                    Start over after any completed boss
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">1,000<img className="coin-count" src={Coin}></img></div>
                </div>
            </div>
            }
            {itemScan ?
            <div className={'navbar-button purchased'}>
                <div className="upgrade-title">Item Scanner</div>
                <div className="upgrade-stats">
                    Highlight better items
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">--<img className="coin-count" src={Coin}></img></div>
                </div>
            </div>
            :
            <div className={invalid3 ? 'navbar-button invalid' : 'navbar-button'} onClick={() => buyItemScan(2500)}>
                <div className="upgrade-title">Item Scanner</div>
                <div className="upgrade-stats">
                    Highlight better items
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">2,500<img className="coin-count" src={Coin}></img></div>
                </div>
            </div>
            }
            <div className={invalid4 ? 'navbar-button invalid' : 'navbar-button'} onClick={() => placeholderUpgrade4(20000)}>
                <div className="upgrade-title">Merchant</div>
                <div className="upgrade-stats">
                    Autosells worse items
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">20,000<img className="coin-count" src={Coin}></img></div>
                </div>
            </div>
        </div>

        <div className="Tab" style={{display: stats}}>
            <button className='back' onClick={openStats}>Back</button>
            <div className='title'>Statistics</div>
            <div className='stat-row'>Enemies Killed: {statInfo['enemies_killed']}</div>
            <div className='stat-row'>Items Dropped: {statInfo['items_dropped']}</div>
            <div className='stat-row'>Average Drop Percentage: {(parseFloat(statInfo['items_dropped'] / statInfo['enemies_killed'] * 100).toFixed(2))}%</div>
        </div>

        <div className="Tab" style={{display: settings}}>
            <button className='back' onClick={openSettings}>Back</button>
            <div className='title'>Settings</div>
        </div>
        </div>

    )
}

export default Navbar;