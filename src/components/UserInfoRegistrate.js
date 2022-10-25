import React from 'react';
import {purchaseAll} from "../services/cartService";
import localStorage from "localStorage";
import config from "../utils/config";
import {history} from "../utils/history";

function handleMessage(msg) {
    alert("购买成功,即将转到订单详情页面");
    msg = JSON.parse(msg)
    console.log("OrderListId: ", msg.orderListId);
    history.push({
        pathname: "/orderDetail",
        state: {oid: msg.orderListId}
    })
}

function openSocket(socket) {
    //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
    console.log("open socket!")
    let socketUrl = config.websocketUrl + localStorage["uid"];
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
        console.log("websocket已打开");
        //socket.send("这是来自客户端的消息" + location.href + new Date());
    };
    //获得消息事件
    socket.onmessage = function (msg) {
        let serverMsg = "收到服务端信息：" + msg.data;
        console.log(serverMsg);
        //发现消息进入    开始处理前端触发逻辑
        handleMessage(msg.data);
    };
    // //关闭事件
    // socket.onclose = function () {
    //     console.log("websocket已关闭");
    // };
    // //发生了错误事件
    // socket.onerror = function () {
    //     console.log("websocket发生了错误");
    // }
}


function closeSocket(socket) {
    if (socket === undefined || socket === null) {
        alert("请先连接");
        return;
    }
    socket.close();
    socket = null;
}

export class UserInfoRegistrate extends React.Component {
    socket = null;

    constructor(props) {
        super(props);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.state = {
            name: "",
            tel: "",
            address: "",
        };
    }

    handlePurchase(e) {
        // e.preventDefault();
        const {tel, address, name} = this.state;
        purchaseAll(localStorage["uid"], tel, address, name)
            .then(res => {
                console.log("购买完成 ", res);
                // alert("购买成功");
                // history.push("/cart");
            })
            .catch(err => {
                console.log('ERROR 购买失败 ');
                alert("发生错误", err);
            });
    }

    componentDidMount() {
        openSocket(this.socket)
    }

    render() {

        return (
            <div className="registration">
                <div className="container">
                    <h3>登记信息</h3>
                    <div className="form-group">
                        <label htmlFor="phone">电话</label>
                        <input className="form-control basic_data" id="phone"
                               onChange={(e) => {
                                   this.setState({tel: e.target.value})
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input className="form-control basic_data" id="name"
                               onChange={(e) => {
                                   this.setState({name: e.target.value})
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">地址</label>
                        <input className="form-control basic_data" id="address"
                               onChange={(e) => {
                                   this.setState({address: e.target.value})
                               }}/>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="email">邮箱</label>*/}
                    {/*    <input className="form-control basic_data" id="email"/>*/}
                    {/*</div>*/}
                    {/*<h4>地址</h4>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="city">城市</label>*/}
                    {/*    <input className="form-control phone" id="city"/>*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="street">街道（详细地址）</label>*/}
                    {/*    <input className="form-control" id="street"/>*/}
                    {/*</div>*/}
                    {/*<div className="your_address">*/}
                    {/*    <div className="form-group">*/}
                    {/*        <input className="form-control address" id="house" placeholder="省"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <input className="form-control address" placeholder="市"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <input className="form-control address" placeholder="县"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<h4>付款方式</h4>*/}
                    {/*<form name="my_form" method="POST">*/}
                    {/*    <input type="radio" name="question1" value="AliPay"/>支付宝*/}
                    {/*    <input type="radio" name="question1" value="WechatPay"/>微信*/}
                    {/*    <input type="radio" name="question1" value="bank"/>银联*/}
                    {/*</form>*/}
                    {/*<Link to={{*/}
                    {/*    pathname: "/orderHistory",*/}
                    {/*}} onClick={this.handlePurchase}>*/}
                    {/*    提交订单*/}
                    {/*</Link>*/}
                    <button className="checkout" onClick={this.handlePurchase}>提交订单</button>
                </div>
            </div>


        )

    }

}
