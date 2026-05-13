import { useState } from 'react';
import axios from "axios";
import { BACK_URI } from '../utils/constants';

function Login (props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const getEmail = (evt) => {setEmail(evt.target.value)}
	const getPassword = (evt) => {setPassword(evt.target.value)}

	const api = axios.create({
		baseURL: BACK_URI,
		withCredentials: true
	});

	async function submissionHandler(evt) {
		evt.preventDefault();
		try {
			const response = await api.post("/auth/signin", {
				email,
				password
			});
			
			alert(response.data.message)
			props.onSuccess(response.data.user)
		} catch (error) {
			console.log("Error during login:", error.response?.data?.error);
			alert("An error occurred. Please try again.");
		};
	}
	
	const css = "border rounded-md";
	return (
	<form method="POST" className='grid grid-cols-2 gap-4 text-white'>
		<label htmlFor="email">Email</label><input className={css} id="email" onChange={getEmail}/>
		<label htmlFor="mdp">Mot de passe</label><input className={css} type="password" id="mdp"  onChange={getPassword}/>
		<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" onClick={submissionHandler}>Log In</button>
		<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' type="reset">Annuler</button>
	</form>	 
	 );
}

export default Login;