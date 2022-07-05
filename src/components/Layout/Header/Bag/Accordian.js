import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { getCheckoutPath, getBagPath } from '../../Helpers/route'
import { localization } from '../../Localization/Localization';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../Helpers/animation';
import * as bagService from '../../../../services/Bag/index';
import { round } from '../../Helpers/math';
const $ = window.$;

function Accordion(props) {
  const { match } = props;
  const { lang } = match.params;
 
  const bag = useSelector(state => state.bag);
  const bagContents = useSelector(state => state.bagContents);
  const session = useSelector(state => state.session);

  const dispatch = useDispatch();

  const removeItem = (e) => {
    e.preventDefault();
    dispatch(bagService.removeItem(e.target.id));
  }

  useEffect(() => {
    if(!bag.loading && session.authenticated) {
        dispatch(bagService.getBagContents());
    }
  }, [bag.loading, session.authenticated]);
  
  const renderItems = (items = []) => {
    return items.map((item, index) => {    
      const { itemUPC, itemDesc , itemQty, markdownPrice} =  item.data;
      return (
        <div key={index} className="cart-float-single-item d-flex">
          <span className="remove-item"><a onClick={removeItem} href="#"><i id={itemUPC} className="fa fa-times"></i></a></span>
          <div className="cart-float-single-item-image">
            <a href="single-product.html"><img src={item._links.defaultImage.href} className="img-fluid" alt="" /></a>
          </div>    
          <div className="cart-float-single-item-desc">
            <p className="product-title"> <a href="single-product.html">{itemDesc} </a></p>
            <p className="price"><span className="count">{itemQty}x</span> ${markdownPrice}</p>
          </div>
        </div>
      )
    });
  }

  const { totalAmount } = bag.data;
  return (
    
    (bag.loading)
    ? <Spinner />
    : <React.Fragment>
      <div className="cart-items">
        {renderItems(bagContents.items)}
      </div>
      <div className="cart-calculation">
        <div className="calculation-details">
          <p className="total">{localization[lang]['subtotal']}<span>${round(totalAmount)}</span></p>
        </div>
        <div className="floating-cart-btn text-center">
          <Link to={getCheckoutPath(match)}>
            {localization[lang]['checkout']}
          </Link>
          <Link to={getBagPath(match)}>
            {localization[lang]['viewbag']}
          </Link> 
        </div>
      </div>
    </React.Fragment>
  )
}

export default Accordion;