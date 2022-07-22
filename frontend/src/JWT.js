import { useState } from 'react';
import jwt_decode from "jwt-decode";

function useToken() {
	const [token, setToken] = useState(getToken());


	function getToken() {
		const userToken = localStorage.getItem('token') || null;
		if (userToken) {
			if (jwt_decode (userToken).exp * 1000 < Date.now ()) {
				localStorage.removeItem("token");
				return false;
			}
		}
		return userToken && userToken
	}


	function saveToken(userToken) {
		localStorage.setItem('token', userToken);
		setToken(userToken);
	};

	function removeToken() {
		localStorage.removeItem("token");
		setToken("");
	}

	return {
		setToken: saveToken,
		token,
		removeToken,
	}

}

export default useToken;