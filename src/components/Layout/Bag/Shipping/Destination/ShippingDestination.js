import React from "react";
import { Spinner } from '../../../../Layout/Helpers/animation';

function ShippingDestination(props) {

    const { shippingDestinations, setDestination, currentDestinationCode } = props;

    const renderDestinations = (providers) => {
        return providers.map((p, index) => {
          return <option  
                         key={index} 
                         value={p.data.countryCode}>{p.data.countryDesc}</option>
        })
    }

    return (
        ((shippingDestinations.loading))
        ? <Spinner />
        :
            <div className="col-md-6 col-12 mb-25">
                <select defaultValue={currentDestinationCode} onChange={setDestination} className="nice-select">
                    {renderDestinations(shippingDestinations.data._embedded.shippingCountryResources)}
                </select>
            </div>
    );
}

export default ShippingDestination;