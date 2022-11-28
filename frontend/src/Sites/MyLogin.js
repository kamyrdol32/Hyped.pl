// Imports
import React, {useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyLogin.css';

// Code
export default function MyLogin(props) {

	const navigate = useNavigate();
	const {t} = useTranslation();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function fetchLogin() {
		const response = await fetch('https://hyped-backend:5003/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});
		const data = await response.json();
		if (response.status === 200) {
			props.setToken(data.access_token);
			navigate('/');
			toast.success(t("zalogowano_pomyslnie"));
		} else {
			toast.error(data.error);
		}
	}

	return(
		<Container id="MyLogin" className="p-5 justify-content-center">
			<Container className="col-md-4 mb-5">
				<h1 className="MyLogin_Logo text-center"><span className="fa fa-user-circle"></span></h1>
				<h3 className="text-center">{t("system_logowania")}</h3>
			</Container>
			<Container className="col-md-4">
				<Form className="MyLogin_Form pt-2">
					<Form.Group controlId="MyUsername" className="m-3 text-center">
						<Form.Label>{t("nazwa_uzytkownika")}</Form.Label>
						<Form.Control type="text" onChange={event => setUsername(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MyPassword" className="m-3 text-center">
						<Form.Label>{t("haslo")}</Form.Label>
						<Form.Control type="password" onChange={event => setPassword(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MySubmit" className="m-3 p-3 pb-0 text-center">
						<Form.Control type="button" value={t("zaloguj")} onClick={fetchLogin} />
					</Form.Group>
				</Form>
			</Container>
			<Container className="col-md-4 p-3">
				<div className="MyLogin_Info text-center">
					<Container className="mt-3">
						<p>
							{t("nie_masz_konta")} <a href="/register">{t("zarejestruj_sie")}</a>
						</p>
					</Container>
					<Container className="mt-3">
						<p>
							{t("zapomniales_hasla")} <a href="/forgot">{t("zresetuj_haslo")}</a>
						</p>
					</Container>
				</div>
			</Container>
		</Container>
	);
}