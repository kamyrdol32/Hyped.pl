// Imports
import React, {useState} from 'react';
import {Container, Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

// CSS
import '../Styles/MyLogin.css';

// Code
export default function MyLogin(props) {

	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function fetchLogin() {
		const response = await fetch('/auth/login', {
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
			toast.success("Zalogowano pomyslnie!");
		} else {
			toast.error(data.error);
		}
	}

	return(
		<Container id="MyLogin" className="p-5 justify-content-center">
			<Container className="col-md-4 mb-5">
				<h1 className="MyLogin_Logo text-center"><span className="fa fa-user-circle"></span></h1>
				<h3 className="text-center">System logowania</h3>
			</Container>
			<Container className="col-md-4">
				<Form className="MyLogin_Form pt-2">
					<Form.Group controlId="MyUsername" className="m-3 text-center">
						<Form.Label>Nazwa użytkownika</Form.Label>
						<Form.Control type="text" onChange={event => setUsername(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MyPassword" className="m-3 text-center">
						<Form.Label>Hasło</Form.Label>
						<Form.Control type="password" onChange={event => setPassword(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MySubmit" className="m-3 p-3 pb-0 text-center">
						<Form.Control type="button" value="Zaloguj" onClick={fetchLogin} />
					</Form.Group>
				</Form>
			</Container>
			<Container className="col-md-4 p-3">
				<div className="MyLogin_Info text-center">
					<Container className="mt-3">
						<p>
							Nie masz jeszcze konta? <a href="/register">Zarejestruj się</a>
						</p>
					</Container>
					<Container className="mt-3">
						<p>
							Zapomniałeś hasła? <a href="/forgot">Zresetuj hasło</a>
						</p>
					</Container>
				</div>
			</Container>
		</Container>
	);
}