import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './css/index.css';

import App from './App.js';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);