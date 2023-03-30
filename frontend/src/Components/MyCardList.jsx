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

	const {t, i18n} = useTranslation();
	const language = i18n.language;

	return (
		<Row className="justify-content-center p-3">
			<Row className="MyCard col-9 p-0">

				<Col lg={4} className="p-0">
					<a href={"/"+ props.Type +"/" + props.ID}>
						<Card.Img className="MyCard_Img" src={props.Image} alt={props.Title} />
					</a>
				</Col>
				<Col lg={8}>
					<Card.Body>
						<Card.Title>
		 					<Row className="p-3">
		 						<Col lg="1" className="MyCard_NR text-center">{props.ID}</Col>
							    {language === 'pl' ?
		 						    <Col lg="9" className="MyCard_Title">{props.Title}</Col>
								:
									<Col lg="9" className="MyCard_Title">{props.Original_Title}</Col>
								}
		 						<Col lg="2" className="MyCard_Rating">{props.Rating} <span>&#9733;</span></Col>
		 					</Row>
						</Card.Title>
						<Container>
							{language === 'pl' ?
								<span className="MyCard_Description">{props.Description}</span>
							:
								<span className="MyCard_Description">
									Donec fermentum elit et scelerisque vestibulum. Suspendisse at nulla sed mi pulvinar dignissim non et dolor. Curabitur erat erat, maximus nec ipsum nec, mattis dapibus erat. Praesent laoreet ipsum velit, at semper est scelerisque in. Aenean placerat eu nisl non convallis. Integer at elit ut sem lobortis ultricies.
								</span>
							}

							<ListGroup className="p-3">
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("premiera")}: </span>{props.Year}</ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("rezyseria")}: </span>{props.Director}</ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("produkcja")}: </span>{props.Country}</ListGroup.Item>
								<ListGroup.Item className="MyCard_ListGroup"><span className="fw-bold">{t("gatunek")}: </span>{props.Genre}</ListGroup.Item>
							</ListGroup>
							<Container className="text-center pb-3">
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