import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ButtonSidebar } from './Layout/ButtonSidebar';
import { findByCode } from '../../../../services/Category';
import { instance as axios } from "../../Helpers/api";
import { Spinner } from '../../Helpers/animation';
import { usePrevious } from '../../Helpers/general';

function TagSidebar(props) {
    const { type, addFacet, selectedFacets, loading, facets } = props;

    //get the full list of categories from redux state
    const categories = useSelector(state => state.categories);
    
    //get the locale and current category from the url
    const { categoryCode, lang, curr } = props.match.params;

   

    //create a local state object names objects to hold the list of facets
    const [stateObject, setObjectState] = useState({
        objects: [],
        loading: true,
    });

    //keep a copy of the previously seelcted category code
    const prevCategoryCode = usePrevious(categoryCode);

    useEffect(() => {
        let isSubscribed = true;
        if (categoryCode && 
            categoryCode !== prevCategoryCode && 
            !categories.loading) {

            const currentCategory = findByCode(categories.list, categoryCode);
            
            //get the link to populate the list of tag facets
            const { href } = currentCategory._links.tags;
            axios.post(href,    (type === 'browse')
                                ? selectedFacets.map(f => f.data)
                                : [])
                .then((response) => {
                    return response.data._embedded;
                }).then((payload) => {
                    if (isSubscribed) {
                        setObjectState((prevState) => ({
                            ...prevState,
                            objects:    (payload)
                                        ? payload.objects
                                        : [],
                        }));
                    }
                });
            return () => (isSubscribed = false);
        }
    }, [categoryCode, 
        categories.loading, 
        loading, 
        lang,
        curr]);

    return (
        <React.Fragment>
            {(loading || categories.loading)
                ? <Spinner />
                : <ButtonSidebar
                    filterType={"tag"}
                    heading={"filter by tag"}
                    items={(type === 'browse') ? stateObject.objects.filter(({ data }) => !selectedFacets.some(x => x.data.id === data.id)) : facets}
                    modFacet={addFacet} />}
        </React.Fragment>
    )
}


export default TagSidebar;