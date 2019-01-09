import React, {Component} from 'react';
import { Card,Button } from 'antd';

const { Meta } = Card;

export default class QueryCard extends Component {
    constructor(props) {
        super(props);
    }

    enter() {
        window.location.href="http://localhost:3000/query";
    }

    render() {
        return (
            <Card
                hoverable
                style={{ width: 450 }}
                cover={<img alt="example" src="https://cloud.neusoft.com/pages/news/medialist/m20180727086/images/img01.jpg" />}
                actions={[<Button className="button" htmlType="submit" type="primary" onClick={this.enter}>查询数据</Button>]}
            >
                {/*<Meta title={<div style={{textAlign:"center"}}>查询数据</div>}/>*/}
            </Card>
        )
    }

}

