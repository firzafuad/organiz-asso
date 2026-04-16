import { useState } from 'react'

function Signin (props) {
  
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passOK, setPassOK] = useState(true);
  
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  
  const getLogin = (evt) => {setLogin(evt.target.value)};
  const getFirstName = (evt) => {setFirstName(evt.target.value)};
  const getLastName = (evt) => {setLastName(evt.target.value)};
  const getPass1 = (evt) => {setPass1(evt.target.value); pass1 === pass2 ? setPassOK(true) : setPassOK(false)};
  const getPass2 = (evt) => {setPass2(evt.target.value); pass1 === pass2 ? setPassOK(true) : setPassOK(false)};
  
  const submissionHandler = (evt) => {
    if (pass1 === pass2) setPassOK(true);
    else setPassOK(false);
  }

  const css = "border rounded-md";
    
  return (
  <form method='POST' className='grid grid-cols-2 gap-4 text-white'>
      <label htmlFor="firstname">First name</label><label htmlFor="lastname">Last name</label>
      <input id="firstname" className={css} onChange={getFirstName}/><input id="lastname" className={css} onChange={getLastName}/>
      <label htmlFor="signin_login">Login</label><input id="signin_login" className={css} onChange={getLogin}/>
      <label htmlFor="signin_mdp1">Password</label><input type="password" id="signin_mdp1" className={css} onChange={getPass1}/>
      <label htmlFor="signin_mdp2">Password (confirmation)</label><input type="password" id="signin_mdp2" className={css} onChange={getPass2}/>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={submissionHandler}>Sign In</button>
      <button type="reset" className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Reset</button>      
    {passOK ? <p></p>:<p style={{color:"red"}}>Erreur: mots de passe différents</p>}
    </form>
   );
}

export default Signin;