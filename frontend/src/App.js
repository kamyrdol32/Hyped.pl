// Imports
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ThemeContext from "./Context/ThemeContext";
import useLocalStorage from "use-local-storage";
import useToken from "./useToken";

// Components
import MyNavBar from "./Components/Navbar/Navbar";
import MyRoute from "./Components/Route/MyRoute";

// CSS
import './App.css';

// Code
export default function App() {
	const {token, setToken, saveToken, removeToken} = useToken()

	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	const root = document.getElementById('root');
	root.setAttribute("data-theme", theme);

	return (
		<ThemeContext.Provider value={{theme, setTheme}}>
			<BrowserRouter>
				<MyNavBar token={token}/>
				<MyRoute></MyRoute>
			</BrowserRouter>
		</ThemeContext.Provider>
	)
}
