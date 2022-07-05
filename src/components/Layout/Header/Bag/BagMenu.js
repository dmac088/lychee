import React, { useState, useRef, useEffect } from "react";
import Accordion from "./Accordian";
import { Transition } from 'react-transition-group';
import { Link } from "react-router-dom";
import { slide } from '../../Helpers/animation';
import { getBagPath } from '../../Helpers/route';
import { localization } from '../../Localization/Localization';
import { useSelector, useDispatch } from 'react-redux';
import * as bagService from '../../../../services/Bag/index';
import { Spinner } from '../../Helpers/animation';
import { round } from '../../Helpers/math';


function BagMenu(props) {

  const { match } = props;
  const { lang } = match.params;

  const dispatch = useDispatch();   

  const bag = useSelector(state => state.bag);
  const discovery = useSelector(state => state.discovery);
  const session = useSelector(state => state.session);

  const [stateInContainer, setInContainer] = useState(false);

  const visibleRef = useRef(stateInContainer);
  visibleRef.current = stateInContainer;

  const [visible, setVisible] = useState(false);

  const setNotIn = () => {
    setInContainer(false);
    getVisible();
  }

  const setIn = () => {
    setInContainer(true);
    getVisible();
  }

  const getVisible = () => {
    setTimeout(() => {  
      setVisible(visibleRef.current);
    }, 500);
  }
  
  useEffect(() => {
    if(!discovery.loading && session.authenticated) {
        dispatch(bagService.getBag());
    }
  }, [discovery.loading, 
      session.authenticated]);
  
  let container = null;

  const setContainer = (c) => {
      container = c;
  }

  const { data } = bag;
  const { totalItems, totalAmount } = data;
  return (
    <React.Fragment>
    <div 
        onMouseEnter={setIn}
        onMouseLeave={setNotIn}
        className="shopping-cart"
        id="shopping-cart">
      <Link to={getBagPath(match)}>
        <div className="cart-icon d-inline-block">
          <span className="icon_bag_alt" />
        </div>
        <div className="cart-info d-inline-block">
          <p>{localization[lang]['mybag']}
          <span>{totalItems || 0} {localization[lang]['items']} - ${round(totalAmount || 0)}</span>
          </p>
        </div>
        </Link>
      <Transition 
        in={visible}
        timeout={0}
        onEntering={() => { slide(container, 'slideDown', { duration: 500 }); }}
        onExiting={() => { slide(container, 'slideUp', { duration: 500 }); }}>
          <div className="cart-floating-box" id="cart-floating-box" ref={setContainer}>
            <Accordion 
              {...props}
              bag={bag}/>
          </div>
      </Transition>
    </div>
    </React.Fragment>
  );
}

export default BagMenu;
