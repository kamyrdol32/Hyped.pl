// Imports
import React from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import MyLoader from "../Components/MyLoader.jsx";
import {toast} from "react-toastify";

// CSS
import '../Styles/MySearch.css';
import MyCardList from "../Components/MyCardList.jsx";

export default function MySearch() {

	const params = useParams()

	const {data, isLoading, isError, error} = useQuery(['Search'], fetchSearchData);
	async function fetchSearchData() {
		const response = await fetch('/api/search/' + params.NAME, {
			method: 'GET',
		})
		return response.json();
	}

	console.log(data)

	if (isLoading) return <MyLoader />
	if (isError) {toast(error)}

	return (
		<Container id="MySearch">
			<Container className="p-3 text-center">
				{data.map((film) => {
					return <MyCardList key={film.ID} Type={film.Type} ID={film.ID} Image={film.Image} Title={film.Title} Original_Title={film.Original_Title} Rating={film.Rating} Description={film.Description} Year={film.Year} Director={film.Director} Country={film.Country} Genre={film.Genre}  />
				})}

			</Container>
		</Container>
	)
}