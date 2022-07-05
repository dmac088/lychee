import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListSidebar } from './Layout/ListSidebar';
import { instance as axios } from "../../Helpers/api";
import { Spinner } from '../../Helpers/animation';

function CategorySidebar(props) {
    const { type, addFacet, selectedFacets, facets, link } = props;

    const categories = useSelector(state => state.categories);

    const [stateObject, setObjectState] = useState({
        facetState: [],
    });

    //the children should be loaded in a service class and passed form the parent component
    //this way we have only on component that is aware of the hateoas config
    useEffect(() => {
        let isSubscribed = true;
        if (type === 'browse' && !categories.loading) {
            axios.post(link, (type === 'browse')
                ? selectedFacets.map(f => f.data)
                : [])
                .then((response) => {
                    if (isSubscribed) {
                        setObjectState((prevState) => ({
                            ...prevState,
                            facetState: (response.data._embedded)
                                ? response.data._embedded.categories
                                : [],
                        }));
                    }
                });

        }
        return () => (isSubscribed = false);
    }, [categories.loading]);


    return (
        <React.Fragment>
            {(categories.loading)
                ? <Spinner />
                : <ListSidebar
                    filterType={"category"}
                    heading={"filter by category"}
                    items={(type === 'browse')
                        ? stateObject.facetState
                            .filter(c => c.data.count > 0)
                            .filter(({ data }) => !selectedFacets.some(x => x.data.id === data.id))
                        : facets}
                    modFacet={addFacet} />}
        </React.Fragment>
    )
}

export default CategorySidebar;