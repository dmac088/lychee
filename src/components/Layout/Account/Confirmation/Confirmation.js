import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { confirm } from '../../../../services/Session';
import { Spinner } from '../../Helpers/animation';

function Confiramtion(props) {

    const [stateObject, setObjectState] = useState({
        message: 'failure',
        loading: true,
    });

    const query = queryString.parse(props.location.search);
    const { token } = query;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(confirm(token))
            .then((response) => {
                setObjectState((prevState) => ({
                    ...prevState,
                    message: response.data.message,
                    loading: false,
                }));
            });
    }, []);

    //call service to push the token to the back end confirmation URL

    //console.log(token);
    return (
        (stateObject.loading)
            ? <Spinner />
            : <div className="page-content mb-50">
                <div className="container">
                    <div className="row justify-content-center">
                        <h3> Registration {stateObject.message} </h3>
                    </div>
                </div>
            </div>
    );
}

export default Confiramtion;

