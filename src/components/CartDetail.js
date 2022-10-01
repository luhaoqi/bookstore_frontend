import React from 'react';
import {Button} from 'antd';
import {addBookToCart, deleteBookFromCart, getAllCartItems} from "../services/cartService";
import localStorage from "localStorage";
import {Link} from "react-router-dom";

export class CartDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: null,
            totNum: 0,
            totPrice: 0
        }
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    }

    getBookInfo() {
        getAllCartItems(localStorage["uid"])
            .then(res => {
                console.log("获取购物车信息成功 ", res);
                this.setState({cartItems: res});
                let num = 0, price = 0;
                for (let i = 0; i < res.length; i++) {
                    let item = res[i];
                    num += item.num;
                    price += parseFloat(item.book.price) * item.num;
                }
                this.setState({totNum: num, totPrice: price});
            })
            .catch(err => {
                console.log('ERROR 获取购物车信息失败 ');
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
                    <figcaption>作者:{item.book.author}</figcaption>
                    <figcaption>￥{item.book.price / 100.0}</figcaption>
                    <ul className="amount">
                        <Button className="first-item"
                                onClick={(e) => {
                                    this.handleDeleteFromCart(item.book.bid)
                                }}> - </Button>
                        <li className="item">{item.num}</li>
                        <Button className="last-item" disabled={item.book.stock === item.num}
                                onClick={(e) => {
                                    this.handleAddToCart(item.book.bid)
                                }}> + </Button>
                    </ul>
                </figure>
            </div>
        );
    }

    handleAddToCart(bid) {
        addBookToCart(localStorage["uid"], bid)
            .then(res => {
                console.log("增加书籍成功 ", res);
                this.getBookInfo();
            })
            .catch(err => {
                console.log('ERROR 增加书籍失败 ');
            });
    }

    handleDeleteFromCart(bid) {
        deleteBookFromCart(localStorage["uid"], bid)
            .then(res => {
                console.log("删除一本书籍成功 ", res);
                this.getBookInfo();
            })
            .catch(err => {
                console.log('ERROR 删除一本书籍失败 ');
            });
    }


    render() {

        return (
            <div className="your_order">
                <h3>您的购物车</h3>
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
