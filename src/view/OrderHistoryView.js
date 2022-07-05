import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {withRouter} from "react-router-dom";
import '../css/private_office(style).css'
import '../css/bootstrap.min.css'

import {getBook} from "../services/bookService";
import {BookDetail} from "../components/BookDetail";
import {BookComments} from "../components/BookComments";
import {Bottom} from "../components/Bottom";
import {OrderHistoryInfo} from "../components/OrderHistoryInfo";

const { Header, Content, Footer } = Layout;

class PersonalPageView extends React.Component{


    render(){
        return(
            <Layout className="layout">
                <script type="text/javascript" src="../js/jquery-3.5.1.js"/>
                <script type="text/javascript" src="../js/bootstrap.bundle.min.js"/>
                <script type="text/javascript" src="../js/bootstrap.min.js"/>
                <HeaderInfo/>

                <OrderHistoryInfo/>

                <Bottom/>
            </Layout>
        );
    }
}

export default withRouter(PersonalPageView);