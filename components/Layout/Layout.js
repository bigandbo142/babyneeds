import React from 'react';
import {Header} from '../Header';
import PropTypes from 'prop-types';

function Layout({ header, children }) {
  return (
    <div>
      <Header>{header}</Header>
      <main>
        {children}

      </main>
      <footer>
        <span>© Company Name</span>
      </footer>
    </div>
  );
}

Layout.propTypes = {
    header: PropTypes.element,
    children: PropTypes.element.isRequired
};

export default Layout;


