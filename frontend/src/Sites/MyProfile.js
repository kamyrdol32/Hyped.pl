// Imports
import React, {useState} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import MyLoader from "../Components/MyLoader";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import MyProfileRating from "../Components/MyProfileRating";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyProfile.css';


// Code
export default function MyProfile(props) {

	// States
	const {t} = useTranslation();
	const navigate = useNavigate();

	const [isLogged, setIsLogged] = useState(false);
	const dataRating = useQuery(['Rating'], fetchRating);
    const dataProfile = useQuery(['Profile'], fetchProfile, {
		onSuccess: (data) => {
			props.setToken(data.access_token);
		}
	});


	async function fetchProfile() {
		const response = await fetch('/auth/profile', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + props.token,
				ContentType: 'application/json',
			}
		})
		if (response.status === 422 || response.status === 401) {
			toast.error(t("prosze_sie_zalogowac"));
			props.setToken();
			navigate('/login');
		}
		if (response.status === 200) {
			setIsLogged(true);
		}
		return response.json();
	}

	async function fetchRating() {
		const response = await fetch('/api/rating/get_all', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + props.token,
				ContentType: 'application/json',
			}
		})
		if (response.status === 422 || response.status === 401) {
			toast.error(t("prosze_sie_zalogowac"));
			props.setToken();
			navigate('/login');
		}
		return response.json();
	}

	async function fetchLogout() {
		const response = await fetch('/auth/logout', {
			method: 'GET',
		})
		if (response.status === 200) {
			toast.success(t("wylogowano_pomyslnie"));
			props.setToken();
			navigate('/');
		} else {
			toast.error("ERROR");
		}
	}

	function navigateToChangePassword() {
		navigate('/change_password');
	}

	if (dataProfile.isLoading || dataRating.isLoading || !isLogged) return <MyLoader />
	if (dataProfile.error) return toast.error(dataProfile.error);
	if (dataRating.error) return toast.error(dataRating.error);

	return (
		<Container className="p-5 justify-content-center row">

			<Col md="9" id="MyProfile" className="p-3 m-3">
				<h1 className="MyProfile_Logo text-center"><span className="MyProfile_Logo fa fa-user-circle"/></h1>
				<h3 className="MyProfile_Header text-center">{t("moj_profil")}</h3>
				<Container className="MyProfile_Logout text-center p-2">
					<Button onClick={fetchLogout}>{t("wyloguj")}</Button>
				</Container>
				<Container className="MyProfile_Logout text-center p-2">
					<Button onClick={navigateToChangePassword}>{t("zmien_haslo")}</Button>
				</Container>
				<Container className="m-4">
					<div className="MyProfile_Info p-3">
						<div className="MyProfile_Info_Title">{t("nazwa_uzytkownika")}</div>
						<div className="MyProfile_Info_Value">{dataProfile.data.username}</div>
					</div>
					<div className="MyProfile_Info p-3">
						<div className="MyProfile_Info_Title">E-mail</div>
						<div className="MyProfile_Info_Value">{dataProfile.data.email}</div>
					</div>
				</Container>
			</Col>

			<Col md="9" id="MyProfile_Films" className="p-3 m-3">
				<h3 className="MyProfile_Films_Header text-center p-5">{t("obejrzano")}</h3>
				<div className="MyProfile_Films_List p-3">
					{dataRating.data.map((rating) => (
						<MyProfileRating key={rating.ID} Type={rating.Type} ID={rating.DataID} Title={rating.DataName} Rating={rating.Rating}/>
					))}
				</div>
			</Col>

		</Container>
	)
}