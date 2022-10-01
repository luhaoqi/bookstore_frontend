import React from 'react';
import localStorage from "localStorage";
import {Link} from "react-router-dom";
import {getOrderItemByOid} from "../services/orderService";

export class OrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: null,
            totNum: 0,
            totPrice: 0
        }
    }

    getBookInfo() {
        getOrderItemByOid(this.props.oid)
            .then(res => {
                console.log("获取订单信息成功 ", res);
                let num = 0, price = 0;
                for (let i = 0; i < res.length; i++) {
                    let item = res[i];
                    num += item.num;
                    price += parseFloat(item.book.price) * item.num;
                }
                this.setState({cartItems: res, totNum: num, totPrice: price});
            })
            .catch(err => {
                console.log('ERROR 获取订单信息失败 ', err);
                alert('ERROR 获取订单信息失败 ', err)
            });
    }

    componentDidMount() {
        if (!localStorage["uid"]) return;
        this.getBookInfo();
    }

    createCartItems = (cartItems) => {
        if (!cartItems) return null;
        return cartItems.map((item) =>
            <div className="product">
                <figure className="book_window">
                    <Link to={
                        {
                            pathname: "/bookDetails",
                            state: {bid: item.book.bid}
                        }
                    }>
                        <img src={item.book.image} alt={item.book.name}/>
                    </Link>
                    <figcaption>{item.book.name}</figcaption>
                    <figcaption>作者: {item.book.author}</figcaption>
                    <figcaption>￥{item.book.price / 100.0}</figcaption>
                    <figcaption>数量: {item.num}</figcaption>
                    <figcaption>购买单价:￥{item.price / 100.0}</figcaption>
                    <figcaption>小计:￥{item.num * item.price / 100.0}</figcaption>
                </figure>
            </div>
        );
    }


    render() {
        console.log("oid", this.props.oid);
        return (
            <div className="your_order">
                <h3>您的订单详情</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-5 col-7">
                            {this.createCartItems(this.state.cartItems)}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-7 order_list">
                            <h5>构成订单</h5>
                            <div><p className="base">商品数量:</p><p>{this.state.totNum}</p></div>
                            <div><p className="base">总价:</p><p>{this.state.totPrice / 100.0}￥</p></div>
                            <div><p className="base">折扣:</p><p>0 ￥</p></div>
                            <div><p className="base">总计:</p><p>{this.state.totPrice / 100.0}￥ </p></div>
                        </div>
                    </div>
                </div>
            </div>


        )

    }

}
