import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import localStorage from "localStorage";

export default class PrivateRoute extends React.Component{
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
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

