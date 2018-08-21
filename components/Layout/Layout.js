import React from 'react';
import {Header} from '../Header';
import PropTypes from 'prop-types';
import s from './Layout.scss';

function Layout({ header, children }) {
  return (
    <div className={s.root}>
      <Header>{header}</Header>
      <main>
        {children}

      </main>
      <footer>
        <span>© Company Name Hehe</span>
      </footer>
    </div>
  );
}

Layout.propTypes = {
    header: PropTypes.element,
    children: PropTypes.element.isRequired
};

export default Layout;


