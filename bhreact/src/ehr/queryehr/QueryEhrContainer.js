import React, {Component} from 'react';
import {connect} from 'react-redux';
import QueryEhrTable from './QueryEhrTable';
import QueryEhrQuery from './QueryEhrQuery';
import './tableform.less';
import {Link} from "react-router";
import LoginButton from './LoginButton';

@connect(state => ({
    queryEhr: state.queryEhr
}))
export default class QueryEhrContainer extends Component {

    OnlyGuestLinks() {
        const {token} = this.props.queryEhr;
        if (token === '' || token === undefined) {
            return (
                <span>
                    <li className="pure-menu-item">
                        <Link to="/signUp" className="pure-menu-link">注册</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/loadInfo" className="pure-menu-link">上传信息</Link>
                    </li>
                    <LoginButton/>
                </span>
            )
        }
    }


    render() {

        return (
            <div className="query">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <ul className="pure-menu-list navbar-right">
                        {this.OnlyGuestLinks()}
                    </ul>
                </nav>
                <QueryEhrQuery/>
                <QueryEhrTable/>
            </div>
        );
    }

}
