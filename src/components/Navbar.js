function Navbar() {
    return(
        <div id="Navbar">
            <div className="navbar-button" style={{marginTop: '20px'}}>
                Upgrades
            </div>
            <div className="navbar-button">
                Statistics
            </div>
            <div className="navbar-button">
                Settings
            </div>
            <div className="navbar-footer">
                v0.0.1 | Updated 5/17/2023
                <div className="navbar-links">
                    <a href="https://github.com/itshdog">GitHub</a>
                    <a href="https://github.com/itshdog">Support Me</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;