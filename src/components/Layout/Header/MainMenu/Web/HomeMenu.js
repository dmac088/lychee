import React from 'react';
import { Link } from 'react-router-dom';
import { getHomePath } from '../../../Helpers/route';   

export const HomeMenu = ({ ...props }) => {
    const { match } = props;
    return (
        <Link to={getHomePath(match)}>
            HOME
        </Link> 
    );
};

export default HomeMenu;