import React from "react";
import BasicMenuItem from '../BasicMenuItem';
import { getContactPath, getHomePath, getCategoryPath } from '../../../Helpers/route';

function MainMenu(props) {
    const { match } = props;

    return (
        <nav style={{ "display": "block" }}>
            <ul>
                <li>
                    <BasicMenuItem
                        {...props}
                        routePath={getHomePath(match)}
                        descKey={'home'} />
                </li>
                <li>
                    <BasicMenuItem
                        {...props}
                        routePath={getCategoryPath('FRT01', match)}
                        descKey={'mens'} />
                </li>
                <li>
                    <BasicMenuItem
                        {...props}
                        routePath={getCategoryPath('VEG01', match)}
                        descKey={'womans'} />
                </li>
                <li>
                    <BasicMenuItem
                        {...props}
                        routePath={getCategoryPath('NUT01', match)}
                        descKey={'unisex'} />
                </li>
                <li>
                    <BasicMenuItem
                        {...props}
                        descKey={'contact'}
                        routePath={getContactPath(props.match)} />
                </li>
            </ul>
        </nav>
    );
}

export default MainMenu;