import { useState } from 'react';

function Login (props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	
	const getLogin = (evt) => {setLogin(evt.target.value)}
	const getPassword = (evt) => {setPassword(evt.target.value)} 	
	
	const css = "border rounded-md";
	return (
	
	<form method="POST" action="" className='grid grid-cols-2 gap-4'>
		<label htmlFor="login">Login</label><input className={css} id="login" onChange={getLogin}/>
		<label htmlFor="mdp">Mot de passe</label><input className={css} type="password" id="mdp"  onChange={getPassword}/>
		<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Log In</button><button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' type="reset">Annuler</button>
	</form>	 
	 );
}

export default Login;