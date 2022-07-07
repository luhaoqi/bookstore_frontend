import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {withRouter} from "react-router-dom";
import '../css/cart(style).css'
import '../css/bootstrap.min.css'

import {getBook} from "../services/bookService";
import {BookDetail} from "../components/BookDetail";
import {BookComments} from "../components/BookComments";
import {Bottom} from "../components/Bottom";
import {CartDetail} from "../components/CartDetail";
import {UserInfoRegistrate} from "../components/UserInfoRegistrate";
import {OrderDetail} from "../components/OrderDetail";


const { Header, Content, Footer } = Layout;

class OrderDetailView extends React.Component{

    render(){
        return(
            <Layout className="cart">
                <HeaderInfo/>

                <OrderDetail oid={this.props.location.state.oid}/>

                <Bottom/>
            </Layout>
        );
    }
}

export default withRouter(OrderDetailView);