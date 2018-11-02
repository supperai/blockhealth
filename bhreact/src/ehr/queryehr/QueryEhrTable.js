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
            title: '身份证号',
            dataIndex: 'idNo',
            key: 'idNo',
        }, {
            title: '病名',
            dataIndex: 'diseaseName',
            key: 'diseaseName',
        }, {
            title: '病历',
            dataIndex: 'ehr',
            key: 'ehr',
        }];

        return (
            <Table dataSource={ehrs} columns={ehrColumns} bordered pagination={false} className="center-table"/>
        )
    }

}
