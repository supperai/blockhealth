import React, {Component} from 'react';
import {connect} from 'react-redux';
import QueryEhrTable from './QueryEhrTable';
import QueryEhrQuery from './QueryEhrQuery';
import LoginButton from './LoginButton';
import './tableform.less';
import {Link} from "react-router";

@connect(state => ({
    queryEhr: state.queryEhr
}))
export default class QueryEhrContainer extends Component {

    OnlyGuestLinks() {
        const {token} = this.props.queryEhr;
        if (token === '' || token === undefined) {
            return (
                <LoginButton/>
            )
        }
    }

    OnlyUserShow() {
        const {token} = this.props.queryEhr;
        if (token !== '' && token !== undefined) {
            return (
                <div>
                    <QueryEhrQuery/>
                    <QueryEhrTable/>
                </div>
            )
        }
    }

    render() {

        return (
            <div className="query">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <li className="pure-menu-item">
                        <Link to="/" className="pure-menu-link">返回</Link>
                    </li>
                    {this.OnlyGuestLinks()}
                </nav>
                {this.OnlyUserShow()}
            </div>
        );
    }

}
