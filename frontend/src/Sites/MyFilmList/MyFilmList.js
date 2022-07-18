// Imports
import React, {useEffect, useState} from 'react';

// Components
import MyLoader from './../../Components/Loader/MyLoader';
import MyCard from "../../Components/Card/MyCard";

// CSS
import './MyFilmList.css';
import {Container} from "react-bootstrap";

// Code
export default function MyFilmList() {
	let page = 1;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [films, setFilms] = useState([]);

	const loadFilms = () => {
        fetch("/api/films/get/" + page)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setFilms(oldFilms => [...oldFilms, ...result]);
                    console.log(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        page++;
    }

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            loadFilms();
            window.removeEventListener('scroll', handleScroll);
            setInterval(() => {
                window.addEventListener('scroll', handleScroll);
            }, 1000);
        }
    }

    useEffect(() => {
        loadFilms();
        window.addEventListener('scroll', handleScroll);
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <MyLoader />;
    } else {
        return (
            <Container>
                {films.map(data => (
                    <MyCard key={data.ID} ID={data.ID} Image={data.Image} Title={data.Title} Rating={data.Rating} Description={data.Description} Year={data.Year} Director={data.Director} Country={data.Country} Genre={data.Genre} />
                ))}
            </Container>
        );
    }
}