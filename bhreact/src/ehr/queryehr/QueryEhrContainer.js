import React, {Component} from 'react';
import {connect} from 'react-redux';
import QueryEhrTable from './QueryEhrTable';
import QueryEhrQuery from './QueryEhrQuery';
import './tableform.less';

@connect(state => ({
    queryEhr: state.queryEhr
}))
export default class QueryEhrContainer extends Component {

    render() {
        return (
            <div className="query">
                <QueryEhrQuery/>
                <QueryEhrTable/>
            </div>
        );
    }

}
