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
			<Col md="8" className="MyProfileRating_Title p-3 px-5">
				{props.Type === "film" ?
					<a className="MyProfileRating_Title" href={"/film/" + props.ID}>{props.Title} - {props.Type}</a>
					:
					<a className="MyProfileRating_Title" href={"/serial/" + props.ID}>{props.Title} - {props.Type}</a>
				}
			</Col>
			<Col md="4" className="MyProfileRating p-3 text-center">
				<Rating ratingValue={props.Rating} readonly={true} size={25} />
			</Col>
		</Row>
	)
}