// Addons
import React from 'react';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyCardList.css';

// Components

// Code
export default function MyCardList(props) {

	const {t} = useTranslation();

	return (
		<Row className="justify-content-center p-3">
			<Row className="MyCard col-9 p-0">

				<Col lg={4} className="p-0">
					<Card.Img className="MyCard_Img" src={props.Image} alt={props.Title} />
				</Col>
				<Col lg={8}>
					<Card.Body>
						<Card.Title>
		 					<Row className="p-3">
		 						<Col lg="1" className="MyCard_NR text-center">{props.ID}</Col>
		 						<Col lg="9" className="MyCard_Title">{props.Title}</Col>
		 						<Col lg="2" className="MyCard_Rating">{props.Rating} <span>&#9733;</span></Col>
		 					</Row>
						</Card.Title>
						<Container>
							<span className="MyCard_Description">{props.Description}</span>

							<ListGroup className="p-3">
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("premiera")}: </span>{props.Year}</ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("rezyseria")}: </span>{props.Director}</ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("produkcja")}: </span>{props.Country}</ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("gatunek")}: </span>{props.Genre}</ListGroup.Item>
							</ListGroup>
							<Container className="text-center">
								<LinkContainer to={"/"+ props.Type +"/" + props.ID}>
									<Card.Link className="MyCard_Link">{t("wiecej_informacji")}</Card.Link>
								</LinkContainer>
							</Container>
						</Container>
					</Card.Body>
				</Col>
			</Row>
		</Row>
	)
}