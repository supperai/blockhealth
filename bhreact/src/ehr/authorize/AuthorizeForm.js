import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Col, Row, Form, Button, message, Select} from 'antd';
import * as AuthorizeActions from './AuthorizeActions';
import {connect} from 'react-redux';

const FormItem = Form.Item;

@connect(state => ({
    authorize: state.authorize
}))
class AuthorizeForm extends Component {
    constructor(props) {
        super(props);
        this.action = bindActionCreators(AuthorizeActions, props.dispatch);
    }

    onSubmit() {
        const infoForm = this.props.form.getFieldsValue();

        if (infoForm.name === undefined || infoForm.name === '') {
            message.warning("请输入信息！");
        } else {
            this.action.submitAuth(infoForm.name);
        }
    }

    getReqList() {
        this.action.getRequestList();
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {requestList} = this.props.authorize;
        return (
            <main className="container">
                <div className="search">
                    <Form horizontal ref="search" className="ant-advanced-search-form">
                        <Row type="flex" gutter={0}>
                            <Col sm={12} offset={4}>
                                <FormItem
                                    label="医院名:"
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 15}}
                                >
                                    <Select placeholder="请选择医院名" {...getFieldProps('name')}>
                                        {Object.keys(requestList).map((key, index) => {
                                            return (<Option value={requestList[key]} key={index}>{requestList[key]}</Option>)
                                        })}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col sm={4}>
                                <Button className="button" htmlType="submit" type="primary"
                                        onClick={this.getReqList.bind(this)}>获取请求列表</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4} offset={10}>
                                <Button className="button" htmlType="submit" type="primary"
                                        onClick={this.onSubmit.bind(this)}>通过</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </main>
        )
    }

}

export default Form.create()(AuthorizeForm);