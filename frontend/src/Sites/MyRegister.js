// Imports
import React, {useState} from 'react';
import {Container, Form} from "react-bootstrap";

// CSS
import '../Styles/MyRegister.css';

// Code
export default function MyRegister() {
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirm, setPassword_confirm] = useState('');

	function sendData() {
		console.log(email, username, password);
		fetch("/auth/register", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"username": username, "email": email, "password": password, "password_confirm": password_confirm})
		})
            .then(res => res.json())
            .then(
				(result) => {
					console.log(result);
					setResult(result.success);
					setError(result.error);
                },

                (error) => {
                    setError(error);
                    console.log(error);
                }
			);
	}

	return(
		<Container id="MyRegister" className="p-5 justify-content-center">
			<Container className="col-md-4 mb-5">
				<h1 className="MyLogin_Logo text-center"><span className="fa fa-user-circle"></span></h1>
				<h3 className="text-center">System rejestracji</h3>
			</Container>
			<Container className="col-md-4">
				<Form className="MyLogin_Form pt-2">
					<Form.Group controlId="MyEmail" className="m-3 text-center">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" onChange={event => setEmail(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MyUsername" className="m-3 text-center">
						<Form.Label>Nazwa użytkownika</Form.Label>
						<Form.Control type="text" onChange={event => setUsername(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MyPassword" className="m-3 text-center">
						<Form.Label>Hasło</Form.Label>
						<Form.Control type="password" onChange={event => setPassword(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MyPasswordRepeat" className="m-3 text-center">
						<Form.Label>Powtórz hasło</Form.Label>
						<Form.Control type="password" onChange={event => setPassword_confirm(event.target.value)} />
					</Form.Group>
					<Form.Group controlId="MySubmit" className="m-3 p-3 pb-0 mb-2 text-center">
						<Form.Control type="button" value="Zarejestruj" onClick={sendData} />
					</Form.Group>
					<div className="MyLogin_Return text-center text-success pb-4 fw-bolder">{result}</div>
					<div className="MyLogin_Return text-center text-danger pb-4 fw-bolder">{error}</div>
				</Form>
			</Container>
			<Container className="col-md-4 p-3">
				<div className="MyLogin_Info text-center">
					<Container className="mt-3">
						<p>
							Masz konto? <a href="/login">Zaloguj się</a>
						</p>
					</Container>

				</div>
			</Container>
		</Container>
	);
}