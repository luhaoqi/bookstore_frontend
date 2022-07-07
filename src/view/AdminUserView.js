import React from 'react';
import '../css/Admin.css';
import {withRouter} from "react-router-dom";
import {editBook} from "../services/bookService"
import {AdminHeader} from "../components/AdminHeader";
import {Button} from "antd";
import {getAllUser, updateUserState} from "../services/userService";

const headers = ["Uid", "username", "State", "Email", "tel", "Address"];

//不要再搜索状态下修改
class AdminUserView extends React.Component {
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
        getAllUser()
            .then(res => {
                console.log("获取用户：", res);
                let data = [];
                for (let i = 0; i < res.length; i++)
                    data.push([res[i].uid, res[i].name, res[i].state, res[i].email, res[i].tel, res[i].address]);
                this.setState({data: data});
            })
            .catch(err => {
                console.log('获取用户失败 ', err);
            });
    }

    handleSetState(rid, s) {
        console.log(rid, this.state.data[rid]);
        updateUserState(this.state.data[rid][0], s)
            .then(res => {
                console.log('updateUserState成功！ s=', s);
                if (s === 0) alert("封禁成功");
                else if (s === 1) alert("解封成功");
                let d = this.state.data;
                d[rid][2] = s;
                this.setState({data: d})
            })
            .catch(err => {
                console.log('updateUserState 失败 ', err);
            })
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
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        let tmp = data[this.state.edit.row];
        editBook(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4]);
        this.setState({
            edit: null,
            data: data,
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
                    // console.log(row);
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
                                if (headers[idx] === "State") {
                                    if (cell === 0) content = "封禁用户";
                                    if (cell === 1) content = "普通用户";
                                    if (cell === 2) content = "管理员";
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                            {
                                <td>
                                    <Button onClick={() => this.handleSetState(rowidx, 0)} disabled={row[2] === 2}>
                                        封禁
                                    </Button>
                                    <Button onClick={() => this.handleSetState(rowidx, 1)} disabled={row[2] === 2}>
                                        解封
                                    </Button>
                                </td>
                            }
                        </tr>
                    );
                }, this)}
                </tbody>
            </table>
        );
    }
}

export default withRouter(AdminUserView);
