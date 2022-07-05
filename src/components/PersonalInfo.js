import React from 'react';
import '../css/private_office(style).css'
import {Link} from 'react-router-dom';

export class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state =  JSON.parse(window.localStorage.getItem('state')) ||{
            name: "luhaoqi",
            tel: "13736111836",
            email: "1171821456@qq.com",
            address: "SJTU",
            birth: "2001-10-10"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }
    handleChange2(event) {
        this.setState({tel: event.target.value});
    }
    handleChange3(event) {
        this.setState({email: event.target.value});
    }
    handleChange4(event) {
        this.setState({address: event.target.value});
    }
    handleChange5(event) {
        this.setState({birth: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        window.localStorage.setItem('state', JSON.stringify(this.state));
    }

    render() {

        return (
            <div className={"PersonalInfo"}>
                <h3>个人专区</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 col-7 menu">
                            <ul>
                                <li className="item">
                                    <Link to="/personalPage" className="your_data">
                                        个人资料
                                    </Link>
                                </li>
                                <li className="item">
                                    <Link to="orderHistory" className="history">
                                        订单历史
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-5 col-7 data">
                            <form onSubmit={this.handleSubmit}>
                                <div className="title"><p>姓名:</p></div>
                                <div className="input">
                                    <input className="form-control" type="text"
                                           value={this.state.name}  onChange={this.handleChange}/>
                                </div>
                                <div className="title"><p>电话:</p></div>
                                <div className="input">
                                    <input className="form-control" type="tel"
                                           value={this.state.tel}  onChange={this.handleChange2}/>
                                </div>
                                <div className="title"><p>邮箱:</p></div>
                                <div className="input">
                                    <input className="form-control" type="email"
                                           value={this.state.email}  onChange={this.handleChange3}/>
                                </div>
                                <div className="title"><p>地址:</p></div>
                                <div className="input">
                                    <input className="form-control" type="text"
                                           value={this.state.address}  onChange={this.handleChange4}/>
                                </div>
                                <div className="title"><p>出生日期:</p></div>
                                <div className="input">
                                    <input className="form-control" type="text"
                                           value={this.state.birth}  onChange={this.handleChange5}/>
                                </div>
                                <button className="btn save" type={"submit"} onClick={() => this.handleClick}>
                                    保存
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}