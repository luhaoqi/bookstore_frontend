import React from 'react';
import '../css/order_history(style).css'
import {Link} from 'react-router-dom';
import {getAllOrder} from "../services/userService";
import localStorage from "localStorage";

export class OrderHistoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null
        }
        this.getOrderelem = this.getOrderelem.bind(this);
    }

    getOrderInfo() {
        console.log(localStorage["uid"]);
        getAllOrder(localStorage["uid"])
            .then(res => {
                console.log("获取所有订单信息成功 ", res);
                this.setState({order: res});
            })
            .catch(err => {
                console.log('ERROR 获取所有订单信息失败 ');
            });
    }

    componentDidMount() {
        if (!localStorage["uid"]) return;
        this.getOrderInfo();
    }

    getOrderelem = (Order) => {
        if (!Order) return;
        return Order.map((order) =>
            <tr>
                <td>{order.orderListId}</td>
                <td>{order.price} ￥</td>
                <td>{order.time}</td>
                <td>处理中</td>
            </tr>
        )
    }


    render() {

        return (
            <div className={"OrderHistory"}>
                <div className="main_part">
                    <h3>个人专区</h3>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-7 menu">
                                <ul>
                                    <li className="item" style={{width: 300}}>
                                        <Link to="/personalPage" className="your_data">
                                            {"个人资料"}
                                        </Link>
                                    </li>
                                    <li className="item">
                                        <Link to="orderHistory" className="history">
                                            订单历史
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-5 col-7 data">
                                <table>
                                    <tr>
                                        <th>订单号</th>
                                        <th>订单金额</th>
                                        <th>下单时间</th>
                                        <th>状态</th>
                                    </tr>
                                    {this.getOrderelem(this.state.order)}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}