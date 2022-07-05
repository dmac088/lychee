import React, { useEffect } from "react";
import { Spinner } from '../../../../Layout/Helpers/animation';
import { useDispatch, useSelector } from 'react-redux';
import { getShippingProviders } from '../../../../../services/Shipping/Provider/index';

function ShippingProvider() {

    const dispatch = useDispatch();
    const discovery = useSelector(state => state.discovery);
    const shippingProviders = useSelector(state => state.shippingProviders);

    const renderProviders = (providers) => {
        return providers.map((p, index) => {
          return <option key={index}>{p.data.brandDesc}</option>
        })
    }

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (!discovery.loading) {
                dispatch(getShippingProviders());
            }
        }
        return () => (isSubscribed = false);
    }, [discovery.loading]);

    return (
        ((shippingProviders.loading))
        ? <Spinner />
        :
            <div className="col-md-6 col-12 mb-25">
                <select className="nice-select">
                    {renderProviders(shippingProviders._embedded.brands)}
                </select>
            </div>
    );
}

export default ShippingProvider;