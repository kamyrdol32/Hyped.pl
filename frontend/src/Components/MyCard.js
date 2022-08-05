// Imports
import React from 'react';
import {Col, Container, Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyCard.css';

export default function MyCard(props) {

	const {t, i18n} = useTranslation();
	const language = i18n.language;

	return (
		<Container className="p-3 m-0 justify-content-center row">
			<Col xl="9" id="MyFilm_Header" className="p-3 m-0">
				<Container className="MyFilm_Title text-center">{props.Title}</Container>
			</Col>
			<Col xl="9" id="MyFilm_Body" className="p-3 m-0 row">
			<Col lg="4" className="MyFilm_Image p-3 text-center"><Image src={props.Image} alt={props.Title}/></Col>
				<Col lg="8" className="MyFilm_Description p-3">
					{language === 'pl' ?
						<div className="p-3 text-center">{props.Description}</div>
						:
						<div className="p-3 text-center">
							Donec fermentum elit et scelerisque vestibulum. Suspendisse at nulla sed mi pulvinar dignissim non et dolor. Curabitur erat erat, maximus nec ipsum nec, mattis dapibus erat. Praesent laoreet ipsum velit, at semper est scelerisque in. Aenean placerat eu nisl non convallis. Integer at elit ut sem lobortis ultricies. Sed non rutrum dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ut tincidunt odio, ac viverra risus.
						</div>
					}
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