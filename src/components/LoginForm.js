import React from 'react';
import {Form} from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/my-login.css';
import '../css/http_stackpath.bootstrapcdn.com_bootstrap_4.3.1_css_bootstrap.css'
import {authUser} from '../services/userService'
import localStorage from "localStorage";
import {history} from '../utils/history';


export class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isAuth: 0,
        }
        this.handleChange_username = this.handleChange_username.bind(this);
        this.handleChange_password = this.handleChange_password.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange_username(event) {
        this.setState({username: event.target.value});
    }

    handleChange_password(event) {
        this.setState({password: event.target.value});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        //或者根据target.type 判断; 比如type:checkbox 值在checked 而不是value
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = e => {
        const {username, password} = this.state;
        console.log("username:" + username);
        console.log("password:" + password);
        e.preventDefault();
        authUser(username, password)
            .then(res => {
                if (res.uid === 0) {
                    console.log("FAILED 登录验证失败 ", res);
                    alert("用户名或密码错误！");
                    return;
                }
                if (res.state === 0) {
                    console.log("FAILED 用户被封禁 ", res);
                    alert("账号已被封禁，请联系管理员解封");
                    return;
                }
                console.log("SUCCESS 登录验证成功 ", res);
                // 存 uid
                localStorage.setItem("uid", res.uid);
                // 取 uid
                localStorage.getItem("uid", (data) => {
                    console.log("uid: " + data);
                })
                localStorage.setItem("user_state", res.state);
                this.setState({isAuth: res.state});
                if (res.state === 1)
                    history.replace("/");
                else if (res.state === 2)
                    history.replace("/admin");
            })
            .catch(err => {
                console.log('ERROR 登录时连接失败 ', err);
            });
    };

    validate(username, password) {
        // true means invalid, so our conditions got reversed
        return {
            username: username.length === 0,
            password: password.length === 0,
        };
    }

    render() {
        const errors = this.validate(this.state.username, this.state.password);
        const isEnabled = !Object.keys(errors).some((x) => errors[x]);

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                                            <h4 className="card-title">Login</h4>
                                            <form method="POST" className="my-login-validation" noValidate="">
                                                <div className="form-group">
                                                    {/*把下面的email全部换成了username*/}
                                                    <label htmlFor="username">Username</label>
                                                    <input id="username" type="username"
                                                           className={errors.username ? "form-control error" : "form-control"}
                                                           name="username"
                                                           placeholder="Enter username"
                                                           value={this.state.username}
                                                           onChange={this.handleInputChange}
                                                           required autoFocus/>
                                                    <div className="invalid-feedback">
                                                        Email is invalid
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="password">Password
                                                        <Link to="/#" className="float-right">
                                                            Forgot Password?
                                                        </Link>
                                                    </label>
                                                    <input id="password" type="password"
                                                           className={errors.password ? "form-control error" : "form-control"}
                                                           name="password"
                                                           placeholder="Enter password"
                                                           value={this.state.password}
                                                           onChange={this.handleInputChange}
                                                           required data-eye=""/>
                                                    <div className="invalid-feedback">
                                                        Password is required
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="custom-checkbox custom-control">
                                                        <input type="checkbox" name="remember" id="remember"
                                                               className="custom-control-input"/>
                                                        <label htmlFor="remember" className="custom-control-label">
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className={"form-group m-0"}>
                                                    <button type="submit" className="btn btn-primary btn-block"
                                                            onClick={this.handleSubmit} disabled={!isEnabled}>
                                                        Login
                                                    </button>
                                                </div>
                                                <div className={"mt-4 text-center"}>
                                                    Don't have an account?
                                                    <Link to="/register"> Create One</Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className={"footer"}>
                                        Copyright &copy; 2017 &mdash; Your Company
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<script src="../js/http_cdnjs.cloudflare.com_ajax_libs_popper.js_1.14.7_umd_popper.js"/>*/}
                    {/*<script src="../js/http_code.jquery.com_jquery-3.3.1.slim.js"/>*/}
                    {/*<script src="../js/http_stackpath.bootstrapcdn.com_bootstrap_4.3.1_js_bootstrap.js"/>*/}
                    {/*<script src="../js/my-login.js"/>*/}
                </div>
            </Form>
        )

    }
}

// const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);
//
// export default WrappedLoginForm
