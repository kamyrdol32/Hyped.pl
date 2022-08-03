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
import '../Styles/MySerial.css';
import MyCard from "../Components/MyCard";

// Code
export default function MySerial(props) {

	const queryClient = useQueryClient()
	const params = useParams()
	const navigate = useNavigate();
	const {t} = useTranslation();

	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0)

	const dataSerial = useQuery(['Serial'], fetchSerialData);
	const dataComments = useQuery(['Comments'], fetchCommentsData);
	useQuery(['Rating'], fetchSerialRate, {
		onSuccess: (data) => {
			setRating(data.Rating)
			props.setToken(data.access_token);
		}
	});

	async function fetchSerialData() {
		const response = await fetch('/api/serial/get/' + params.ID, {
			method: 'GET',
		})
		if (response.status === 404) {
			toast.error(t("serial_nie_istnieje"));
			navigate('/');
		}
		return response.json();
	}

	async function fetchCommentsData() {
		const response = await fetch('/api/comments/get/serial/' + params.ID, {
			method: 'GET',
		})
		if (response.status === 404 || response.status === 401) {
			toast.error(t("serial_nie_istnieje"));
			navigate('/');
		}
		return response.json();
	}

	async function fetchSerialRate() {
		if (props.token) {
			const response = await fetch('/api/rating/get/serial/' + params.ID, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
					ContentType: 'application/json',
				}
			})
			if (response.status === 404) {
				toast.error(t("serial_nie_istnieje"));
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
				type: "serial",
			}),
		})
		if (response.status === 404 || response.status === 401) {
			toast.error(t("serial_nie_istnieje"));
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
				type: "serial",
			}),
		})
		if (response.status === 404 || response.status === 401) {
			toast.error(t("serial_nie_istnieje"));
			navigate('/');
		}
		if (response.status === 200) {
			toast.success("Ocena została dodana!");
		}
	}

	if (dataSerial.isLoading || dataComments.isLoading) return <MyLoader />
	if (dataSerial.error) return toast.error(dataSerial.error);
	if (dataComments.error) return toast.error(dataComments.error);

	return (
		<Container id="MyFilm" className="p-3 m-0 justify-content-center row">

			<MyCard key={dataSerial.data.ID} Type="Film" ID={dataSerial.data.ID} Image={dataSerial.data.Image} Title={dataSerial.data.Title} Original_Title={dataSerial.data.Original_Title} Duration={dataSerial.data.Duration} Rating={dataSerial.data.Rating} Description={dataSerial.data.Description} Year={dataSerial.data.Year} Director={dataSerial.data.Director} Country={dataSerial.data.Country} Genre={dataSerial.data.Genre} />


			<Col xl="9" id="MyFilm_Rate" className="p-3 m-3">
				<Col xl="12" className="">
					<Container className="MyFilm_Title text-center">{t("twoja_ocena")}</Container>
				</Col>
				{props.token ?
					<Container className="p-3 text-center">
						<Rating onClick={sendRating} ratingValue={rating} allowHalfIcon={true} />
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