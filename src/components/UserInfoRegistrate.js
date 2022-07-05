import React from 'react';
import {Descriptions, Button} from 'antd';
import {purchaseAll} from "../services/cartService";
import localStorage from "localStorage";
import {Link, Redirect} from "react-router-dom";


export class UserInfoRegistrate extends React.Component {

    constructor(props) {
        super(props);
        this.handlePurchase = this.handlePurchase.bind(this);
    }

    handlePurchase(e) {
        // e.preventDefault();
        purchaseAll(localStorage["uid"])
            .then(res => {
                console.log("购买成功 ", res);
                alert("购买成功");
                this.getBookInfo();
            })
            .catch(err => {
                console.log('ERROR 购买失败 ');
            });
    }

    render() {


        return (
            <div className="registration">
                <div className="container">
                    <h3>登记信息</h3>
                    <div className="form-group">
                        <label htmlFor="phone">电话</label>
                        <input className="form-control basic_data" id="phone" type="number"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input className="form-control basic_data" id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">邮箱</label>
                        <input className="form-control basic_data" id="email"/>
                    </div>
                    <h4>地址</h4>
                    <div className="form-group">
                        <label htmlFor="city">城市</label>
                        <input className="form-control phone" id="city"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">街道（详细地址）</label>
                        <input className="form-control" id="street"/>
                    </div>
                    <div className="your_address">
                        <div className="form-group">
                            <input className="form-control address" id="house" placeholder="省"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control address" placeholder="市"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control address" placeholder="县"/>
                        </div>
                    </div>
                    <h4>付款方式</h4>
                    <form name="my_form" method="POST">
                        <input type="radio" name="question1" value="AliPay"/>支付宝
                        <input type="radio" name="question1" value="WechatPay"/>微信
                        <input type="radio" name="question1" value="bank"/>银联
                    </form>
                    <Link to={{
                        pathname: "/orderHistory",
                    }} onClick={this.handlePurchase}>
                        提交订单
                    </Link>
                    {/*<Button className="checkout" size={"middle"} onClick={this.handlePurchase}>提交订单</Button>*/}
                </div>
            </div>


        )

    }

}
