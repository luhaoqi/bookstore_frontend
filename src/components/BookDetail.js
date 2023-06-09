import React from 'react';
import {Button} from 'antd';
import {getBook} from "../services/bookService";
import {addBookToCart} from "../services/cartService"
import localStorage from "localStorage";

export class BookDetail extends React.Component {

    constructor(props) {
        super(props);
        // console.log("props:",props);
        // console.log("this.props:",this.props);
        // console.log("this.props.bid:",this.props.bid);
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
        // const img = require(`../assets/NewBooks/newbook_${bid}.jpg`);
        const img = this.state.book.image;
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

                                </div>
                                <div className="price_and_buy">
                                    <p>作者:{this.state.book.author}</p>
                                    <br/>
                                    <p className="price">￥ {this.state.book.price / 100.0}</p>
                                    <Button className="buy" disabled={this.state.book.stock === 0}
                                            onClick={this.handleAddToCart}>
                                        加入购物车
                                    </Button>
                                </div>
                                <p>开 本：16开</p>
                                <p>纸 张：胶版纸</p>
                                <p>包 装：平装-胶订</p>
                                <p>国际标准书号ISBN：{this.state.book.isbn}</p>
                                <p>销量：{this.state.book.sales}</p>
                                <p>库存：{this.state.book.stock}</p>
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

