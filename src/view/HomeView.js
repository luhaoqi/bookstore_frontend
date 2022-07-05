import React from 'react';
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import {SideBar} from "../components/SideBar";
import '../css/home_page.css'
import '../css/bootstrap.min.css'
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {SearchBar} from "../components/SearchBar";
import {BookList} from "../components/BookList";
import {Bottom} from "../components/Bottom";
import {Link} from 'react-router-dom';

const {Header, Content, Footer} = Layout;

class HomeView extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user: user});
    }

    render() {
        return (
            <Layout className="layout">
                <HeaderInfo/>
                <div className="info">
                    {/*<SearchBar />*/}
                    <BookCarousel />
                    <BookList/>
                </div>
                <Bottom/>
            </Layout>
        );
    }
}

export default withRouter(HomeView);