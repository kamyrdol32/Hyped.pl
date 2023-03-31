// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./Utils/i18n.jsx"

// Components
import App from './App.jsx';

// CSS
import './Styles/main.css';

// CSS
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="App">
        <App/>
    </div>
);