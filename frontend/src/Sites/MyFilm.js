// Imports
import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import { Rating } from "react-simple-star-rating";

// Components
import MyLoader from "../Components/MyLoader";
import MyComments from "../Components/MyComments";

// CSS
import '../Styles/MyFilm.css';

// Code
export default function MyFilm(props) {

	const queryClient = useQueryClient()
	const params = useParams()
	const navigate = useNavigate();

	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0)

	const dataFilm = useQuery(['Film'], fetchFilmData);
	const dataComments = useQuery(['Comments'], fetchCommentsData);
	const dataRating = useQuery(['Rating'], fetchFilmRate, {
		onSuccess: (data) => {
			console.log(data)
			setRating(data.Rating)
			props.setToken(data.access_token);
		}
	});


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
		if (response.status === 404 || response.status === 401) {
			toast.error("Film nie istnieje!");
			navigate('/');
		}
		return response.json();
	}

	async function fetchFilmRate() {
		const response = await fetch('/api/rating/get/' + params.ID, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token'),
				ContentType: 'application/json',
			}
		})
		if (response.status === 404) {
			toast.error("Film nie istnieje!");
			navigate('/');
		}
		if (response.status === 403) {
			toast.error("Nie masz uprawnień do tego filmu!");
			navigate('/');
		}
		return response.json();
	}

	async function sendComment() {
		const response = await fetch('/api/comments/add/' + params.ID, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + props.token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				comment: comment,
				type: "film",
			}),
		})
		if (response.status === 404 || response.status === 401) {
			toast.error("Film nie istnieje!");
			navigate('/');
		}
		if (response.status === 200) {
			toast.success("Komentarz został dodany!");
			setComment("");
			document.getElementById("MyFilm_TextArea").value = "";
			await queryClient.invalidateQueries('Comments');
		}
	}

	async function sendRating(rating) {
		setRating(rating)
		const response = await fetch('/api/rating/add/' + params.ID, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + props.token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				rating: rating,
				type: "film",
			}),
		})
		if (response.status === 404 || response.status === 401) {
			toast.error("Film nie istnieje!");
			navigate('/');
		}
		if (response.status === 200) {
			toast.success("Ocena została dodana!");
		}
	}

	if (dataFilm.isLoading || dataComments.isLoading) return <MyLoader />
	if (dataFilm.error) return toast.error(dataFilm.error);
	if (dataComments.error) return toast.error(dataComments.error);

	return (
		<Container id="MyFilm" className="p-5 ustify-content-center">
			<Col xl="9" id="MyFilm_Header" className="p-3 m-3">
				<Container className="MyFilm_Title text-center">{dataFilm.data.Title}</Container>
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


			<Col xl="9" id="MyFilm_Rate" className="p-3 m-3">
				<Col xl="12" className="">
					<Container className="MyFilm_Title text-center">Twoja ocena</Container>
				</Col>
				{props.token ?
					<Container className="p-3 text-center">
						<Rating onClick={sendRating} ratingValue={rating} allowHalfIcon={true} />
					</Container>
				:
					<Container className="p-3">
						<Row className="pt-2 pb-0">
							<Container className="text-center fw-bold">Zaloguj się, aby oceniać!</Container>
						</Row>
					</Container>
				}
			</Col>


			<Col xl="9" id="MyFilm_Comments" className="p-3 m-3">
				<Col xl="12" className="">
					<Container className="MyFilm_Title text-center">Komentarze</Container>
				</Col>
				{props.token ?
					<Container className="p-3">
						<Row className="pt-2 pb-0">
							{/*<form>*/}
								<label htmlFor="comment" className="fw-bold">Komentarz:</label>
								<textarea id="MyFilm_TextArea" rows="5" className="w-100" onChange={(event => setComment(event.target.value))}/>
								<div className="text-center">
									<button onClick={sendComment} className="btn btn-primary m-3">Dodaj</button>
								</div>
							{/*</form>*/}
							<span className="fw-light text-center"/> <br/>
						</Row>
					</Container>
				:
					<Container className="p-3">
						<Row className="pt-2 pb-0">
							<Container className="text-center fw-bold">Zaloguj się, aby komentować</Container>
						</Row>
					</Container>
				}
				{dataComments.data.map(comment => (
					<MyComments key={comment.ID} User={comment.User} Date={comment.Date} Comment={comment.Comment} />
				))}
			</Col>
		</Container>
	)
}