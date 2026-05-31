function Filters(props) {
    return <div id="filtre_div">
        <label htmlFor="date_deb">Date de début</label>
        <input type="date" id="date_deb" onChange={(evt) => props.onFilter("dateDebut", evt.target.value)} />
        <label htmlFor="date_fin">Date de fin</label>
        <input type="date" id="date_fin" onChange={(evt) => props.onFilter("dateFin", evt.target.value)} />
    </div>
}

export default Filters;