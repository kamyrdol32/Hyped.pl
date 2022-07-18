// Imports
import React from 'react';
import {useParams} from "react-router-dom";

// Components


// CSS
import './MyFilm.css';

// Code
export default function MyFilm() {
	const params = useParams()

	return <h1>MyFilm {params.ID} </h1>;
}