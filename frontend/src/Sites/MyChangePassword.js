// Imports
import React, {useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

// CSS
import '../Styles/MyChangePassword.css';

export default function MyChangePassword(props) {

	const {t} = useTranslation();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPassword2, setNewPassword2] = useState('');

	async function fetchChangePassword() {
		const response = await fetch('https://hyped-backend:5003/auth/change_password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				old_password: oldPassword,
				new_password: newPassword,
				new_password2: newPassword2,
			})
		})
		const data = await response.json();

		if (response.status === 200) {
			toast.success(t("haslo_zostalo_zmienione"));
			fetchLogout();
		}
		if (data.error) {
			toast.error(data.error);
		}
		return data;
	}

	async function fetchLogout() {
		const response = await fetch('https://hyped-backend:5003/auth/logout', {
			method: 'GET',
		})
		if (response.status === 200) {
			props.setToken();
			navigate('/');
		} else {
			toast.error("ERROR");
		}
	}

	return (
		<Container id="MyChangePassword" className="p-5 justify-content-center">
			<Container className="col-md-4 mb-5">
				<h1 className="MyChangePassword_Logo text-center"><span className="fa fa-user-circle"></span></h1>
				<h3 className="text-center">{t("zmien_haslo")}</h3>
			</Container>
			<Container className="MyChangePassword_Body col-md-4 mb-5">
				<Form.Group controlId="MyUsername" className="m-4 text-center">
					<Form.Label>{t("nazwa_uzytkownika")}</Form.Label>
					<Form.Control type="text" onChange={event => setUsername(event.target.value)} />
				</Form.Group>
				<Form.Group controlId="MyActualPassword" className="m-4 text-center">
					<Form.Label>{t("aktualne_haslo")}</Form.Label>
					<Form.Control type="password" onChange={event => setOldPassword(event.target.value)} />
				</Form.Group>
				<Form.Group controlId="MyNewPassword" className="m-4 text-center">
					<Form.Label>{t("nowe_haslo")}</Form.Label>
					<Form.Control type="password" onChange={event => setNewPassword(event.target.value)} />
				</Form.Group>
				<Form.Group controlId="MyConfirmPassword" className="m-4 text-center">
					<Form.Label>{t("nowe_haslo")}</Form.Label>
					<Form.Control type="password" onChange={event => setNewPassword2(event.target.value)} />
				</Form.Group>
				<Container className="col-8">
					<Form.Group controlId="MySubmit" className="m-3 p-3 pb-0 text-center">
						<Form.Control type="button" value={t("zatwierdz")} onClick={fetchChangePassword} />
					</Form.Group>
				</Container>
			</Container>
		</Container>
	)
}