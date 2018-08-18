import React from 'react';
import PropTypes from 'prop-types';

function Header({children}) {
    return (
        <header>
            <div>
                <span>My Baby needs</span>
                {
                    !children && <form><input type="search"/></form>
                }
                <div>
                    <span>Username</span>
                    <img src="#" />
                </div>
            </div>
            {children}
        </header>
    )
}

Header.protoTypes = {
    children: PropTypes.element
}

export default Header;