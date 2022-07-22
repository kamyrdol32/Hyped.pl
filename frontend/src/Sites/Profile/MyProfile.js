// Imports
import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";

// CSS
import './MyProfile.css';
import MyLoader from "../../Components/Loader/MyLoader";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


// Code
export default function MyProfile(props) {

	// States
	const navigate = useNavigate();

	const [isLogged, setIsLogged] = useState(false);
    const { isLoading, error, data } = useQuery(['Profile'], fetchProfile);

	async function fetchProfile() {
		const response = await fetch('/auth/profile', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + props.token,
				ContentType: 'application/json',
			}
		})
		if (response.status === 422 || response.status === 401) {
			toast.error("Prosze sie zalogowac!");
			navigate('/login');
		} else {
			setIsLogged(true);
		}
		return response.json();
	}

	if (isLoading || !isLogged) return <MyLoader />
	if (error) return toast.error(error);

	return (
		<Container className="p-5 justify-content-center row">
			<Container id="MyProfile" className="col-md-8">
				<h1 className="MyProfile_Logo text-center"><span className="MyProfile_Logo fa fa-user-circle"/></h1>
				<h3 className="MyProfile_Header text-center">Mój profil</h3>
				<button>Wyloguj</button>
				<Container className="m-4">
					<div className="MyProfile_Info p-3">
						<div className="MyProfile_Info_Title">Username</div>
						<div className="MyProfile_Info_Value">{data.username}</div>
					</div>
					<div className="MyProfile_Info p-3">
						<div className="MyProfile_Info_Title">Adres e-mail</div>
						<div className="MyProfile_Info_Value">{data.email}</div>
					</div>
					<div className="MyProfile_Info p-3">
						<div className="MyProfile_Info_Title">Numer telefonu</div>
						<div className="MyProfile_Info_Value">{data.phone}</div>
					</div>
					<div className="MyProfile_Info p-3">
						<div className="MyProfile_Info_Title">Adres</div>
						<div className="MyProfile_Info_Value">{data.adress}</div>
					</div>
				</Container>
			</Container>
		</Container>
	)
}