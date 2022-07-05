import React from 'react';
import '../css/home_page.css'
import '../css/bootstrap.min.css'
import {Link} from 'react-router-dom';
import localStorage from "localStorage";

export class AdminHeader extends React.Component {

    constructor(props) {
        super(props);
        this.handlelogout = this.handlelogout.bind(this);
    }

    handlelogout(event) {
        console.log(event);
        localStorage.removeItem("uid");
        event.target.ownerDocument.location.pathname = "/login";
    }

    render() {
        // console.log(localStorage["uid"]);
        // const user = JSON.parse(localStorage.getItem("user"));

        return (
            <div className="catalog">
                <ul className="nav">
                    <li><Link to="/admin_user">用户管理</Link></li>
                    <li><Link to="/admin_book">书籍管理</Link></li>
                    <li><Link to="/admin_order">订单管理</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link " to={{pathname: '/login'}}
                              onClick={this.handlelogout}>
                            退出
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}