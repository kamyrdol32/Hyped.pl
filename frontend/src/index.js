// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./Utils/i18n"

// Components
import App from './App';

// CSS
import './Styles/index.css';

// CSS
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="App">
            <App />
        </div>
    </React.StrictMode>
);