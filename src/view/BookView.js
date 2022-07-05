import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import {withRouter} from "react-router-dom";
import '../css/product_page(style).css'
import '../css/bootstrap.min.css'

import {getBook} from "../services/bookService";
import {BookDetail} from "../components/BookDetail";
import {BookComments} from "../components/BookComments";
import {BookCarousel} from "../components/BookCarousel";
import {BookList} from "../components/BookList";
import {Bottom} from "../components/Bottom";

const { Header, Content, Footer } = Layout;

class BookView extends React.Component{

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {books:null};
    //
    //
    //
    // }
    //
    // componentDidMount(){
    //     let user = localStorage.getItem("user");
    //     this.setState({user:user});
    //
    //     const query = this.props.location.search;
    //     const arr = query.split('&');
    //     const bookId = arr[0].substr(4);
    //     getBook(bookId, (data) => {this.setState({bookInfo: data})})
    // }

    render(){
        const username="陆浩旗";
        const content="每一代人有每一代人的磨难与压力。带着体会而不是庆幸的心态去读这个故事，如今的我们，又何尝不是同样处在某个洪流中吗？有时候只是我们忽略或刻意忽略了。体会故事中人物的心情，学习到其中的心态和经验，或许能把这些用在自己当下的面临的抉择中。";
        const date="2020-06-16 19:24:53";
        const imgurl="users/user1.jpg";
        return(
            <Layout className="layout">
                <HeaderInfo/>

                <BookDetail bid={this.props.location.state.bid}/>
                <BookComments username={username} content={content} date={date} uid={1}/>

                <Bottom/>
            </Layout>
        );
    }
}

export default withRouter(BookView);