import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Row, Form, Input, Button, message, Select} from 'antd';
import * as QueryEhrActions from './QueryEhrActions';
import {ITEM, ITEM_MAP} from "../constant/EhrConstants";

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

        if (query.vid === undefined || query.vid === ''
            || query.columnNames === undefined || query.columnNames === '') {
            message.warning("请输入参数！");
        } else {
            const {ehrs} = this.props.queryEhr;
            while (ehrs.length > 0) {
                this.action.clearEhrs();
            }

            let columnList = [];
            for (let i=0; i<query.columnNames.length; i++) {
                columnList.push(ITEM_MAP[query.columnNames[i]]);
            }

            this.action.queryEhrById({
                vid: query.vid,
                columnList: columnList,
                token: token
            })
        }
    }

    render() {
        const {getFieldProps} = this.props.form;
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
                                    <Input placeholder="请输入医疗编号" {...getFieldProps('vid')} size="default"/>
                                </FormItem>
                            </Col>
                            <Col sm={10}>
                                <FormItem
                                    label="项目:"
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 15}}
                                >
                                    <Select mode="tags" placeholder="请选择项目" {...getFieldProps('columnNames')}>
                                        {Object.keys(ITEM).map((key, index) => {
                                            return (<Option value={ITEM[key]} key={index}>{ITEM[key]}</Option>)
                                        })}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col sm={3} offset={1}>
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