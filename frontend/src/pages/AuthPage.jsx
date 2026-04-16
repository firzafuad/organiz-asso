import React, { useState } from "react";
import Login from "../components/login";
import Signin from "../components/signin";
import { Link } from "react-router-dom";

function AuthPage(props) {
    const [form, setForm] = useState(props.form || "login");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-16">
        <Link to="/">
          <h1>Organiz-Asso</h1>
        </Link>
          <p className="max-w-md text-wrap text-sm text-gray-500">Bienvenue sur la page d'authentification de Organiz-Asso. Veuillez vous connecter ou créer un compte pour accéder à vos fonctionnalités personnalisées.</p>
      </div>
      
      {form === "login" ? <Login /> : <Signin />}
      <p className="text-sm text-gray-500 mt-4">{form === "login" ? "Pas encore de compte ? " : "Déjà un compte ? "}
        <button className="text-blue-500 hover:underline" onClick={() => setForm(form === "login" ? "signin" : "login")}>
          {form === "login" ? "Inscrivez-vous" : "Connectez-vous"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;