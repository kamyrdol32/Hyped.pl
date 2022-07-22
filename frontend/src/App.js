// Imports
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ThemeContext from "./Context/ThemeContext";
import useLocalStorage from "use-local-storage";
import useToken from "./JWT";

// Components
import MyNavBar from "./Components/Navbar/Navbar";
import MyHome from "./Sites/Home/MyHome";
import MyFilmList from "./Sites/FilmList/MyFilmList";
import MyFilm from "./Sites/Film/MyFilm";
import MyLogin from "./Sites/Login/MyLogin";
import MyRegister from "./Sites/Register/MyRegister";
import MyProfile from "./Sites/Profile/MyProfile";

// CSS
import './App.css';
import {Container} from "react-bootstrap";


// Code
export default function App() {
	const { token, removeToken, setToken } = useToken();

	// Dark mode
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	const root = document.getElementById('root');
	root.setAttribute("data-theme", theme);

	return (
		<ThemeContext.Provider value={{theme, setTheme}}>
			<BrowserRouter>
				<MyNavBar token={token}/>
				<Container>
					<Routes>
						<Route path="/" element={<MyHome />} />
						<Route path="/films" element={<MyFilmList />} />
						<Route path="/film/:ID" element={<MyFilm />} />

						<Route path="/login" element={<MyLogin setToken={setToken} />} />
						<Route path="/register" element={<MyRegister />} />
						<Route path="/profile" element={<MyProfile token={token} setToken={setToken} removeToken={removeToken} />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</ThemeContext.Provider>
	)
}
