import React, { useState, useEffect, useRef } from 'react';
import { instance as axios } from '../../../Helpers/api';
import { chunkArray } from '../../../../Layout/Helpers/general';
import Slider from "react-slick";
import { SlickArrowLeft, SlickArrowRight } from '../../HeroSlider/sliderHelper';
import Column from '../Column';
import { productParams } from '../../../../../services/api'
import { parseTemplate } from 'url-template';
const $ = window.$;

const settings = {
  arrows: true,
  autoplay: false,
  dots: false,
  infinite: false,
  slidesToShow: 4,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [{
    breakpoint: 1499,
    settings: {
      slidesToShow: 4,
    }
  },
  {
    breakpoint: 1199,
    settings: {
      slidesToShow: 4,
    }
  },
  {
    breakpoint: 991,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 575,
    settings: {
      slidesToShow: 2,
    }  
  },
  {
    breakpoint: 479,
    settings: {
      slidesToShow: 1,
    }
  }
  ]
};

function Category(props) {
  const { category } = props;
  const { lang, curr } = props.match.params;


  //we need local state to store products 
  const [stateObject, setObjectState] = useState({
    products: [],
  });

  useEffect(() => {
    let isSubscribed = true;
    if(isSubscribed) {
    const { href } = category._links.products;
    const uri = parseTemplate(href).expand({
      ...productParams,
      "locale": lang,
      "currency": curr,
    })
    axios.post(uri, [])
      .then((response) => {
        if (isSubscribed) {
          setObjectState((prevState) => ({
            ...prevState,
            products: (response.data.searchResults) ? response.data.searchResults._embedded.products
              : [],
          }));
        }
      })
    }
    return () => (isSubscribed = false);
  }, [lang, curr]);

  const renderColumns = (products, category) => {
    const chunks = chunkArray(products, 3);
    return chunks.map(chunk => {
      return (
        <Column
          {...props}
          key={chunks.indexOf(chunk)}
          category={category}
          products={chunk}
        />
      )
    })
  }

  let slider;
  return (
    <div key={0} className="tab-slider-container">
      <Slider ref={c => (slider = c)} {...settings}>
        {renderColumns(stateObject.products, category)}
      </Slider>
    </div>
  );
}

export default Category;