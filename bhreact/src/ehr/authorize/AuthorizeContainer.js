import React, {Component} from 'react';
import AuthorizeForm from './AuthorizeForm';

export class AuthorizeContainer extends Component {

    render() {
        return (
            <div className="form">
                <AuthorizeForm/>
            </div>
        );
    }

}