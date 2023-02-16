import React, { useState } from 'react';
import './css/App.css';
import Enemy from './Enemy';
import Equipment from './Equipment';
import Backpack from './Backpack';
import Item from './Item';

function App() {
  return (
    <div className="App">
      <header>
        <div id="title" class="wrap">Get More Loot!</div>
      </header>
      <div id="main-container">
        <Enemy/>
        <Equipment/>
      </div>
      <footer>
        <Backpack />
      </footer>
    </div>
  );
}

export default App;
