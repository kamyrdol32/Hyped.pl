// Imports
import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

// Components
import MyLoader from '../Components/MyLoader';
import MyCardList from "../Components/MyCardList";


// Code
export default function MySerialList() {

    let page = 1;
    const queryClient = useQueryClient()

    const [serials, setSerials] = useState([]);
    const {isLoading, isError} = useQuery(['Serials'], fetchSerials, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setSerials(oldSerials => [...oldSerials, ...data]);
        }
    });
    async function fetchSerials() {
        const response = await fetch('/api/serials/get/' + page)
        page++;
        return response.json();
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            queryClient.invalidateQueries('Serials')
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
            {/*<Row>*/}
                {serials.map(serial => (
                    <MyCardList key={serial.ID} Type="Serial" ID={serial.ID} Image={serial.Image} Title={serial.Title} Original_Title={serial.Original_Title} Rating={serial.Rating} Description={serial.Description} Year={serial.Year} Director={serial.Director} Country={serial.Country} Genre={serial.Genre} />
                ))}
            {/*</Row>*/}
        </Container>
    )
}