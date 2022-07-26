// Addons
import React from 'react';
import {Col, Row} from "react-bootstrap";
import {Rating} from "react-simple-star-rating";

// CSS
import '../Styles/MyProfileRating.css';

// Code
export default function MyProfileRating(props) {
	return (
		<Row>
			<Col md="8" className="MyProfileRating_Title p-3">
				<a className="MyProfileRating_Title" href={"/film/" + props.ID}>{props.Title}</a>
			</Col>
			<Col md="4" className="MyProfileRating p-3">
				<Rating ratingValue={props.Rating} readonly={true}  />
			</Col>
		</Row>
	)
}