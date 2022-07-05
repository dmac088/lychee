import React from 'react';
import { ListSidebar } from './Layout/ListSidebar';

function SelectionSidebar(props) {
    const { modFacet, selectedFacets } = props;

    return (
        <React.Fragment>    
             <ListSidebar
                heading={"selection"}
                items={selectedFacets} 
                modFacet={modFacet}/>
        </React.Fragment>
    )
}

export default SelectionSidebar;