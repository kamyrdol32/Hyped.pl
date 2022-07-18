// Imports
import React, {useContext} from 'react';
import themeContext from "../../Context/ThemeContext";

// CSS
import './MyHome.css';
import {Container} from "react-bootstrap";

// Code
export default function MyHome() {
	const {theme} = useContext(themeContext);
	return(
		<Container id="MyHome">
			<div className="MyHome">This is MyHome</div>
			<div className="MyHome">Aktualny tryb: {theme}</div>
		</Container>
	);
}