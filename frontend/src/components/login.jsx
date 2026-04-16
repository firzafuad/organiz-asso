import { useState } from 'react';

function Login (props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	
	const getLogin = (evt) => {setLogin(evt.target.value)}
	const getPassword = (evt) => {setPassword(evt.target.value)}

	const submissionHandler = (evt) => {
		evt.preventDefault();
		fetch("http://localhost:5000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: login, password: password })
		})
		.then(response => response.json())
		.then(data => alert(data.message))
		.catch(error => {
			console.error("Error during login:", error);
			alert("An error occurred. Please try again.");
		});
	}
	
	const css = "border rounded-md";
	return (
	<form method="POST" className='grid grid-cols-2 gap-4 text-white'>
		<label htmlFor="login">Login</label><input className={css} id="login" onChange={getLogin}/>
		<label htmlFor="mdp">Mot de passe</label><input className={css} type="password" id="mdp"  onChange={getPassword}/>
		<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" onClick={submissionHandler}>Log In</button>
		<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' type="reset">Annuler</button>
	</form>	 
	 );
}

export default Login;