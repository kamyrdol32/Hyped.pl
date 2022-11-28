// Imports
import React, {useState} from 'react';
import {Carousel, Container} from "react-bootstrap";
import {useQuery} from "@tanstack/react-query";
import MyLoader from "../Components/MyLoader";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

// CSS
import '../Styles/MyHome.css';

// Code
export default function MyHome() {
	const {t} = useTranslation();

	const [index, setIndex] = useState(0);
	const {data, isLoading, isError, error} = useQuery(['Newses'], fetchNewses);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	async function fetchNewses() {
		const response = await fetch('https://localhost:5003/api/news/get', {
			method: 'GET',
		})
		return response.json();
	}

	if (isLoading) return <MyLoader />
	if (isError) return toast.error(error);

	return(
		<Container className="justify-content-center p-5 row">
			<Container id="MyHome" className="col-12">

				<Carousel fade className="p-3" activeIndex={index} interval={null} onSelect={handleSelect}>
					{data.map((item, index) => (
						<Carousel.Item key={item.ID}>
							<img
								className="d-block w-100"
								src={item.Image}
								alt={item.Title}
							/>
							<Carousel.Caption>
								<h3 className="PhoneDispleyNone">{item.Title}</h3>
								<p className="PhoneDispleyNone">{item.Description}</p>
							</Carousel.Caption>
						</Carousel.Item>
					))}
				</Carousel>
				<Container className="MyHome_Container p-3 ">
					<Container className="MyHome_Title p-3 text-center">{data[index].Description}</Container>
					<Container className="MyHome_Text p-3">{data[index].Text}</Container>
					<Container className="MyHome_Footer p-3 text-center">
						<a className="MyHome_Link" href={"https://www.filmweb.pl" + data[index].URL}>{t("wiecej_informacji")}</a>
					</Container>
				</Container>
			</Container>
		</Container>
	);
}