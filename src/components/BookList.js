import React from 'react';
import {getBooks} from "../services/bookService";
import {Link} from 'react-router-dom';
import '../css/home_page.css'
import '../css/bootstrap.min.css'
import {Button, Card, Image} from 'antd';

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
        const gridStyle = {
            width: '22%',
            textAlign: 'center',
        };
        for (let i = 0; i < this.state.books.length; i++) {
            // let img = require(`../assets/NewBooks/newbook_${this.state.books[i].image}.jpg`);
            if (this.state.books[i].name.toString().toLowerCase().indexOf(this.props.filter) === -1) continue;
            result.push(
                // <figure className="book_window">
                <Card.Grid style={gridStyle} className="book_window">
                    <Link to={{
                        pathname: "/bookDetails",
                        state: {bid: this.state.books[i].bid}
                    }
                    }>
                        {/*<img src={img} alt="book"/>*/}
                        {/*<Image src={img} preview={false}/>*/}
                        {/*<Image src={this.state.books[i].image} preview={false}/>*/}
                        <Image src={this.state.books[i].bookIcon.iconBase64} preview={false}/>
                    </Link>
                    <figcaption>{"书名：" + this.state.books[i].name}</figcaption>
                    <figcaption>{"作者：" + this.state.books[i].author}</figcaption>
                    <figcaption>{"ISBN：" + this.state.books[i].isbn}</figcaption>
                    <figcaption>{"销量：" + this.state.books[i].sales}</figcaption>
                    <figcaption>{"库存：" + this.state.books[i].stock}</figcaption>
                    <figcaption>{"￥ " + this.state.books[i].price / 100.0}</figcaption>
                    {/*<button>*/}
                        <Link className="buy"
                              to={{
                                  pathname: "/bookDetails",
                                  state: {bid: this.state.books[i].bid}
                              }}>
                            购买
                        </Link>
                    {/*</button>*/}
                </Card.Grid>
                // </figure>
            );
        }
        return result;
    };


    render() {
        // const requireContext = require.context("../assets/NewBooks", false, /\.jpg$/);
        return (
            <div>
                <div className="new">
                    <h3>书籍列表</h3>
                    <Card>
                        {this.createBooks()}
                    </Card>
                </div>
                {/*<div className="bestseller">*/}
                {/*    <h3>畅销书籍</h3>*/}
                {/*    {this.createBooks()}*/}
                {/*</div>*/}
            </div>
        )
    }

}