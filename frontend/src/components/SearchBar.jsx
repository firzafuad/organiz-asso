import { useState } from "react";

function SearchBar(props) {
    const [value, setValue] = useState("");

    function handleChange(evt) {
        setValue(evt.target.value);
        props.onChange(evt.target.value);
    }

    return (
        <div>
            <input type="text" value={value} placeholder="Rechercher..." onChange={handleChange} />
        </div>
    );
}

export default SearchBar;