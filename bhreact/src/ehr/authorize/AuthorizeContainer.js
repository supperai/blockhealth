import React, {Component} from 'react';
import AuthorizeForm from './AuthorizeForm';
import {Link} from "react-router";

export class AuthorizeContainer extends Component {

    render() {
        return (
            <div className="form">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <ul className="pure-menu-list navbar-right">
                        <Link to="/" className="pure-menu-link">返回</Link>
                    </ul>
                </nav>
                <AuthorizeForm/>
            </div>
        );
    }

}