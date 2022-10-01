import React from 'react';
import '../css/home_page.css'
import '../css/bootstrap.min.css'
import {Link} from 'react-router-dom';
import localStorage from "localStorage";
import {logout} from "../services/userService";
import {history} from "../utils/history";

export class HeaderInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
        }
        this.handlelogout = this.handlelogout.bind(this);
    }

    handlelogout(event) {
        console.log(event);
        // 删 uid
        localStorage.removeItem("uid");
        logout()
            .then(res => {
                console.log("SUCCESS 登出成功 ", res);
                alert("start time: " + res.start + "\nend time: " + res.end + "\ntotal time(s): " + parseFloat(res.total)/1000.0)
            })
            .catch(err => {
                console.log('ERROR 登录时连接失败 ', err);
            });
        event.target.ownerDocument.location.pathname = "/login";
    }

    render() {
        console.log("HeaderInfo:", this.state);
        // console.log(localStorage["uid"]);
        // const user = JSON.parse(localStorage.getItem("user"));
        const {search} = this.state;
        return (
            <div>
                {/*<!---导航栏--->*/}
                <nav className="navbar navbar-expand-md navbar-dark">
                    {/*<!---左上角标题--->*/}
                    <Link className="navbar-brand" to="/">在线书店</Link>
                    <div className="input-group">
                        {/*<!---搜索栏--->*/}
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                               value={search}
                               onChange={(e) => {
                                   this.setState({
                                       search: e.target.value
                                   })
                               }}/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary button_search" type="button"
                                    onClick={(e) => {
                                        this.setState({
                                            search: "",
                                        })
                                        this.props.callback(search);
                                    }}>
                                搜索
                            </button>
                        </span>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    {/*<!---右上角跳转--->*/}
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav mr-4">
                            <li className="nav-item">
                                <Link className="nav-link" to="/userOrder">我的订单</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/personalPage">个人主页</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/cart">购物车</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/orderHistory">购买记录</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to={{pathname: '/login'}}
                                      onClick={this.handlelogout}>
                                    退出
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/*<!---目录栏--->*/}
                <div className="catalog">
                    <ul className="nav">
                        <li><Link to="/fiction">科幻</Link>
                            <ul>
                                <li><Link to="/fiction">科幻</Link></li>
                                <li><Link to="/">幻想</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/">文学</Link></li>
                        <li><Link to="/">小说</Link></li>
                        <li><Link to="/">童书</Link></li>
                        <li><Link to="/">历史</Link></li>
                        <li><Link to="/">管理</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}