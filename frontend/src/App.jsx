// Imports
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ThemeContext from "./Context/ThemeContext.jsx";
import useLocalStorage from "use-local-storage";
import useToken from "./Utils/JWT.jsx";
import {Container} from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Components
import MyNavbar from "./Components/MyNavbar.jsx";
import MyHome from "./Sites/MyHome.jsx";
import MyFilmList from "./Sites/MyFilmList.jsx";
import MyFilm from "./Sites/MyFilm.jsx";
import MyLogin from "./Sites/MyLogin.jsx";
import MyRegister from "./Sites/MyRegister.jsx";
import MyProfile from "./Sites/MyProfile.jsx";
import MySerialList from "./Sites/MySerialList.jsx";
import MySerial from "./Sites/MySerial.jsx";
import MyFooter from "./Components/MyFooter.jsx";

// CSS
import './Styles/App.css';
import MyAccountActivate from "./Sites/MyAccountActivate.jsx";
import MyForgetPassword from "./Sites/MyForgetPassword.jsx";
import MyChangePassword from "./Sites/MyChangePassword.jsx";
import MySearch from "./Sites/MySearch.jsx";


// Code
const queryClient = new QueryClient()

export default function App() {

	// JWT
	const { token, setToken } = useToken();

	// Dark mode
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

	// Root
	const root = document.getElementById('root');
	root.setAttribute("data-theme", theme);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeContext.Provider value={{theme, setTheme}}>
				<BrowserRouter>
					<MyNavbar token={token}/>
					<Container id="MyBody">
						<Routes>
							<Route path="/" element={<MyHome />} />
							<Route path="/films" element={<MyFilmList />} />
							<Route path="/serials" element={<MySerialList />} />

							<Route path="/film/:ID" element={<MyFilm token={token} setToken={setToken} />} />
							<Route path="/serial/:ID" element={<MySerial token={token} setToken={setToken} />} />
							<Route path="/search/:NAME" element={<MySearch />} />

							<Route path="/login" element={<MyLogin setToken={setToken} />} />
							<Route path="/register" element={<MyRegister />} />
							<Route path="/account/activate/:KEY" element={<MyAccountActivate token={token} />} />
							<Route path="/account" element={<MyProfile token={token} setToken={setToken} />} />
							<Route path="/forgot" element={<MyForgetPassword />} />
							<Route path="/change_password" element={<MyChangePassword token={token} setToken={setToken} />} />

							{/*<Route path="/test" element={<MyComponent />} />*/}
						</Routes>
					</Container>
					<MyFooter />
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</BrowserRouter>
			</ThemeContext.Provider>
		</QueryClientProvider>
	)
}
