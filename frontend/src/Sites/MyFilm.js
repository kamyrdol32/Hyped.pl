// Imports
import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import { Rating } from "react-simple-star-rating";
import {useTranslation} from "react-i18next";

// Components
import MyLoader from "../Components/MyLoader";
import MyComments from "../Components/MyComments";

// CSS
import '../Styles/MyFilm.css';
import MyCard from "../Components/MyCard";

// Code
export default function MyFilm(props) {

	const queryClient = useQueryClient()
	const params = useParams()
	const navigate = useNavigate();
	const {t} = useTranslation();

	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0)

	const dataFilm = useQuery(['Film'], fetchFilmData);
	const dataComments = useQuery(['Comments'], fetchCommentsData);
	useQuery(['Rating'], fetchFilmRate, {
		onSuccess: (data) => {
			setRating(data.Rating)
			console.log(data.Rating)
			console.log("TEST")
			props.setToken(data.access_token);
		}
	});

	async function fetchFilmData() {
		const response = await fetch('/api/film/get/' + params.ID, {
			method: 'GET',
		})
		if (response.status === 404) {
			toast.error(t("film_nie_istnieje"));
			navigate('/');
		}
		return response.json();
	}

	async function fetchCommentsData() {
		const response = await fetch('/api/comments/get/film/' + params.ID, {
			method: 'GET',
		})
		if (response.status === 404 || response.status === 401) {
			toast.error(t("film_nie_istnieje"));
			navigate('/');
		}
		return response.json();
	}

	async function fetchFilmRate() {
		if (props.token) {
			const response = await fetch('/api/rating/get/film/' + params.ID, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
					ContentType: 'application/json',
				}
			})
			if (response.status === 404) {
				toast.error(t("film_nie_istnieje"));
				navigate('/');
			}
			if (response.status === 403) {
				toast.error(t("brak_uprawnien"));
				navigate('/');
			}
			return response.json();
		}
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
			toast.error(t("film_nie_istnieje"));
			navigate('/');
		}
		if (response.status === 200) {
			toast.success(t("komentarz_dodany"));
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
			toast.error(t("film_nie_istnieje"));
			navigate('/');
		}
		if (response.status === 200) {
			toast.success(t("ocena_dodana"));
		}
	}

	if (dataFilm.isLoading || dataComments.isLoading) return <MyLoader />
	if (dataFilm.error) return toast.error(dataFilm.error);
	if (dataComments.error) return toast.error(dataComments.error);

	return (
		<Container id="MyFilm" className="p-3 m-0 justify-content-center row">

			<MyCard key={dataFilm.data.ID} Type="Film" ID={dataFilm.data.ID} Image={dataFilm.data.Image} Title={dataFilm.data.Title} Original_Title={dataFilm.data.Original_Title} Duration={dataFilm.data.Duration} Rating={dataFilm.data.Rating} Description={dataFilm.data.Description} Year={dataFilm.data.Year} Director={dataFilm.data.Director} Country={dataFilm.data.Country} Genre={dataFilm.data.Genre} URL={dataFilm.data.URL} />


			<Col xl="9" id="MyFilm_Rate" className="p-3 m-3">
				<Col xl="12" className="">
					<Container className="MyFilm_Title text-center">{t("twoja_ocena")}</Container>
				</Col>
				{props.token ?
					<Container className="p-3 text-center">
						<Rating onClick={sendRating} initialValue={rating} allowHalfIcon={true} />
					</Container>
				:
					<Container className="p-3">
						<Row className="pt-2 pb-0">
							<Container className="text-center fw-bold">{t("zaloguj_ocenianie")}</Container>
						</Row>
					</Container>
				}
			</Col>


			<Col xl="9" id="MyFilm_Comments" className="p-3 m-3">
				<Col xl="12" className="">
					<Container className="MyFilm_Title text-center">{t("komentarze")}</Container>
				</Col>
				{props.token ?
					<Container className="p-3">
						<Row className="pt-2 pb-0">
							<form>
								<label htmlFor="comment" className="fw-bold">{t("komentarz")}:</label>
								<textarea id="MyFilm_TextArea" rows="5" className="w-100" onChange={(event => setComment(event.target.value))}/>
								<div className="text-center">
									<button onClick={sendComment} className="btn btn-primary m-3">{t("dodaj")}</button>
								</div>
							</form>
							<span className="fw-light text-center"/> <br/>
						</Row>
					</Container>
				:
					<Container className="p-3">
						<Row className="pt-2 pb-0">
							<Container className="text-center fw-bold">{t("zaloguj_komentowanie")}</Container>
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