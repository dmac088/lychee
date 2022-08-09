import React from "react";


function Confiramtion(props) {
    const { params } = props.match;
    const { lang, curr } = params;

    console.log(lang);
    return (
        <div>Thanks for registering!</div>
    );
}

export default Confiramtion;

