import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

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
        }, {
            title: '病名',
            dataIndex: 'diseaseName',
            key: 'diseaseName',
        }, {
            title: '详细信息',
            dataIndex: 'detail',
            key: 'detail',
        }];

        return (
            <Table dataSource={ehrs} columns={ehrColumns} bordered pagination={false} className="center-table"/>
        )
    }

}
