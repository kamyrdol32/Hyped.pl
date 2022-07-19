import {useState} from "react";

export default function useToken() {
	function getToken() {
		const userToken = localStorage.getItem('userToken');
		return userToken && userToken;
	}

	const [token, setToken] = useState(getToken());
	function saveToken(userToken) {
		localStorage.setItem('token', userToken);
	}

	function removeToken() {
		localStorage.removeItem('token');
		setToken(null);
	}

	return {
		setToken, saveToken, token, removeToken
	}
}