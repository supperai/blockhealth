import React, {Component} from 'react';
import SignupCard from './SignupCard';
import QueryCard from './QueryCard';
import AuthCard from './AuthCard';
import {Row, Col} from 'antd';

export class HomePage extends Component {

    render() {
        return (
            <div>
                <Row>
                    <h1/>
                </Row>
                <Row>
                    <h1/>
                </Row>
                <Row>
                    <h1/>
                </Row>
                <Row>
                    <h1/>
                </Row>
                <Row>
                    <h1/>
                </Row>
                <Row>
                    <h1/>
                </Row>
                <Row>
                    <h1/>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Col span={8}>
                        <SignupCard/>
                    </Col>
                    <Col span={8}>
                        <QueryCard/>
                    </Col>
                    <Col span={8}>
                        <AuthCard/>
                    </Col>
                </Row>
            </div>
        );
    }

}