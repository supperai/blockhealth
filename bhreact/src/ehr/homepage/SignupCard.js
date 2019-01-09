import React, {Component} from 'react';
import { Card,Button } from 'antd';

const { Meta } = Card;

export default class SignupCard extends Component {
    constructor(props) {
        super(props);
    }

    enter() {
        window.location.href="http://localhost:3000/signup";
    }

    render() {
        return (
            <Card
                hoverable
                style={{ width: 450 }}
                cover={<img alt="example" src="http://5b0988e595225.cdn.sohucs.com/images/20181108/5b832910ad93485a8da6dd46adef3835.jpeg" />}
                actions={[<Button className="button" htmlType="submit" type="primary" onClick={this.enter}>申请</Button>]}
            >
                {/*<Meta title={<div style={{textAlign:"center"}}>申请</div>}/>*/}
            </Card>
        )
    }

}

