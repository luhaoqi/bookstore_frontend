import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./services/userService"
import {message} from "antd";
import localStorage from "localStorage";

export class LoginRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: localStorage["uid"] && localStorage["user_state"],
        };
    }

    render() {

        const {component: Component, path="/",exact=false,strict=false} = this.props;

        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuthed ? (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
            ) : (
                <Component {...props}/>
            )
        )}/>
    }
}

export default LoginRoute