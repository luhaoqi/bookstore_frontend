import React from 'react';
import DocumentTitle from 'react-document-title'
import {Router, Route, Switch, Redirect} from 'react-router-dom';
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
import localStorage from "localStorage";
import BookDetail from "./components/BookDetail";
import AdminBookView from "./view/AdminBookView";
import AdminUserView from "./view/AdminUserView";
import AdminOrderListView from "./view/AdminOrderListView";
import UserOrderView from "./view/UserOrderView";

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
                    {
                        /*
                        <PrivateRoute exact path="/" component={HomeView}/>
                        <LoginRoute exact path="/login" component={LoginView} />
                        <PrivateRoute exact path="/bookDetails" component={BookView} />
                        <Redirect from="/*" to="/" />
                        */
                    }
                    <Route exact path="/" component={HomeView}/>
                    <Route exact path="/home" component={HomeView}/>
                    <Route exact path="/admin" component={AdminUserView}/>
                    <Route exact path="/admin_book" component={AdminBookView}/>
                    <Route exact path="/admin_user" component={AdminUserView}/>
                    <Route exact path="/admin_order" component={AdminOrderListView}/>
                    <Route exact path="/userOrder" component={UserOrderView}/>
                    <Route exact path="/login" component={LoginView}/>
                    <Route exact path="/bookDetails" component={BookView}/>
                    <Route exact path="/cart" component={CartView}/>
                    <Route exact path="/fiction" component={FictionView}/>
                    <Route exact path="/personalPage" component={PersonalPageView}/>
                    <Route exact path="/orderHistory" component={OrderHistoryView}/>
                    <Redirect from="/*" to="/"/>
                </Switch>


            </Router>
        )
    }


}

export default BasicRoute;