import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../Layout/Helpers/animation';
import ShippingProvider from './Provider/ShippingProvider';
import ShippingDestination from './Destination/ShippingDestination';
import ShippingType from './Type/ShippingType';
import { getShippingDestinations, findByCode } from '../../../../services/Shipping/Destination/index';
import { addShipping } from '../../../../services/Bag/index';
import { getShippingProduct } from '../../../../services/Shipping/Products/index';
import * as bagService from '../../../../services/Bag/index';

function Shipping(props) {
    const { match } = props;
    const { lang, curr } = match.params;

    const dispatch = useDispatch();
    const bag = useSelector(state => state.bag);
    const shippingDestinations = useSelector(state => state.shippingDestinations);
    const shippingProduct = useSelector(state => state.shippingProduct);
    const defaultProvCode = "HKP";
    const defaultDestCode = "NA";
    const defaultShipCode = "NA";
    

    //selected shipping destination stored in local state
    const [stateObject, setObjectState] = useState({
        currentProviderCode: defaultProvCode,
        currentDestinationCode: defaultDestCode,
        currentDestination: null,
        currentShipTypeCode: defaultShipCode,
    });

    const setDestinationCode = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setObjectState((prevState) => ({
            ...prevState,
            currentDestinationCode: value,
            currentShipTypeCode: defaultShipCode,
        }));
    }

    const setShipTypeCode = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setObjectState((prevState) => ({
            ...prevState,
            currentShipTypeCode: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!shippingProduct) { return; }
        if(!shippingProduct.productUPC) {return;}
        dispatch(addShipping(shippingProduct, lang, curr))
             .then(() => dispatch(bagService.getBag(lang, curr)));
    }

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (!bag.loading) {
                
                dispatch(getShippingDestinations(lang, curr));
            }
        }
        return () => (isSubscribed = false);
    }, [bag.loading]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (!bag.loading) {
                if(!(stateObject.currentShipTypeCode == defaultShipCode || stateObject.currentDestinationCode == defaultDestCode)) {
                    dispatch(getShippingProduct(stateObject.currentDestinationCode,
                                                stateObject.currentShipTypeCode,
                                                lang,
                                                curr));
                }
            }
        }
        return () => (isSubscribed = false);
    }, [stateObject.currentDestinationCode,
        stateObject.currentShipTypeCode,
        bag.loading]);

    return (
        (bag.loading ||
            shippingDestinations.loading)
            ? <Spinner />
            :
            <div className="calculate-shipping">
                <h4>Calculate Shipping</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <ShippingProvider
                            {...props}
                        />
                        <ShippingDestination
                            {...props}
                            shippingDestinations={shippingDestinations}
                            currentDestinationCode={stateObject.currentDestinationCode}
                            setDestination={setDestinationCode} />
                        <ShippingType
                            {...props}
                            defaultShipCode={defaultShipCode}
                            defaultDestCode={defaultDestCode}
                            destinationCode={stateObject.currentDestinationCode}
                            shipTypeCode={stateObject.currentShipTypeCode}
                            setShipTypeCode={setShipTypeCode}
                            destination={findByCode(shippingDestinations.data._embedded.shippingDestinationResources, stateObject.currentDestinationCode)} />

                        <div className="col-md-6 col-12 mb-25">
                            <input type="submit" name="Estimate" />
                        </div>
                    </div>
                </form>
            </div>
    );
}

export default Shipping;