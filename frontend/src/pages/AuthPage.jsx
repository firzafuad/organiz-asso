import React, { useState } from "react";
import Login from "../components/login";
import Signin from "../components/signin";

function AuthPage() {
    const [form, setForm] = useState("login");
  return (
    <div>
      <h1>Organiz-Asso</h1>
        <p className="text-sm text-gray-500">Bienvenue sur la page d'authentification de Organiz-Asso. Veuillez vous connecter ou créer un compte pour accéder à vos fonctionnalités personnalisées.</p>
        <br />
      {form === "login" ? <Login /> : <Signin />}
      <p className="text-sm text-gray-500 mt-4">{form === "login" ? "Pas encore de compte ? " : "Déjà un compte ? "} <button className="text-blue-500 hover:underline" onClick={() => setForm(form === "login" ? "signin" : "login")}>{form === "login" ? "Inscrivez-vous" : "Connectez-vous"}</button></p>
    </div>
  );
}

export default AuthPage;