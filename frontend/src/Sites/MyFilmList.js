// Imports
import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

// Components
import MyLoader from '../Components/MyLoader';
import MyCardList from "../Components/MyCardList";


// Code
export default function MyFilmList() {

    let page = 1;
    const queryClient = useQueryClient()

    const [films, setFilms] = useState([]);
    const {isLoading, isError} = useQuery(['Films'], fetchFilms, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setFilms(oldFilms => [...oldFilms, ...data]);
        }
    });
    async function fetchFilms() {
        const response = await fetch('/api/films/get/' + page)
        page++;
        return response.json();
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            queryClient.invalidateQueries('Films')
            window.removeEventListener('scroll', handleScroll);
            setInterval(() => {
                window.addEventListener('scroll', handleScroll);
            }, 1000);
        }
    }

    if (isLoading) return <MyLoader />
	if (isError) return toast.error(isError);

    return (
        <Container>
            <Row>
                {films.map(film => (
                    <MyCardList key={film.ID} Type="Film" ID={film.ID} Image={film.Image} Title={film.Title} Original_Title={film.Original_Title} Rating={film.Rating} Description={film.Description} Year={film.Year} Director={film.Director} Country={film.Country} Genre={film.Genre}  />
                ))}
            </Row>
        </Container>
    )
}