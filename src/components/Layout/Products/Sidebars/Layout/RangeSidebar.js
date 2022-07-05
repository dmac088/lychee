import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { round } from '../../../Helpers/math';

export const RangeSidebar = (props) => {
  const { currentPrice, modFacet, items } = props;
  const item = items[0];
  const maxPrice = (item) ? round(item.data.value,2) : 0;
  const displayPrice = (currentPrice) ? round(currentPrice,2) : maxPrice;
    return (
      <div className="sidebar mb-35">
        <p>Value less than: {displayPrice}</p>
        <Slider 
        onChange={(value) => modFacet({
          "data": {
                  "type": "EntityFacet", 
                  "desc": value, 
                  "facetingName": "price",
                  "hierarchical": false,
                  "id": value,
                  "objectType": "double",
                  "value": value
                  }
        })}
        trackStyle={{ backgroundColor: '#80bb01', height: 10 }}
        handleStyle={{
          borderColor: '#80bb01',
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: 'grey',
        }}
        min={maxPrice / 5}
        max={maxPrice}
        step={maxPrice / 5}
        defaultValue={displayPrice}
        value={displayPrice}
        railStyle={{ height: 10 }}
        />
      </div>
    );
  }
  