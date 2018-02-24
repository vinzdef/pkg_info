import React from 'react';

import { connect } from 'react-redux';
import { fetchDetail } from '../actions/detailActions';

import {detailPage} from '../styles/pages/detail.scss';
import Detail from '../components/Detail';

class DetailPage extends React.Component {

    componentWillMount() {
        const {name} = this.props.match.params;
        this.props.dispatch(fetchDetail(name));
    }

    componentWillReceiveProps(nextProps) {
        const {name} = nextProps.match.params;

        if (name !== this.props.match.params.name) {
            this.props.dispatch(fetchDetail(name));
        }
    }

    render() {
        const {pack} = this.props;
        return <div className={detailPage}>
            <Detail pack={pack} />
        </div>;
    }
}


const mapStateToProps = (state) => {
    return {
        pack: state.detailReducer
    };
};

export default connect(mapStateToProps)(DetailPage);
