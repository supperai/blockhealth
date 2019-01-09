import React, {Component} from 'react';
import { Card,Button } from 'antd';

const { Meta } = Card;

export default class SignupCard extends Component {
    constructor(props) {
        super(props);
    }

    enter() {
        window.location.href="http://localhost:3000/auth";
    }

    render() {
        return (
            <Card
                hoverable
                style={{ width: 450}}
                cover={<img alt="example" src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180607/94b6ce0ee8c542d6bd9503383cdd93cf.jpeg" />}
                actions={[<Button className="button" htmlType="submit" type="primary" onClick={this.enter}>审核</Button>]}
            >
                {/*<Meta title={<div style={{textAlign:"center"}}>审核</div>}/>*/}
            </Card>
        )
    }

}