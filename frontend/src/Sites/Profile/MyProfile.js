// Imports
import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';

// CSS
import './MyProfile.css';




// Components
import MyLoader from "../../Components/Loader/MyLoader";

// Code
export default function MyProfile(props) {

	// States
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		getData()
	}, [])

	function getData() {
		if (props.token) {
			fetch('/auth/profile', {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + props.token
				}
			})
				.then(res => res.json())
				.then(
					(result) => {
						console.log(result);
						result.access_token && props.setToken(result.access_token);

						if (result.username && result.email) {
							setUsername(result.username);
							setEmail(result.email);
							setIsLoaded(true);
						} else {
							setIsLoaded(false);
						}
					},
					(error) => {
						setError(error);
					}
				);
		} else {
			setTimeout(() => {
				window.location.href = '/';
			}, 3000);
		}
	}

	function logout() {
		fetch('/auth/logout', {
			method: 'GET',
		})
			.then(res => res.json())
			.then(
				() => {
					props.removeToken()
				},
				(error) => {
					setError(error);
					console.log(error);
				}
			);
	}
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <MyLoader />;
    } else {
	    return (
		    <Container className="p-5 justify-content-center row">
			    <Container id="MyProfile" className="col-md-8">
				    <h1 className="MyProfile_Logo text-center"><span className="MyProfile_Logo fa fa-user-circle"/></h1>
				    <h3 className="MyProfile_Header text-center">Mój profil</h3>
				    <a onClick={logout}>Wyloguj</a>
				    <h5>{error}</h5>
				    <Container className="m-4">
					    <div className="MyProfile_Info p-3">
						    <div className="MyProfile_Info_Title">Username</div>
						    <div className="MyProfile_Info_Value">{username}</div>
					    </div>
					    <div className="MyProfile_Info p-3">
						    <div className="MyProfile_Info_Title">Adres e-mail</div>
						    <div className="MyProfile_Info_Value">{email}</div>
					    </div>
					    <div className="MyProfile_Info p-3">
						    <div className="MyProfile_Info_Title">Numer telefonu</div>
						    <div className="MyProfile_Info_Value">123-456-789</div>
					    </div>
					    <div className="MyProfile_Info p-3">
						    <div className="MyProfile_Info_Title">Adres</div>
						    <div className="MyProfile_Info_Value">ul. Krakowska</div>
					    </div>
				    </Container>
			    </Container>
		    </Container>
	    )
    }
}