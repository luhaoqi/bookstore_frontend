import React from 'react';
import ReactDOM from 'react-dom';
import '../css/Admin.css';
import {Link, withRouter} from "react-router-dom";
import {AdminHeader} from "../components/AdminHeader";
import {Button} from "antd";
import localStorage from "localStorage";
import {getAllOrderItem} from "../services/orderService";

const headers = ["OrderListId", "TotPrice(分)", "Time", "Book", "BookPrice(分)", "Uid", "Username"];

//不要再搜索状态下修改
class AdminOrderListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
        };
        getAllOrderItem()
            .then(res => {
                console.log("获取订单：", res);
                let data = [];
                for (let i = 0; i < res.length; i++)
                    data.push([res[i].orderListId, res[i].price, res[i].time, res[i].bookname,
                        res[i].bookprice, res[i].uid, res[i].username]);
                this.setState({data: data});
            })
            .catch(err => {
                console.log('获取订单失败 ', err);
            });
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

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };

    save = (e) => {
        // e.preventDefault();
        // let input = e.target.firstChild;
        // let data = this.state.data.slice();
        // data[this.state.edit.row][this.state.edit.cell] = input.value;
        // let tmp = data[this.state.edit.row];
        // editBook(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4]);
        // this.setState({
        //     edit: null,
        //     data: data,
        // });
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
                <AdminHeader/>
                {this.renderToolbar()}
                {this.renderTable()}
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
                                let edit = this.state.edit;
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = (
                                        <form onSubmit={this.save}>
                                            <input type="text" defaultValue={cell}/>
                                        </form>
                                    );
                                }
                                if (headers[idx] === "TotPrice" || headers[idx] === "BookPrice") {
                                    // content = parseFloat(content) / 100.0;
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
}

export default withRouter(AdminOrderListView);
