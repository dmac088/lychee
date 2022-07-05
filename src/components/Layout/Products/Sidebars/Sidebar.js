import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { instance as axios } from "../../Helpers/api";
import { Spinner } from '../../Helpers/animation';

function Sidebar(props) {
    const { type, selectedFacets, facets, link } = props;

    const categories = useSelector(state => state.categories);

    const [stateObject, setObjectState] = useState({
        facetState: [],
        loading: true,
    });

    //the children should be loaded in a service class and passed form the parent component
    //this way we have only on component that is aware of the hateoas config
    useEffect(() => {
        let isSubscribed = true;
        if (!categories.loading) {
            axios.post(link, (type === 'browse')
                ? selectedFacets.map(f => f.data)
                : [])
                .then((response) => {
                    if (isSubscribed) {
                        setObjectState((prevState) => ({
                            ...prevState,
                            facetState: (response.data._embedded)
                                ? response.data._embedded.objects
                                : [],
                            loading: false,
                        }));
                    }
                });
        }
        return () => (isSubscribed = false);
    }, [categories.loading]);


    return (
        <React.Fragment>
            {(stateObject.loading)
                ? <Spinner />
                : React.cloneElement(props.children, {
                    items: (type === 'browse')
                        ? [...stateObject.facetState
                            .filter(c => c.data.count > 0)
                            .filter(({ data }) => !selectedFacets.some(x => x.data.id === data.id)), 
                            ...stateObject.facetState
                            .filter(c => c.data.facetingName === 'price')]
                        : facets
                })

            }
        </React.Fragment>
    )
}

export default Sidebar;