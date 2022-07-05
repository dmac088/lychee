import React, { useEffect, useRef } from "react";
import { Spinner } from '../../../../Layout/Helpers/animation';
import { useDispatch, useSelector } from 'react-redux';
import { getShippingType } from '../../../../../services/Shipping/Type/index';
import { usePrevious } from '../../../Helpers/general';

function ShippingType(props) {
    const { destination, destinationCode, setShipTypeCode } = props;
    const dispatch = useDispatch();
    const shippingTypes = useSelector(state => state.shippingTypes);
    const bag = useSelector(state => state.bag);
    const prevDestinationCode = usePrevious(destinationCode);

    const renderTypes = (types) => {
        return types.map((p, index) => {
          return <option key={index}
                         value={p.data.shippingTypeCode}>{p.data.shippingTypeDesc}</option>
        })
    }

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (prevDestinationCode !== destinationCode && destination) {
                if(!bag.loading) {
                    dispatch(getShippingType(destination));
                }
            }
        }
        return () => (isSubscribed = false);
    }, [
        destinationCode,
        bag.loading]);

    return (
        (shippingTypes.loading)
        ? <Spinner />
        :
            <div className="col-md-6 col-12 mb-25">
                <select  defaultValue={destinationCode} onChange={setShipTypeCode} className="nice-select">
                    {renderTypes(shippingTypes._embedded.shippingTypeResources)}
                </select>
            </div>
    );
}

export default ShippingType;