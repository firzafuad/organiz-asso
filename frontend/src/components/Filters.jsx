import { useState } from "react";
import "../styles/Filters.css";

function Filters(props) {
    const [debut, setDebut] = useState("");
    const [fin, setFin] = useState("");

    const handleDebut = (evt) => {
        setDebut(evt.target.value);
        props.onFilter("dateDebut", evt.target.value);
    }

    const handleFin = (evt) => {
        setFin(evt.target.value);
        props.onFilter("dateDebut", evt.target.value);
    }

    return <div id="filtre_div">
        <label htmlFor="date_deb">Date de début</label>
        <input type="date" id="date_deb" value={debut} max={fin} onChange={handleDebut} />
        <label htmlFor="date_fin">Date de fin</label>
        <input type="date" id="date_fin" value={fin} min={debut} onChange={handleFin} />
    </div>
}

export default Filters;