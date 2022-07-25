// Addons
import React from 'react';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

// CSS
import '../Styles/MyCard.css';

// Components

// Code
export default function MyCard(props) {
	return (
		<Container>
			<Row className="justify-content-center p-3">
				<Col xl="9" className="MyCard p-0 row">
					<Col lg="4" className="p-0">
						<Card.Img className="MyCard_Img" src={props.Image} alt={props.Title} />
					</Col>
					<Col lg="8" className="MyCard_Body card-body">
						<Card.Title>
							<Row className="p-3">
								<Col lg="1" className="MyCard_NR text-center">{props.ID}</Col>
								<Col lg="9" className="MyCard_Title">{props.Title}</Col>
								<Col lg="2" className="MyCard_Rating">{props.Rating} <span>&#9733;</span></Col>
							</Row>
						</Card.Title>
						<div className="ps-3">
							<Card.Text><h6 className="text-muted">{props.Description}</h6></Card.Text>
							<ListGroup variant="flush" va>
								<ListGroup.Item className="MyCard_ListGroup"><h6 className="text-muted"><div className="fw-bold">Premiera</div> {props.Year}</h6></ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><h6 className="text-muted"><div className="fw-bold">Reżyser</div> {props.Director}</h6></ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><h6 className="text-muted"><div className="fw-bold">Produkcja</div> {props.Country}</h6></ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><h6 className="text-muted"><div className="fw-bold">Gatunek</div> {props.Genre}</h6></ListGroup.Item>
							</ListGroup>
							<Row className="justify-content-center text-center p-3">
								<Col lg="12" className="p-0">
									<LinkContainer to={"/film/" + props.ID}>
										<Card.Link className="h6 center MyCard_Link">Wiecej informacji</Card.Link>
									</LinkContainer>
								</Col>
							</Row>
						</div>
					</Col>
				</Col>
			</Row>
		</Container>
	)
}