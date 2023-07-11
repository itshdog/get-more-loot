import React, { useState, useEffect } from 'react';
import NavFooter from './NavFooter.js';
import Coin from '../images/icons/48x48/coin_01d.png'

function Navbar({RP, setRP, Admin, setAdmin, itemScan, setItemScan, coins, setCoins, dropChance, updateChance}) {

    const [upgrade, setUpgrade] = useState('none');
    const [stats, setStats] = useState('none');
    const [settings, setSettings] = useState('none');

    const openAdmin = () => { (Admin === false) ? setAdmin(true) : setAdmin(false) }

    const openUpgrade = () => {
        if (upgrade === 'none') {
            setUpgrade('block');
        } else if (upgrade === 'block') {
            setUpgrade('none');
        }
    }

    const openStats = () => {
        if (stats === 'none') {
            setStats('block');
        } else if (stats === 'block') {
            setStats('none');
        }
    }
    const openSettings = () => {
        if (settings === 'none') {
            setSettings('block');
        } else if (settings === 'block') {
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
        <div>
        <div className="Navbar">
            <div className='title'>Navbar</div>
            <div className="navbar-button" style={{marginTop: '20px'}} onClick={openUpgrade}>
                Upgrades
            </div>
            <div className="navbar-button" onClick={openStats}>
                Statistics
            </div>
            <div className="navbar-button" onClick={openSettings}>
                Settings
            </div>
            <NavFooter/>
        </div>
        <div className="Navbar Tab" style={{display: upgrade, position: 'absolute'}}>
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
            <NavFooter/>
        </div>
        <div className="Navbar Tab" style={{display: stats, position: 'absolute'}}>
            <button className='back' onClick={openStats}>Back</button>
            <div className='title'>Statistics</div>
            Work in progress...
            <NavFooter/>
        </div>
        <div className="Navbar Tab" style={{display: settings, position: 'absolute'}}>
            <button className='back' onClick={openSettings}>Back</button>
            <div className='title'>Settings</div>
            Work in progress...
            <div className='navbar-button' onClick={openAdmin}>
                <div className='settings-title'>Enable Admin Panel</div>
                <div className='settings-info'>For developer/testing purposes</div>
                <div class='switch'>
                    {Admin ?
                    <div>Enabled</div>
                    :
                    <div>Disabled</div>}
                </div>
            </div>
            <NavFooter/>
        </div>
        </div>
    )
}

export default Navbar;