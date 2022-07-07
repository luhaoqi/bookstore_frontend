import React from 'react';
import ReactDOM from 'react-dom';
import '../css/Admin.css';
import {Link, withRouter} from "react-router-dom";
import {AdminHeader} from "../components/AdminHeader";
import {Button} from "antd";
import localStorage from "localStorage";
import {getAllOrderItem, getOrderItemByUid} from "../services/orderService";
import {HeaderInfo} from "../components/HeaderInfo";
import {getAllOrder} from "../services/userService";

const headers = ["OrderListId", "TotPrice", "Time", "Book", "BookPrice", "Num"];

//不要再搜索状态下修改
class UserOrderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constData: [],
            data: [],
            sortby: null,
            descending: false,
            search: false,
            preSearchData: null,
        };
    }

    getOrderInfo() {
        getOrderItemByUid(localStorage["uid"])
            .then(res => {
                console.log("获取订单：", res);
                let data = [];
                for (let i = 0; i < res.length; i++)
                    data.push([res[i].orderListId, res[i].price, res[i].time, res[i].bookname, res[i].bookprice, res[i].num]);
                this.setState({data: data, constData: data});
            })
            .catch(err => {
                console.log('获取订单失败 ', err);
            });
    }

    componentDidMount() {
        if (!localStorage["uid"]) return;
        this.getOrderInfo();
    }


    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };


    toggleSearch = () => {
        if (this.state.search) {
            this.setState({
                data: this.preSearchData,
                search: false,
            });
            this.preSearchData = null;
        } else {
            this.preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    };

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this.preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };


    render = () => {
        return (
            <div>
                <HeaderInfo/>
                {this.renderToolbar()}
                {this.renderTable()}
                {this.renderstatistic()}
            </div>
        );
    };


    renderToolbar = () => {
        return (
            <div>
                <div className="toolbar">
                    <button onClick={this.toggleSearch}>Search</button>
                </div>

            </div>
        );
    };

    renderSearch = () => {
        if (!this.state.search) {
            return null;
        }
        return (
            <tr onChange={this.search}>
                {headers.map(function (ignore, idx) {
                    return <td key={idx}><input type="text" data-idx={idx}/></td>;
                })}
            </tr>
        );
    };

    renderTable = () => {
        return (
            <table>
                <thead onClick={this.sort}>
                <tr>{
                    headers.map(function (title, idx) {
                        if (this.state.sortby === idx) {
                            title += this.state.descending ? ' \u2193' : ' \u2191';
                        }
                        return <th key={idx}>{title}</th>;
                    }, this)
                }</tr>
                </thead>
                <tbody onDoubleClick={this.showEditor}>
                {this.renderSearch()}
                {this.state.data.map(function (row, rowidx) {
                    return (
                        <tr key={rowidx}>{
                            row.map(function (cell, idx) {
                                let content = cell;
                                if (headers[idx] === "TotPrice" || headers[idx] === "BookPrice") {
                                    content = parseFloat(content) / 100.0;
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                        </tr>
                    );
                }, this)}
                </tbody>
            </table>
        );
    }
    renderstatistic = () => {
        let a = [];
        const constData = this.state.constData;
        console.log("constData:", constData);
        if (constData.length === 0) return;
        for (let i = 0; i < constData.length; i++) {
            let flag = false;
            for (let j = 0; j < a.length; j++) {
                if (a[j][0] === constData[i][3]) {
                    a[j][1] += constData[i][5];
                    a[j][2] += constData[i][5] * constData[i][4];
                    flag = true;
                    break;
                }
            }
            // console.log("!!", flag, constData[i]);
            if (!flag) {
                a.push([constData[i][3], constData[i][5], constData[i][4] * constData[i][5]]);
            }
            // a.push({
            //     bookname: constData[i][3],
            //     num: constData[i][5],
            //     price: constData[i][4] * constData[i][5]
            // });
        }
        // console.log("A:", a);
        return (
            <div>
                {a.map(function (row, rowidx) {
                    return (
                        <tr key={rowidx}>{
                            row.map(function (cell, idx) {
                                let content = cell;
                                if (idx === 2) {
                                    content = parseFloat(content) / 100.0;
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                        </tr>
                    );
                }, this)}

            </div>
        );
    };
}

export default withRouter(UserOrderView);
