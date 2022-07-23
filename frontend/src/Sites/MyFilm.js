// Imports
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

// CSS
import '../Styles/MyFilm.css';
import MyLoader from "../Components/MyLoader";

// Code
export default function MyFilm(props) {

	const params = useParams()
	const navigate = useNavigate();


	const dataFilm = useQuery(['Film'], fetchFilmData);
	const dataComments = useQuery(['Comments'], fetchCommentsData);


	async function fetchFilmData() {
		const response = await fetch('/api/film/get/' + params.ID, {
			method: 'GET',
		})
		if (response.status === 404) {
			toast.error("Film nie istnieje!");
			navigate('/');
		}
		return response.json();
	}

	async function fetchCommentsData() {
		const response = await fetch('/api/comments/get/' + params.ID, {
			method: 'GET',
		})
		if (response.status === 404) {
			toast.error("Film nie istnieje!");
			navigate('/');
		}
		return response.json();
	}

	if (dataFilm.isLoading || dataComments.isLoading) return <MyLoader />
	if (dataFilm.error) return toast.error(dataFilm.error);
	if (dataComments.error) return toast.error(dataComments.error);

	return (
		<Container id="MyFilm" className="p-5 ustify-content-center">
			<Col xl="9" id="MyFilm_Title" className="p-3 m-3">
				<Container className="text-center">{dataFilm.data.Title}</Container>
			</Col>
			<Col xl="9" id="MyFilm_Body" className="p-3 m-3 row">
				<Col lg="4" className="MyFilm_Image text-center"><img src={dataFilm.data.Image} alt={dataFilm.data.Title}/></Col>
				<Col lg="8" className="MyFilm_Description  m-0 p-4">
					<div className="text-center">{dataFilm.data.Description}</div><br/>
					<span className="fw-bold">Premiera:</span> {dataFilm.data.Year}<br/>
					<span className="fw-bold">Reżyseria:</span> {dataFilm.data.Director}<br/>
					<span className="fw-bold">Gatunek:</span> {dataFilm.data.Genre}<br/>
					<span className="fw-bold">Czas trwania:</span> {dataFilm.data.Duration} min<br/>
					<span className="fw-bold">Filmweb:</span> <a href={"https://www.filmweb.pl" + dataFilm.data.URL}>Link</a><br/>
				</Col>
			</Col>
			<Col xl="9" id="MyFilm_Comments" className="p-3 m-3">
				<Container className="text-center">Komentarze</Container>
			</Col>
			<Col xl="9" id="MyFilm_CommentsList" className="p-3 m-3">
				<Container className="p-3">
					<Row className="pt-2 pb-0">
						<form>
							<label htmlFor="comment" className="fw-bold">Komentarz:</label>
							<textarea rows="5" className="w-100"></textarea>
							<div className="text-center">
								<button type="submit" className="btn btn-primary">Dodaj</button>
							</div>
						</form>
						<span className="fw-light text-center"></span> <br/>
					</Row>
				</Container>
				{dataComments.data.map(comment => (
					<Container className="p-3">
						<Row className="pt-2 pb-3" >
							<span className="fw-bold col-8">{comment.User}:</span> <br/>
							<span className="fw-light col-2 text-center">
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
							</span> <br/>
							<span className="fw-light col-2 text-center">{comment.Date}</span> <br/>
						</Row>
						<span>{comment.Comment}</span>
					</Container>
				))}
			</Col>
		</Container>
	)

}