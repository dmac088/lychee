import React from 'react';
import { round } from '../Helpers/math';
import { useSelector } from 'react-redux';
import { Spinner } from '../../Layout/Helpers/animation';

function Checkout() {

  const bag = useSelector(state => state.bag);
  const bagContents = useSelector(state => state.bagContents);

  const renderItems = (items) => {
    return items.map((i, index) => {
      return <li key={index}>{i.data.itemDesc} x {i.data.itemQty}<span>${round(i.data.bagItemTotal)}</span></li>
    })
  }

  return (
    (bag.loading) 
    ? <Spinner />
    :
    <React.Fragment>
      <div className="page-section section mb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form action="#" className="checkout-form">

                <div className="col-12 mb-60">

                  <h4 className="checkout-title">Cart Total</h4>

                  <div className="checkout-cart-total">

                    <h4>Product <span>Total</span></h4>

                    <ul>
                      {renderItems(bagContents.items)}
                    </ul>

                    <p>Sub Total <span>${round(bag.data.subTotalAmount)}</span></p>
                    <p>Shipping Fee <span>${round(bag.data.shippingItem.markdownPrice)}</span></p>

                    <h4>Grand Total <span>${round(bag.data.grandTotalAmount)}</span></h4>

                  </div>

                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout;