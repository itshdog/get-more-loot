import React, { useState } from 'react';
import NavFooter from './NavFooter.js';

function Navbar() {

    const [upgrade, setUpgrade] = useState('none');
    const [stats, setStats] = useState('none');
    const [settings, setSettings] = useState('none');

    const openUpgrade = () => {
        if (upgrade == 'none') {
            setUpgrade('block');
        } else if (upgrade == 'block') {
            setUpgrade('none');
        }
    }

    const openStats = () => {
        if (stats == 'none') {
            setStats('block');
        } else if (stats == 'block') {
            setStats('none');
        }
    }
    const openSettings = () => {
        if (settings == 'none') {
            setSettings('block');
        } else if (settings == 'block') {
            setSettings('none');
        }
    }

    return(
        <div>
        <div className="Navbar">
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
                Increase loot chance
                Level 0/10
                Cost: 10 Coins
            </div>
            <div className="navbar-button">
                Show better loot
                Level 0/1
                Cost: 10 Coins
            </div>
            <div className="navbar-button">
                Autosell
                Level 0/1
                Cost: 10 coins
            </div>
            <NavFooter/>
        </div>
        <div className="Navbar Tab" style={{display: stats, position: 'absolute'}}>
            <button className='back' onClick={openStats}>Back</button>
            <div className='title'>Statistics</div>
            Enemies killed: 100
            Xp earned: 999
            Time spent: 1 day 20 minutes
            <NavFooter/>
        </div>
        <div className="Navbar Tab" style={{display: settings, position: 'absolute'}}>
            <button className='back' onClick={openSettings}>Back</button>
            <div className='title'>Settings</div>
            <div className="navbar-button" style={{marginTop: '20px'}}>
                Enable dark mode
            </div>
            <div className="navbar-button">
                Enable light mode
            </div>
            <div className="navbar-button">
                Export data
            </div>
            <NavFooter/>
        </div>
        </div>
    )
}

export default Navbar;