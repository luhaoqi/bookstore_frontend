import React from 'react';
import {Descriptions, Button} from 'antd';
import {getBook} from "../services/bookService";
import {addBookToCart, deleteBookFromCart} from "../services/cartService"
import {withRouter} from "react-router-dom";
import {HeaderInfo} from "./HeaderInfo";
import localStorage from "localStorage";

export class BookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {}
        }
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    componentDidMount() {
        getBook(this.props.bid)
            .then(res => {
                console.log("获取书籍成功 ", res);
                this.setState({book: res});
            })
            .catch(err => {
                console.log('ERROR 获取书籍失败 ');
            });

    }

    handleAddToCart() {
        addBookToCart(localStorage["uid"], this.props.bid)
            .then(res => {
                console.log("增加书籍成功 ", res);
                alert("已加入购物车！");
            })
            .catch(err => {
                console.log('ERROR 增加书籍失败 ');
            });
    }

    render() {
        const {bid} = this.props;
        const img = require(`../assets/NewBooks/newbook_${bid}.jpg`);
        return (
            <div>
                <div className="main_part">
                    <div className="container">
                        <h3>{this.state.book.name}</h3>
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-5 col-5 book-img">
                                <img align="center" src={img}
                                     className="img-fluid" alt={"book"}/>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-5 col-5 book-info">
                                <div>
                                    <p>作者:</p><a href="#" className="info-book">{this.state.book.author}</a>
                                    <p>出版社:</p><a href="#" className="info-book">中国青年出版社</a>
                                </div>
                                <div className="price_and_buy">
                                    <p className="price">￥ {this.state.book.price}</p>
                                    <Button className="buy" onClick={this.handleAddToCart}>加入购物车</Button>
                                </div>
                                <p>开 本：16开</p>
                                <p>纸 张：胶版纸</p>
                                <p>包 装：平装-胶订</p>
                                <p>国际标准书号ISBN：{this.state.book.isbn}</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-7">
                                <h5>摘要</h5>
                                <p>
                                    {this.state.book.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="review">
                    <h4>书评</h4>
                    <p>
                        你可以在这里留下你的书评，我们需要每个读者的意见。
                    </p>
                    <div className="form-group">
                        <textarea className="form-control text" id="exampleFormControlTextarea1" rows="3"
                                  placeholder="评论"/>
                        <button type="button" className="btn">发送</button>
                    </div>
                </div>
            </div>


        )

    }

}

