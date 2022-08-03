// Imports
import React from 'react';
import {Col, Container, Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyCard.css';

export default function MyCard(props) {

	const {t} = useTranslation();

	return (
		<Container className="p-3 m-0 justify-content-center row">
			<Col xl="9" id="MyFilm_Header" className="p-3 m-0">
				<Container className="MyFilm_Title text-center">{props.Title}</Container>
			</Col>
			<Col xl="9" id="MyFilm_Body" className="p-3 m-0 row">
			<Col lg="4" className="MyFilm_Image p-3 text-center"><Image src={props.Image} alt={props.Title}/></Col>
				<Col lg="8" className="MyFilm_Description p-3">
					<div className="text-center">{t("new_key", "Witaj świecie")}</div><br/>
					<span className="fw-bold">{t("premiera")}:</span> {props.Year}<br/>
					<span className="fw-bold">{t("rezyseria")}:</span> {props.Director}<br/>
					<span className="fw-bold">{t("gatunek")}:</span> {props.Genre}<br/>
					<span className="fw-bold">{t("czas_trwania")}:</span> {props.Duration} min<br/>
					<span className="fw-bold">Filmweb:</span> <a href={"https://www.filmweb.pl" + props.URL}>Link</a><br/>
				</Col>
			</Col>
		</Container>
	)
}