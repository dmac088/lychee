import React from 'react';
import Shipping from './Shipping/Shipping';
import { routeToPage } from '../../../services/Routing/Helper';
import { useSelector } from 'react-redux';
import * as bagService from '../../../services/Bag/index';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../Layout/Helpers/animation';
import { round } from '../Helpers/math';
import Auth from '../Login/Auth';

function Bag(props) {
    const { history, match } = props;
    const { params } = match;
    const { lang, curr } = params;
    const bag = useSelector(state => state.bag);
    const bagContents = useSelector(state => state.bagContents);
    const authenticated = useSelector(state => state.session.authenticated);
    const shippingItem = bag.data.shippingItem || {markdownPrice: 0};

    const dispatch = useDispatch();

    const removeItem = (e) => {
        e.preventDefault();
        if (bagService.isAuthenticated()) {
            dispatch(bagService.removeItem(e.target.id, lang, curr))
                .then(() => dispatch(bagService.getBag(lang, curr)));
        }
    }

    const incrementQty = (e) => {
        e.preventDefault();
        console.log('incrementQty')
        if (bagService.isAuthenticated()) {
            dispatch(bagService.addItem(e.target.id, 1, lang, curr))
                .then(() => dispatch(bagService.getBag(lang, curr)));
        }
    }

    const decrementQty = (e) => {
        e.preventDefault();
        if(bagService.isAuthenticated()) {
            dispatch(bagService.addItem(e.target.id, -1, lang, curr))
                .then(() => dispatch(bagService.getBag(lang, curr)));
        }
    }

    const routeCheckout = (e) => {
        e.preventDefault();
        console.log('routeCheckout')
        routeToPage(history, params, 'mycheckout');
    }

    const renderCartProducts = (items = []) => {
        return items.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="pro-thumbnail">
                        <a id={item.data.itemUPC} href="#" onClick={(e) => console.log(e)}>
                            <img src={item._links.defaultImage.href} className="img-fluid" alt="Product" />
                        </a>
                    </td>
                    <td className="pro-title">
                        <a id={item.productUPC} href="#" onClick={(e) => console.log(e)}>
                            {item.data.itemDesc}
                        </a>
                    </td>
                    <td className="pro-price">
                        <span>${item.data.markdownPrice}</span>
                    </td>
                    <td className="pro-quantity">
                        <div className="pro-qty">
                            <input type="text" defaultValue={item.data.itemQty} />
                            <a id={item.data.itemUPC} onClick={incrementQty} href="#" className="inc qty-btn">+</a>
                            <a id={item.data.itemUPC} onClick={decrementQty} href="#" className="dec qty-btn">-</a>
                        </div>
                    </td>
                    <td className="pro-quantity">
                        <span>{round(item.data.bagItemWeight)} kg</span>
                    </td>
                    <td className="pro-subtotal">
                        <span>${round(item.data.bagItemTotal)}</span>
                    </td>
                    <td className="pro-remove">
                        <a id={item.data.itemUPC} onClick={removeItem} href="#">
                            <i id={item.data.itemUPC} onClick={removeItem} className="fa fa-trash-o"></i>
                        </a>
                    </td>
                </tr>
            )
        });
    }

    const { totalWeight, subTotalAmount, grandTotalAmount } = bag.data;
    return (
        <React.Fragment>
            {(!authenticated)
                ? <Auth
                    {...props} />
                : (bag.loading || bagContents.loading)
                    ? <Spinner />
                    :

                    <div className="page-section section mb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form action="#">
                                        <div className="cart-table table-responsive mb-40">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="pro-thumbnail">Image</th>
                                                        <th className="pro-title">Product</th>
                                                        <th className="pro-price">Price</th>
                                                        <th className="pro-quantity">Quantity</th>
                                                        <th className="pro-quantity">Weight</th>
                                                        <th className="pro-subtotal">Total</th>
                                                        <th className="pro-remove">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderCartProducts(bagContents.items)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                    <div className="row">
                                        <div className="col-lg-6 col-12">
                                            <Shipping
                                                {...props}
                                            />
                                            <div className="discount-coupon">
                                                <h4>Discount Coupon Code</h4>
                                                <form action="#">
                                                    <div className="row">
                                                        <div className="col-md-6 col-12 mb-25">
                                                            <input type="text" placeholder="Coupon Code" />
                                                        </div>
                                                        <div className="col-md-6 col-12 mb-25">
                                                            <input type="submit" defaultValue="Apply Code" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12 d-flex">
                                            <div className="cart-summary">
                                                <div className="cart-summary-wrap">
                                                    <h4>Bag Summary</h4>
                                                    <p>Total Weight<span>{round(totalWeight)} kg</span></p>
                                                    <p>Sub Total <span>${round(subTotalAmount)}</span></p>
                                                    <p>Shipping Cost <span>${round(shippingItem.markdownPrice)}</span></p>
                                                    <h2>Grand Total <span>${round(grandTotalAmount)}</span></h2>
                                                </div>
                                                <div className="cart-summary-button">
                                                    <button onClick={routeCheckout} className="checkout-btn">Checkout</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>}
        </React.Fragment>
    );
}

export default Bag;