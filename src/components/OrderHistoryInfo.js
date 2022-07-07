import React from 'react';
import '../css/order_history(style).css'
import {Link} from 'react-router-dom';
import {getAllOrder} from "../services/userService";
import localStorage from "localStorage";

export class OrderHistoryInfo extends React.Component {
    headers = ["订单号", "订单金额", "下单时间", "收件人", "收件地址", "联系电话"];

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
                <Link to={{
                    pathname: "/orderDetail",
                    state: {oid: order.orderListId}
                }
                }>
                    <td>{order.orderListId}</td>
                </Link>
                <td>{order.price / 100.0} ￥</td>
                <td>{order.time}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.tel}</td>

            </tr>
        )

    }


    render() {

        return (
            <div className={"OrderHistory"}>
                <div className="main_part">
                    <h3>购买记录</h3>
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
                                    <tr>{
                                        this.headers.map(function (title, idx) {
                                            return <th key={idx}>{title}</th>;
                                        }, this)
                                    }</tr>
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