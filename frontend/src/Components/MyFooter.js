// Imports
import React from 'react';
import {Container} from "react-bootstrap";

// CSS
import '../Styles/MyFooter.css';

export default function MyFooter() {
	return (
		<Container fluid id="MyFooter">
			<Container className="pt-4 pb-2">
				<Container className="text-center">

					<a href="https://www.facebook.com/kamil.zeglen.1/" className="MyFooter_Icon">
						<i className="icon fab fa-facebook" aria-hidden="true"></i>
					</a>
					<a href="https://github.com/kamyrdol32" className="MyFooter_Icon">
						<i className="icon fab fa-github" aria-hidden="true"></i>
					</a>
					<a href="https://www.linkedin.com/in/kamil%C5%BCegle%C5%84/" className="MyFooter_Icon">
						<i className="icon fab fa-linkedin" aria-hidden="true"></i>
					</a>

				</Container>
				<Container className="MyFooter_Text text-center pt-3 pb-2 mb-0">
					<p>Praca Magisterska - Kamil Żegleń</p>
				</Container>
			</Container>
		</Container>
	)
}