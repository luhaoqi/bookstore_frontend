import React from 'react';
import {Redirect, Router, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import {history} from "./utils/history";
import BookView from "./view/BookView";
import CartView from "./view/CartView";
import FictionView from "./view/FictionView";
import PersonalPageView from "./view/PersonalPageView";
import OrderHistoryView from "./view/OrderHistoryView";
import AdminBookView from "./view/AdminBookView";
import AdminUserView from "./view/AdminUserView";
import AdminOrderListView from "./view/AdminOrderListView";
import UserOrderView from "./view/UserOrderView";
import RegisterView from "./view/RegisterView";

class BasicRoute extends React.Component {

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomeView}/>
                    <LoginRoute exact path="/login" component={LoginView}/>
                    <LoginRoute exact path="/register" component={RegisterView}/>
                    {/*<PrivateRoute exact path="/bookDetails" component={BookView} />*/}
                    {/*<Redirect from="/*" to="/" />*/}
                    {/*<PrivateRoute exact path="/" component={HomeView}/>*/}
                    <PrivateRoute exact path="/home" component={HomeView}/>
                    <PrivateRoute exact path="/admin" component={AdminUserView}/>
                    <PrivateRoute exact path="/admin_book" component={AdminBookView}/>
                    <PrivateRoute exact path="/admin_user" component={AdminUserView}/>
                    <PrivateRoute exact path="/admin_order" component={AdminOrderListView}/>
                    <PrivateRoute exact path="/userOrder" component={UserOrderView}/>
                    <PrivateRoute exact path="/login" component={LoginView}/>
                    <PrivateRoute exact path="/bookDetails" component={BookView}/>
                    <PrivateRoute exact path="/cart" component={CartView}/>
                    <PrivateRoute exact path="/fiction" component={FictionView}/>
                    <PrivateRoute exact path="/personalPage" component={PersonalPageView}/>
                    <PrivateRoute exact path="/orderHistory" component={OrderHistoryView}/>
                    <Redirect from="/*" to="/"/>
                </Switch>


            </Router>
        )
    }


}

export default BasicRoute;