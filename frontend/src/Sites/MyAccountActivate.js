// Imports
import React from 'react';
import {Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyAccountActivate.css';

export default function MyAccountActivate() {

	const {t} = useTranslation();
	const navigate = useNavigate();
	const params = useParams()

	useQuery(['ActivateKey'], fetchActivateData);
	async function fetchActivateData() {
		const response = await fetch('/auth/activate/' + params.KEY, {
			method: 'GET',
		})
		if (response.status === 404) {
			toast.error(t("zly_klucz"));
			navigate('/');
		}
		if (response.status === 200) {
			toast.success(t("klucz_aktywowany"));
			navigate('/');
		}
		console.log(params.KEY);
		return response.json();
	}

	return (
		<Container className="justify-content-center p-3 row">
			<Container className="col-8">
				<h1 className="text-center p-5">{t("klucz_aktywowany")}</h1>
			</Container>
		</Container>
	)
}