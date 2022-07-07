import React from 'react';
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import '../css/home_page.css'
import '../css/bootstrap.min.css'
import '../css/home.css'
import {withRouter} from "react-router-dom";
import {BookCarousel} from "../components/BookCarousel";
import {BookList} from "../components/BookList";
import {Bottom} from "../components/Bottom";

const {Header, Content, Footer} = Layout;

class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "",
        }
    }

    callback = (key) => {
        this.setState(
            {
                key: key,
            }
        )
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user: user});
    }

    render() {
        console.log("HomeView: ", this.state.key);
        return (
            <Layout className="layout">
                <HeaderInfo callback={this.callback}/>
                <div className="info">
                    {/*<SearchBar />*/}
                    <BookCarousel/>
                    <BookList filter={this.state.key}/>
                </div>
                <Bottom/>
            </Layout>
        );
    }
}

export default withRouter(HomeView);