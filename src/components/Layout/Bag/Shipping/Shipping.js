import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../Layout/Helpers/animation';
import ShippingProvider from './Provider/ShippingProvider';
import ShippingDestination from './Destination/ShippingDestination';
import ShippingType from './Type/ShippingType';
import { getShippingDestinations, findByCode } from '../../../../services/Shipping/Destination/index';
import { getShippingProduct } from '../../../../services/Shipping/Products/index';

function Shipping(props) {

    const { match } = props;
    const { lang, curr } = match.params;

    const dispatch              = useDispatch();
    const bag                   = useSelector(state => state.bag);
    const shippingDestinations  = useSelector(state => state.shippingDestinations);
    const shippingProduct       = useSelector(state => state.shippingProduct);

    //selected shipping destination stored in local state
    const [stateObject, setObjectState] = useState({
        currentDestinationCode: "HKG",
        currentDestination: null,
        currentShipTypeCode: "LEG",
    });

    function setDestinationCode(e) {
        e.preventDefault();
        const value = e.target.value;
        setObjectState((prevState) => ({ 
          ...prevState, 
          currentDestinationCode: value,
        }));
    }

    function setShipTypeCode(e) {
        e.preventDefault();
        const value = e.target.value;
        setObjectState((prevState) => ({ 
          ...prevState, 
          currentShipTypeCode: value,
        }));
    }


    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            dispatch(getShippingDestinations(lang, curr));    
        }
        return () => (isSubscribed = false);
    }, [bag.loading]);


    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
                if(!bag.loading) {
                    dispatch(getShippingProduct(stateObject.currentDestinationCode, 
                                                stateObject.currentShipTypeCode,
                                                lang, 
                                                curr));
                }
        }
        return () => (isSubscribed = false);
    }, [stateObject.currentDestinationCode,
        stateObject.currentShipTypeCode]);


    const bagReady          = ((!bag.loading));
    const destinationsReady = ((!shippingDestinations.loading));

    console.log(shippingProduct)
    return (
        (!(destinationsReady && bagReady))
        ? <Spinner />
        :
        <div className="calculate-shipping">
            <h4>Calculate Shipping</h4>
            <form action="#">
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
                        destinationCode={stateObject.currentDestinationCode}
                        setShipTypeCode={setShipTypeCode}
                        destination={findByCode(shippingDestinations._embedded.shippingDestinationResources, stateObject.currentDestinationCode)}/> 
                    <div className="col-md-6 col-12 mb-25">
                        <input type="submit" defaultValue="Estimate" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Shipping;