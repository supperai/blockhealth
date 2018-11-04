import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Row, Form, Input, Button, message} from 'antd';
import * as QueryEhrActions from './QueryEhrActions';
import QueryEhrTable from './QueryEhrTable';
import './tableform.less';

const FormItem = Form.Item;

@connect(state => ({
    queryEhr: state.queryEhr
}))
class QueryEhrContainer extends Component {
    constructor(props) {
        super(props);
        this.action = bindActionCreators(QueryEhrActions, props.dispatch);
    }

    renderQuery() {
        const {getFieldProps} = this.props.form;
        return (
            <main className="container">
            <div className="search">
                <Form horizontal ref="search" className="ant-advanced-search-form">
                    <Row type="flex" gutter={0}>
                        <Col sm={6}>
                            <FormItem
                                label="身份证号:"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 15}}
                            >
                                <Input placeholder="请输入身份证号" {...getFieldProps('idNo')} size="default"/>
                            </FormItem>
                        </Col>
                        <Col sm={6}>
                            <FormItem
                                label="病名:"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 15}}
                            >
                                <Input placeholder="请输入病名" {...getFieldProps('diseaseName')} size="default"/>
                            </FormItem>
                        </Col>
                        <Col sm={3} offset={3}>
                            <Button className="query-button" htmlType="submit" type="primary"
                                    onClick={this.onQuery.bind(this)}>查询</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            </main>
        )
    }

    onQuery() {
        let query = this.props.form.getFieldsValue();

        if ((query.idNo === undefined || query.idNo === '') && (query.diseaseName === undefined || query.diseaseName === '')) {
            message.warning("请输入参数！");
        } else {
            this.action.queryEhr({
                idNo: query.idNo,
                diseaseName: query.diseaseName
            });
        }
    }

    render() {
        return (
            <div className="query">
                {this.renderQuery()}
                <QueryEhrTable/>
            </div>
        );
    }

}

export default Form.create()(QueryEhrContainer);