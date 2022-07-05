import React from 'react';
import {Carousel, List} from 'antd'
import {Book} from './Book'
import {getBooks} from "../services/bookService";
import {Link} from 'react-router-dom';
import '../css/home_page.css'
import '../css/bootstrap.min.css'
import localStorage from "localStorage";

export class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
            // books: [
            //     {bid: 0, name: "人世间", author: "梁晓声", price: 238, flag: true},
            //     {bid: 1, name: "蛤蟆先生去看心理医生", author: "罗伯特·戴博德", price: 38, flag: true},
            //     {bid: 2, name: "遥远的救世主", author: "豆豆", price: 48, flag: true},
            //     {bid: 3, name: "次第花开 修订版", author: "希阿荣博堪布", price: 39.80, flag: true},
            //     {bid: 4, name: "生死疲劳", author: "莫言", price: 69.90, flag: true},
            //     {bid: 5, name: "活着（精装）", author: "余华", price: 45, flag: true},
            //
            // ]
        };
        // this.createBooks = this.createBooks.bind(this);
    }

    componentDidMount() {
        getBooks()
            .then(res => {
                if (res.status === 500) {
                    console.log("获取所有书籍失败 ", res);
                    alert("获取所有书籍失败");
                    return;
                }
                console.log("获取所有书籍成功 ", res);
                this.setState({books: res});
            })
            .catch(err => {
                console.log('ERROR 获取所有书籍失败 ');
            });

    }

    createBooks = () => {
        // const images = ctx.keys().map(ctx);
        // console.log(images);
        let result = [];
        for (let i = 0; i < this.state.books.length; i++) {
            // let img = images[i];
            // console.log(img);
            // let img = require("../assets/NewBooks/newbook_" + `${i + 1}` + ".jpg");
            // let img = require(`../assets/NewBooks/newbook_${i + 1}.jpg`);
            let img = require(`../assets/NewBooks/newbook_${this.state.books[i].image}.jpg`);
            result.push(
                <figure className="book_window">
                    <Link to={{
                        pathname: "/bookDetails",
                        state: {bid: this.state.books[i].bid}
                    }
                    }>
                        <img src={img} alt="book"/>
                    </Link>
                    <figcaption>{this.state.books[i].name}</figcaption>
                    <figcaption>{"作者:" + this.state.books[i].author}</figcaption>
                    <figcaption>{"￥ " + this.state.books[i].price}</figcaption>
                    <Link className="buy" to={{
                        pathname: "/bookDetails",
                        state: {bid: this.state.books[i].bid}
                    }}>购买</Link>
                </figure>
            );
        }
        return result;
    };


    render() {
        const requireContext = require.context("../assets/NewBooks", false, /\.jpg$/);
        // requireContext.keys
        return (
            <div>
                <div className="new">
                    <h3>新书推荐</h3>
                    {this.createBooks()}
                </div>
                <div className="bestseller">
                    <h3>畅销书籍</h3>
                    {this.createBooks()}
                </div>
            </div>
        )
    }

}