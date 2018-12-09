import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Row, Form, Input, Button, message, Select} from 'antd';
import * as QueryEhrActions from './QueryEhrActions';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(state => ({
    queryEhr: state.queryEhr
}))
class QueryEhrQuery extends Component {
    constructor(props) {
        super(props);
        this.action = bindActionCreators(QueryEhrActions, props.dispatch);
    }

    onQuery() {
        const query = this.props.form.getFieldsValue();
        const {token} = this.props.queryEhr;

        if ((query.idNo === undefined || query.idNo === '') && (query.diseaseName === undefined || query.diseaseName === '')) {
            message.warning("请输入参数！");
        } else {
            const {ehrs} = this.props.queryEhr;
            while (ehrs.length > 0) {
                this.action.clearEhrs();
            }
            if ((query.idNo !== undefined || query.idNo !== '')) {
                this.action.queryEhrById({
                    idNo: query.idNo,
                    token: token
                })
            } else {
                this.action.queryEhrByDisease({
                    diseaseName: query.diseaseName,
                    token: token
                });
            }
        }
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {diseaseList} = this.props.queryEhr;
        return (
            <main className="container">
                <div className="search">
                    <Form horizontal ref="search" className="ant-advanced-search-form">
                        <Row type="flex" gutter={0}>
                            <Col sm={6}>
                                <FormItem
                                    label="医疗编号:"
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 15}}
                                >
                                    <Input placeholder="请输入医疗编号" {...getFieldProps('idNo')} size="default"/>
                                </FormItem>
                            </Col>
                            <Col sm={6}>
                                <FormItem
                                    label="病名:"
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 15}}
                                >
                                    <Select placeholder="请选择病名" {...getFieldProps('diseaseName')}>
                                        {Object.keys(diseaseList).map((key, index) => {
                                            return (<Option value={diseaseList[key]} key={index}>{diseaseList[key]}</Option>)
                                        })}
                                    </Select>
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

}

export default Form.create()(QueryEhrQuery);