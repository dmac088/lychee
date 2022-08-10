import React from "react";
import queryString from 'query-string';

function Confiramtion(props) {
    const { params } = props.match;
    const { lang, curr } = params;

    const query = queryString.parse(props.location.search);
    const { token } = query;

    console.log(token);
    return (
        <div>Thanks for registering!</div>
    );
}

export default Confiramtion;

