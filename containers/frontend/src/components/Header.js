import React from 'react';
import {Link} from 'react-router-dom';

import {header, headerTitle, headerSubtitle} from '../styles/components/header.scss';

const Header = () => <div className={header}>
    <h1 className={headerTitle}>
        <Link to='/'>PKG_INFO</Link>
    </h1>
    <h3 className={headerSubtitle}>A list of all packages installed on this very system</h3>
</div>;

export default Header;
