// Addons
import React from 'react';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

// CSS
import './MyCard.css';

// Components

// Code
function MyCard(props) {
	return (
		<Container>
			<Row className="justify-content-center p-3">
				<Col lg="8" className="MyCard p-0 row">
					<Col lg="4" className="p-0">
						<Card.Img className="MyCard_IMG" src={props.Image} alt={props.Title} />
					</Col>
					<Col lg="8" className="MyCard_BODY">
						<Card.Body>
							<Card.Title>
								<Row>
									<Col lg="10">{props.Title}</Col>
									<Col lg="2" style={{color: "orange"}}>{props.Rating} <span>&#9733;</span></Col>
								</Row>
							</Card.Title>
							<div className="p-2">
								<Card.Text><h6 className="text-muted">{props.Description}</h6></Card.Text>
								<ListGroup variant="flush" va>
									<ListGroup.Item><h6 className="text-muted"><text className="fw-bold">Premiera</text>: {props.Year}</h6></ListGroup.Item>
									<ListGroup.Item><h6 className="text-muted"><text className="fw-bold">Reżyser</text>: {props.Director}</h6></ListGroup.Item>
									<ListGroup.Item><h6 className="text-muted"><text className="fw-bold">Produkcja</text>: {props.Country}</h6></ListGroup.Item>
									<ListGroup.Item><h6 className="text-muted"><text className="fw-bold">Gatunek</text>: {props.Genre}</h6></ListGroup.Item>
								</ListGroup>
								<Row className="justify-content-center text-center p-3">
									<Col lg="12" className="p-0">
										<LinkContainer to={"/film/" + props.ID}>
											<Card.Link className="h6 center MyCard_Link">Wiecej informacji</Card.Link>
										</LinkContainer>
									</Col>
								</Row>
							</div>
						</Card.Body>
					</Col>
				</Col>
			</Row>
		</Container>
	)
}

export default MyCard;