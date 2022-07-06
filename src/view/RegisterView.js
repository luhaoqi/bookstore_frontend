import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../css/my-login.css';
import '../css/http_stackpath.bootstrapcdn.com_bootstrap_4.3.1_css_bootstrap.css'
import {checkUserExist, registerUser} from "../services/userService";
import {history} from '../utils/history';

class RegisterView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            tel: "",
            UsernameDuplicate : true,
        }
    }

    validate(username, password, confirmPassword, email, tel) {
        // true means invalid, so our conditions got reversed
        return {
            username: username.length === 0,
            password: password.length < 6,
            confirmPassword: confirmPassword.length === 0,
            email: email.length === 0,
            tel: tel.length === 0,
            diff: password !== confirmPassword,
            EmailVaild: !(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(email)),
            UsernameDuplicate : this.state.UsernameDuplicate,
        };
    }

    updateUserName(username) {
        checkUserExist(username)
            .then(res => {
                console.log("验证用户名是否重复成功 res:", res);
                this.setState({UsernameDuplicate: res > 0})
            })
            .catch(err => {
                alert('ERROR 验证用户名是否重复连接失败 ');
                console.log(err);
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        const {username, password,  email, tel} = this.state;
        registerUser(username, password, email, tel)
            .then(res => {
                console.log(res);
                if (res === 0) {
                    alert("注册失败 用户名已存在 请更换重试");
                } else if (res > 0) {
                    alert('SUCCESS 注册成功 username: ' + username);
                    history.push("/login");
                }
            })
            .catch(err => {
                alert('ERROR 注册时连接失败 ');
                console.log(err);
            });
    };


    render() {
        const {username, password, confirmPassword, email, tel} = this.state;
        const errors = this.validate(username, password, confirmPassword, email, tel);
        const isEnabled = !Object.keys(errors).some((x) => errors[x]);
        return (
            <div className="my-login-page">
                <section className="h-100">
                    <div className="container h-100">
                        <div className="row justify-content-md-center h-100">
                            <div className="card-wrapper">
                                <div className="brand">
                                    <img src={require("../assets/login/logo.jpg")} alt="logo"/>
                                </div>
                                <div className="card fat">
                                    <div className="card-body">
                                        <h4 className="card-title">Register</h4>
                                        <form method="POST" className="my-login-validation" noValidate="">
                                            <div className="form-group">
                                                <label htmlFor="name">Username</label>
                                                <input id="name" type="text"
                                                       className={errors.username ? "form-control error" : "form-control"}
                                                       name="name"
                                                       placeholder="Enter username"
                                                       onChange={(e) => {
                                                           this.setState({username: e.target.value});
                                                           this.updateUserName(e.target.value);
                                                       }}
                                                       required autoFocus/>
                                                <div className="MyRedFont">
                                                    {username !== "" && errors.UsernameDuplicate ? "用户名重复,请更换" : ""}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input id="password" type="password"
                                                       className={errors.password ? "form-control error" : "form-control"}
                                                       name="password"
                                                       placeholder="Enter password"
                                                       onChange={(e) => {
                                                           this.setState({password: e.target.value})
                                                       }}
                                                       required data-eye=""/>
                                                <div className="MyRedFont">
                                                    {password !== "" && errors.password ? "密码至少为6位" : ""}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <input id="confirmPassword" type="password"
                                                       className={errors.confirmPassword ? "form-control error" : "form-control"}
                                                       name="password"
                                                       placeholder="Confirm password"
                                                       onChange={(e) => {
                                                           this.setState({confirmPassword: e.target.value})
                                                       }}
                                                       required data-eye=""/>
                                                <div className="MyRedFont">
                                                    {confirmPassword !== "" && errors.diff ? "密码不一致 请重新输入" : ""}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">E-Mail Address</label>
                                                <input id="email" type="email"
                                                       className={errors.email ? "form-control error" : "form-control"}
                                                       name="email"
                                                       placeholder="Enter Eamil"
                                                       onChange={(e) => {
                                                           this.setState({email: e.target.value})
                                                       }}
                                                       required/>
                                                <div className="MyRedFont">
                                                    {email !== "" && errors.EmailVaild ? "请输入正确的Email" : ""}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="name">tel</label>
                                                <input id="tel" type="text"
                                                       className={errors.tel ? "form-control error" : "form-control"}
                                                       name="name"
                                                       placeholder="Enter tel"
                                                       onChange={(e) => {
                                                           this.setState({tel: e.target.value})
                                                       }}
                                                       required autoFocus/>
                                                <div className="invalid-feedback">
                                                    What's your tel?
                                                </div>
                                            </div>


                                            {/*<div className="form-group">*/}
                                            {/*    <div className="custom-checkbox custom-control">*/}
                                            {/*        <input type="checkbox" name="agree" id="agree"*/}
                                            {/*               className="custom-control-input" required=""/>*/}
                                            {/*        <label htmlFor="agree" className="custom-control-label">I agree*/}
                                            {/*            to the <a href="#">Terms and Conditions</a></label>*/}
                                            {/*        <div className="invalid-feedback">*/}
                                            {/*            You must agree with our Terms and Conditions*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            <div className="form-group m-0">
                                                <button type="submit"
                                                        className="btn btn-primary btn-block"
                                                        onClick={this.handleSubmit}
                                                        disabled={!isEnabled}>
                                                    Register
                                                </button>
                                            </div>
                                            <div className="mt-4 text-center">
                                                Already have an account? <Link to="/login">Login</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="footer">
                                    Copyright &copy; 2017 &mdash; Your Company
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );

    }
}

export default withRouter(RegisterView);