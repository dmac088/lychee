import React, { useEffect, useRef } from "react";
import { Spinner } from '../../../../Layout/Helpers/animation';
import { useDispatch, useSelector } from 'react-redux';
import { getShippingType } from '../../../../../services/Shipping/Type/index';

function ShippingType(props) {

    const { match } = props;
    const { lang, curr } = match.params;

    const { destinationCode, setShipTypeCode, shipTypeCode, defaultShipCode } = props;
    const dispatch = useDispatch();
    const shippingTypes = useSelector(state => state.shippingTypes);
    const bag = useSelector(state => state.bag);

    const renderTypes = (types) => {
        return types.map((p, index) => {
            return <option key={index}
                value={p.data.code}>{p.data.name}</option>
        })
    }

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if(destinationCode !== defaultShipCode) {
                dispatch(getShippingType(destinationCode, lang, curr));
            }
        }
        return () => (isSubscribed = false);
    }, [
        destinationCode,
        bag.loading
    ]);

    return (
        (shippingTypes.loading)
            ? <Spinner />
            :
            <div className="col-md-6 col-12 mb-25">
                <select defaultValue={shipTypeCode} onChange={setShipTypeCode} className="nice-select">
                    {renderTypes(shippingTypes._embedded.shippingCodeResources)}
                </select>
            </div>
    );
}

export default ShippingType;