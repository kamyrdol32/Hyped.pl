// Imports
import React, {useState} from 'react';


// CSS
import '../Styles/MyComments.css';
import {Container, Row} from "react-bootstrap";

// Code
export default function MyComments(props) {
	return (
		<Container key={props.ID} className="p-3">
			<Row className="pt-2 pb-3" >
				<p className="MyFilm_Username fw-bold col-8">{props.User}:</p>
				<p className="fw-light col-4 text-center">{props.Date}</p>
			</Row>
			<p>{props.Comment}</p>
		</Container>
	)
}