import React from 'react';
import './css/index.css';
import Navbar from './components/Navbar.js';
import Content from './components/Content.js';
import Inventory from './components/Inventory.js';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Content />
        <Inventory />
    </div>
  );
}

export default App;