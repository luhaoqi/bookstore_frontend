import React from 'react';
import {Carousel, List} from 'antd'
import {Book} from './Book'
import {getBooks} from "../services/bookService";
import {Link} from 'react-router-dom';
import '../css/fiction(style).css'
import '../css/bootstrap.min.css'

export class FictionBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                {id: 0, name: "三体", author: "刘慈欣", price: 93.00},
                {id: 1, name: "球状闪电（典藏版）", author: "刘慈欣", price: 25.00},
                {id: 2, name: "阿西莫夫科幻经典", author: "(美)艾萨克·阿西莫夫", price: 117.00},


            ]
        };
    }

    createBooks = (ctx) => {
        const images = ctx.keys().map(ctx);
        console.log(images);
        let result = [];
        for (let j = 0; j < 6; j++)
            for (let i = 0; i < ctx.keys().length; i++) {
                let img = images[i];
                console.log(img);
                result.push(
                    <div className="col-lg-2 col-md-2 col-sm-5 col-7 book">
                        <Link to="/bookDetail">
                            <img align="center" src={img} className="img-fluid"/>
                        </Link>
                        <div className="text">
                            <a href="#" className="info-book">{this.state.books[i].name}</a>
                            <a href="#" className="info-book">{"作者:" + this.state.books[i].author}</a>
                            <p>{"￥ " + this.state.books[i].price}</p>
                            <a className="buy" href="#">购买</a>
                        </div>
                    </div>
                );
            }
        return result;
    };


    render() {
        const requireContext = require.context("../assets/fiction", false, /\.jpg$/);

        return (
            <div>
                <h1>科幻</h1>
                <div class="filters">
                    <p>
                        <a class="btn" data-toggle="collapse" href="#collapseFilters" role="button"
                           aria-expanded="true" aria-controls="collapseExample">
                            拉起/放下
                        </a>
                    </p>
                    <div class="collapse show" id="collapseFilters">
                        <div class="card card-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12 flex-column column">
                                        <div class="availability">
                                            <h4>服务:</h4>
                                            <p><input type="checkbox" checked/>有货 </p>
                                            <p><input type="checkbox"/>预售 </p>
                                            <p><input type="checkbox"/>促销 </p>
                                            <p><input type="checkbox"/>新品 </p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12 column">
                                        <div class="price">
                                            <h4>价格:</h4>
                                            <p>从</p>
                                            <p><input type="text" class="form-control" id="formGroupExampleInput"
                                                      placeholder="70"/></p>
                                            <p>到</p>
                                            <p><input type="text" class="form-control" placeholder="1500"/></p>
                                            <p>￥</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12 column">
                                        <div class="for_whom">
                                            <h4>分类</h4>
                                            <p><input type="checkbox"/>纸质书 </p>
                                            <p><input type="checkbox"/>电子书 </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="main_part">
                    <div class="container-fluid">
                        <div class="row">
                            {this.createBooks(requireContext)}
                        </div>
                    </div>
                </div>

                <div class="page_number">
                    <ul class="pager">
                        <li class="first-item"><a href="#">«</a></li>
                        <li class="pager-item"><a href="#">1</a></li>
                        <li class="pager-item"><a href="#">2</a></li>
                        <li class="pager-item"><a href="#">3</a></li>
                        <li class="pager-item"><a href="#">4</a></li>
                        <li class="pager-item"><a href="#">...</a></li>
                        <li class="pager-item"><a href="#">10</a></li>
                        <li class="last-item"><a href="#">»</a></li>
                    </ul>
                </div>
            </div>
    )
    }

}