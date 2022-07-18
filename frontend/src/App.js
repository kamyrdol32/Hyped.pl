// Imports
import React from 'react';
import {MemoryRouter} from "react-router-dom";

// Components
import MyNavBar from "./Components/Navbar/Navbar";
import MyRoute from "./Components/Route/MyRoute";

// CSS
import './App.css';




function App() {
	return (
		<MemoryRouter>
			<MyNavBar />
			<MyRoute />
		</MemoryRouter>
	)
}

export default App;
