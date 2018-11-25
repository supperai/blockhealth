import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'antd';
import * as QueryEhrActions from './QueryEhrActions';

@connect(state => ({
    queryEhr: state.queryEhr
}))
export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.action = bindActionCreators(QueryEhrActions, props.dispatch);
    }

    login() {
        this.action.getToken();
        // this.action.login();
        this.action.getDiseaseList();
    }

    render() {
        return (
            <Button className="query-button" htmlType="submit" type="primary"
                    onClick={this.login.bind(this)}>登录</Button>
        )
    }
}
