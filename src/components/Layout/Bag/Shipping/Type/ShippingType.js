import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getShippingType } from '../../../../../services/Shipping/Type/index';

function ShippingType(props) {

    const { match } = props;
    const { lang, curr } = match.params;

    const { destinationCode, setShipTypeCode, defaultDestCode, defaultShipCode } = props;
    const dispatch = useDispatch();
    const shippingTypes = useSelector(state => state.shippingTypes);
    const bag = useSelector(state => state.bag);

    const renderTypes = (types) => {
        return types.map((p, index) => {
            return <option key={index}
                           value={p.data.code}>{p.data.name}
                    </option>
        }) 
    }

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if(destinationCode !== defaultDestCode) {
                dispatch(getShippingType(destinationCode, lang, curr));
            }
        }
        return () => (isSubscribed = false);
    }, [
        destinationCode,
        bag.loading
    ]);

    return (
            <div className="col-md-6 col-12 mb-25">
                {(!shippingTypes.loading)
                ?   <select defaultValue={defaultShipCode} 
                            onChange={setShipTypeCode} 
                            className="nice-select">
                    {renderTypes(shippingTypes._embedded.shippingCodeResources)}
                    </select>
                :   <select className="nice-select"/>}
            </div>
    );
}

export default ShippingType;