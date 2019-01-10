import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'antd';
import './tableform.less';

@connect(state => ({
    queryEhr: state.queryEhr
}))
export default class QueryEhrTable extends Component {

    render(){
        const {ehrs} = this.props.queryEhr;

        const ehrColumns = [{
            title: '序号',
            dataIndex: 'no',
            key: 'no',
            className: "infoForm",
        }, {
            title: '来源',
            dataIndex: 'hspt',
            key: 'hspt',
            className: "infoForm",
        }, {
            title: '类型',
            dataIndex: 'columnname',
            key: 'columnname',
            className: "infoForm",
        }, {
            title: '详细信息',
            dataIndex: 'value',
            key: 'value',
            className: "infoForm",
        }];

        return (
            <Row>
                <Col span={22} offset={1}>
                    <Table dataSource={ehrs} columns={ehrColumns} bordered pagination={false} className="center-table"/>
                </Col>
            </Row>
        )
    }

}
