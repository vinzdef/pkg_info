import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import R from 'ramda';

import {detail, detailTitle, detailSection, detailSectionTitle, detailSectionContent} from '../styles/pages/detail.scss'
import {packageLink} from '../styles/buttons/packageLink.scss';

export default class Detail extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pack: nextProps.pack})
    }

    render() {
        const {pack} = this.state;
        if (!pack) return <div></div>;

        const packName = R.prop('Package');
        const name = packName(pack);

        const pNameToLink = p => <Link
            className={packageLink}
            to={`/package/${p}`}
        > {p} </Link>;

        const dependenciesLinks = R.map(pNameToLink, pack['Depends']);
        const revDependenciesLinks = R.map(pNameToLink, pack['Reverse-Dependencies']);

        return <div className={detail}>
            <h2 className={detailTitle}>{name}</h2>
            <p>
                {pack['Description']}
            </p>
            {
            <div className={detailSection}>
                <h3 className={detailSectionTitle}> Dependencies: </h3>
                <div className={detailSectionContent}>
                    <ul>
                    {
                        dependenciesLinks.map((l,i) => <li key={i}>{l}</li>)
                    }
                    </ul>
                </div>
            </div>
            }

            {
            <div className={detailSection}>
                <h3 className={detailSectionTitle}> Reverse dependencies: </h3>
                <div className={detailSectionContent}>
                    <ul>
                    {
                        revDependenciesLinks.map((l, i) => <li key={i}>{l}</li>)
                    }
                    </ul>
                </div>
            </div>
            }

        </div>;
    }
}
