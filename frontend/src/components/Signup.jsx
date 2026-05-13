import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACK_URI } from '../utils/constants';

function Signup (props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passOK, setPassOK] = useState("");
  
  const api = axios.create({
		baseURL: BACK_URI,
		withCredentials: true
	});

	async function submissionHandler(evt) {
		evt.preventDefault();
		try {
			const response = await api.post("/auth/signup", {
        firstName,
        lastName,
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
  <form method='POST' className='grid grid-cols-2 gap-4 text-white'>
      <label htmlFor="firstname">First name</label><label htmlFor="lastname">Last name</label>
      <input id="firstname" className={css} onChange={(evt) => setFirstName(evt.target.value)}/><input id="lastname" className={css} onChange={(evt) => setLastName(evt.target.value)}/>
      <label htmlFor="signin_login">Login</label><input id="signin_login" className={css} onChange={(evt) => setEmail(evt.target.value)} />
      <label htmlFor="signin_mdp1">Password</label><input type="password" id="signin_mdp1" className={css} onChange={(evt) => setPassword(evt.target.value)}/>
      <label htmlFor="signin_mdp2">Password (confirmation)</label><input type="password" id="signin_mdp2" className={css} onChange={(evt) => setPassOK(evt.target.value)}/>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={submissionHandler}>Sign In</button>
      <button type="reset" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Reset</button>      
      {password !== passOK && passOK.length > 0 && (
        <p style={{ color: 'red' }}>Passwords don't match lah!</p>
      )}
    </form>
   );
}

export default Signup;