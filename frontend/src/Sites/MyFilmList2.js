// Imports
import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

// Components
import MyLoader from '../Components/MyLoader';
import MyCard from "../Components/MyCard";

// CSS
import '../Styles/MyFilmList.css';

// Code
export default function MyFilmList() {

	let page = 1;
    const queryClient = useQueryClient()

    const [films, setFilms] = useState([]);

    const { data, isLoading, error } = useQuery(['FilmList'], fetchFilmList, {
        onSuccess: (data) => {
            console.log(data);
            setFilms(oldFilms => [...oldFilms, ...data]);
        }
    });

	async function fetchFilmList() {
        const response = await fetch("/api/films/get/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        page++;
        return response.json();
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            window.removeEventListener('scroll', handleScroll);
            queryClient.invalidateQueries('FilmList');
            setInterval(() => {
                window.addEventListener('scroll', handleScroll);
            }, 1000);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    if (isLoading) return <MyLoader />
    if (error) return toast.error(error);

    return (
        <Container>
            {data.map(data => (
                <MyCard key={data.ID} ID={data.ID} Image={data.Image} Title={data.Title} Rating={data.Rating} Description={data.Description} Year={data.Year} Director={data.Director} Country={data.Country} Genre={data.Genre} />
            ))}
        </Container>
    );
}