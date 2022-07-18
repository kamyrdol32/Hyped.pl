// Imports
import React from 'react';
import {Container, Form} from "react-bootstrap";

// CSS
import './MyLogin.css';

// Code
export default function MyLogin() {
	return(
		<Container id="MyLogin" className="p-5 justify-content-center">
			<Container className="col-md-4 mb-5">
				<h1 className="MyLogin_Logo text-center"><span className="fa fa-user-circle"></span></h1>
				<h3 className="text-center">System logowania</h3>
			</Container>
			<Container className="col-md-4">
				<Form className="MyLogin_Form pt-2">
					<Form.Group controlId="MyEmail" className="m-3 text-center">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" />
					</Form.Group>
					<Form.Group controlId="MyUsername" className="m-3 text-center">
						<Form.Label>Nazwa użytkownika</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
					<Form.Group controlId="MyPassword" className="m-3 text-center">
						<Form.Label>Hasło</Form.Label>
						<Form.Control type="password" />
					</Form.Group>
					<Form.Group controlId="MySubmit" className="m-3 p-3 text-center">
						<Form.Control type="submit" value="Zaloguj" />
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