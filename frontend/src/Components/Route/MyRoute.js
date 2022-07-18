// Imports
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container} from "react-bootstrap";

// Components
import MyHome from "../../Sites/Home/MyHome";
import MyFilmList from "../../Sites/FilmList/MyFilmList";
import MyFilm from "../../Sites/Film/MyFilm";
import MyLogin from "../../Sites/Login/MyLogin";
import MyRegister from "../../Sites/Register/MyRegister";

// CSS
import './MyRoute.css';

// Code
export default function MyRoute() {
	return (
		<Container>
			<Routes >
				<Route path="/" element={<MyHome />} />
				<Route path="/films" element={<MyFilmList />} />
				<Route path="/film/:ID" element={<MyFilm />} />

				<Route path="/login" element={<MyLogin />} />
				<Route path="/register" element={<MyRegister />} />
			</Routes>
		</Container>
	)
}