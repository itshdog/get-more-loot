import React from 'react';

const fullReset = () => {
    
}

function Admin() {
    return(
        <div id="Admin">
            <div className="panel" style={{marginTop: '20px'}}>
                <div className='title' style={{padding: '5px'}}>Admin Panel</div>
                <div className='admin-buttons'>
                    <div className='admin-columns'>
                        <button onClick={fullReset()}>Full reset</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button>-----------</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button>-----------</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                    <div className='admin-columns'>
                        <button>-----------</button>
                        <button>-----------</button>
                        <button>-----------</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;