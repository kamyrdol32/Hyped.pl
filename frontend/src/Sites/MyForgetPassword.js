// Imports
import React, {useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyForgetPassword.css';
import {toast} from "react-toastify";

export default function MyForgetPassword() {

	const {t} = useTranslation();
	const [email, setEmail] = useState('');

	async function fetchForgetPassword() {
		const response = await fetch('/auth/forgot_password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
			}),
		});
		const data = await response.json();
		if (response.status === 200) {
			toast.success(t("email_resetowanie_hasla"));
		} else {
			toast.error(data.error);
		}
	}

	return (
		<Container id="MyForgetPassword" className="p-5 justify-content-center">
			<Container className="col-md-4 mb-5">
				<h1 className="MyForgetPassword_Logo text-center"><span className="fa fa-user-circle"></span></h1>
				<h3 className="text-center">{t("zapomniane_haslo")}</h3>
			</Container>
			<Container className="MyForgetPassword_Body col-md-6 mb-5">
				<Form.Group controlId="MyEmail" className="m-3 text-center">
					<Form.Label>E-mail</Form.Label>
					<Form.Control type="email" onChange={event => setEmail(event.target.value)} />
				</Form.Group>
				<Container className="col-8">
					<Form.Group controlId="MySubmit" className="m-3 p-3 pb-0 text-center">
						<Form.Control type="button" value={t("zatwierdz")} onClick={fetchForgetPassword} />
					</Form.Group>
				</Container>
			</Container>
			<Container className="col-md-6 text-center">
				{t("email_resetowanie_hasla")}
			</Container>
		</Container>
	)
}