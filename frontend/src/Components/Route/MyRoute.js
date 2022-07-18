// Imports
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container} from "react-bootstrap";

// Components
import MyHome from "../../Sites/Home/MyHome";
import MyFilmList from "../../Sites/MyFilmList/MyFilmList";
import MyFilm from "../../Sites/MyFilm/MyFilm";

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
			</Routes>
		</Container>
	)
}