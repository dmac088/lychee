import React, { useState, useEffect, useRef} from 'react';
import { instance as axios } from "../../../Layout/Helpers/api";
import Slider from "react-slick";
import { Spinner } from '../../Helpers/animation';
import { useSelector } from 'react-redux';
import { settings } from './Helper';
import * as bagService from "../../../../services/Bag/index";
import { usePrevious } from '../../Helpers/general';

function QuickViewProduct(props) {

  const { toggleQuickView, productCode , match} = props;
  const { lang, curr } = match.params;

  const closeModal = (e) => {
    toggleQuickView(e);
  }

  const changeImage = () => {
    console.log('changeImage');
  }

  const prevLang      = usePrevious(lang);
  const prevCurr      = usePrevious(curr);

  const [stateObject, setObjectState] = useState({
    product: {},
    quantity: 1,
    loading: true,
  });

  const discovery = useSelector(state => state.discovery);

  const retrieveProduct = (id) => {
    const url = discovery.links.getProduct.href.replace('{code}', id);
    console.log(url); 
    axios.get(url)
         .then((response) => {
             setObjectState((prevState) => ({
                 ...prevState,
                 product: (response.data) 
                          ? response.data
                          : {},
                 loading: false,
             }));
    });
  }

  const addToBag = (e, productCode, quantity) => {
    console.log('addToBag');
    e.preventDefault();
    bagService.addToBag(productCode, quantity);
  }

  useEffect(() => {
        if(prevLang !== lang || prevCurr !== curr || stateObject.loading) {
            retrieveProduct(productCode);
        }
  }, [discovery.loading, stateObject.loading, lang, curr]);
    
  const { product } = stateObject;

  return (
    (stateObject.loading) ?
    <Spinner />
    : 
    <div className={"modal fade quick-view-modal-container show"}
      id={"modal-" + productCode}
      tabIndex="-1"
      role="dialog"
      style={{
        "display": "block",
        "paddingRight": "17px"
      }}
      aria-hidden={"false"}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="product-image-slider">
                  <div className="tab-content product-large-image-list" id="myTabContent">
                    <div className="tab-pane fade show active" id="single-slide1" role="tabpanel" aria-labelledby="single-slide-tab-1">
                      <div className="single-product-img img-full">
                        <img src={product._links.defaultImage.href}
                          className="img-fluid"
                          alt="Image not found"
                        />
                      </div>
                    </div>
                    <div className="tab-pane fade" id="single-slide2" role="tabpanel" aria-labelledby="single-slide-tab-2">
                      <div className="single-product-img img-full">
                        <img src={product._links.defaultImage.href}
                          className="img-fluid"
                          alt="Image not found"
                        />
                      </div>
                    </div>
                    <div className="tab-pane fade" id="single-slide3" role="tabpanel" aria-labelledby="single-slide-tab-3">
                      <div className="single-product-img img-full">
                        <img src={product._links.defaultImage.href}
                          className="img-fluid"
                          alt="Image not found"
                        />
                      </div>
                    </div>
                    <div className="tab-pane fade" id="single-slide4" role="tabpanel" aria-labelledby="single-slide-tab-4">
                      <div className="single-product-img img-full">
                        <img src={product._links.defaultImage.href}
                          className="img-fluid"
                          alt="Image not found"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="product-small-image-list">
                    <Slider role="tablist" className="nav small-image-slider" {...settings}>
                      <div className="single-small-image img-full">
                        <a onClick={changeImage} data-toggle="tab" id="single-slide-tab-1" href="#single-slide1">
                          <img src={product._links.defaultImage.href}
                            className="img-fluid"
                            alt="Image not found" />
                        </a>
                      </div>
                      <div className="single-small-image img-full">
                        <a onClick={changeImage} data-toggle="tab" id="single-slide-tab-2" href="#single-slide2">
                          <img src={product._links.defaultImage.href}
                            className="img-fluid"
                            alt="Image not found" />
                        </a>
                      </div>
                      <div className="single-small-image img-full">
                        <a onClick={changeImage} data-toggle="tab" id="single-slide-tab-3" href="#single-slide3">
                          <img src={product._links.defaultImage.href}
                            className="img-fluid"
                            alt="Image not found" />
                        </a>
                      </div>
                      <div className="single-small-image img-full">
                        <a onClick={changeImage} data-toggle="tab" id="single-slide-tab-4" href="#single-slide4">
                          <img src={product._links.defaultImage.href}
                            alt="Image not found" />
                        </a>
                      </div>
                      <div className="single-small-image img-full">
                        <a onClick={changeImage} data-toggle="tab" id="single-slide-tab-2" href="#single-slide2">
                          <img src={product._links.defaultImage.href}
                            className="img-fluid"
                            alt="Image not found" />
                        </a>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-6 col-xs-12">
                <div className="product-feature-details">
                  <h2 className="product-title mb-15">{product.data.productDesc}</h2>
                  <h2 className="product-price mb-15">
                    <span className="main-price">${product.data.productRetail}</span>
                    <span className="discounted-price"> ${product.data.productMarkdown}</span>
                  </h2>
                  <p className="product-description mb-20">
                    {product.data.productLongDesc}
                  </p>
                  <div className="cart-buttons mb-20">
                    <div className="pro-qty mr-10">
                      <input onChange={() => console.log('updateQuantity')} type="text" value={1} />
                      <a onClick={() => console.log('incrementQuantity')} href="#" className="inc qty-btn">+</a>
                      <a onClick={() => console.log('decrementQuantity')} href="#" className="dec qty-btn">-</a>
                    </div>
                    <div className="add-to-cart-btn">
                      <a onClick={(e) => addToBag(e, productCode, stateObject.quantity)} href="#"><i className="fa fa-shopping-cart">
                        </i> Add to Bag</a>
                    </div>
                  </div>
                  <div className="social-share-buttons">
                    <h3>share this product</h3>
                    <ul>
                      <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a className="google-plus" href="#"><i className="fa fa-google-plus"></i></a></li>
                      <li><a className="pinterest" href="#"><i className="fa fa-pinterest"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default QuickViewProduct;
