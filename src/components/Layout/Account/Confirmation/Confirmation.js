import React from "react";
import queryString from 'query-string';

function Confiramtion(props) {
    const { params } = props.match;
    const { lang, curr } = params;

    const query = queryString.parse(props.location.search);
    const { token } = query;

    //call service to push the token to the back end confirmation URL

    console.log(token);
    return (
        <div>Thanks for registering!</div>
    );
}

export default Confiramtion;

