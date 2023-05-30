import React, { useState } from 'react';
import NavFooter from './NavFooter.js';
import Coin from '../images/icons/48x48/coin_01d.png'

function Navbar() {

    const [upgrade, setUpgrade] = useState('none');
    const [stats, setStats] = useState('none');
    const [settings, setSettings] = useState('none');

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
            <div className="navbar-button" style={{marginTop: '20px'}}>
                <div className="upgrade-title">Lucky Day</div>
                <div className="upgrade-stats">
                    Increase drop chance by 1%
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">10<img class="coin-count" src={Coin}></img></div>
                </div>
            </div>
            <div className="navbar-button">
                <div className="upgrade-title">Item Scanner</div>
                <div className="upgrade-stats">
                    Highlight better items
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">1,000<img class="coin-count" src={Coin}></img></div>
                </div>
            </div>
            <div className="navbar-button">
                <div className="upgrade-title">Merchant</div>
                <div className="upgrade-stats">
                    Autosells worse items
                </div>
                <div className="upgrade-info">
                    <div className="upgrade-cost">20,000<img class="coin-count" src={Coin}></img></div>
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
            <NavFooter/>
        </div>
        </div>
    )
}

export default Navbar;