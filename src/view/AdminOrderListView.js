import React from 'react';
import '../css/Admin.css';
import {Link, withRouter} from "react-router-dom";
import {AdminHeader} from "../components/AdminHeader";
import {getAllOrderList} from "../services/orderService";
import {Button, DatePicker} from 'antd';
import {history} from "../utils/history";

const {RangePicker} = DatePicker;

const headers = ["OrderListId", "TotPrice", "Time", "Uid", "Username"];

//不要再搜索状态下修改
class AdminOrderListView extends React.Component {

    allBooks = [];

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
            startTime: null,
            endTime: null,
            bookinput: "",
        };
        getAllOrderList()
            .then(res => {
                console.log("获取订单：", res);
                let data = [];
                for (let i = 0; i < res.length; i++) {
                    const t = res[i].orderList;
                    data.push([t.orderListId, t.price, t.time, res[i].uid, res[i].username]);
                    this.allBooks.push(res[i].bookName);
                    // data.push([res[i].orderListId, res[i].price, res[i].time, res[i].bookname,
                    //     res[i].bookprice, res[i].uid, res[i].username]);
                }

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
                <br/>
                <div>
                    <label> 根据时间筛选订单： </label>
                    <RangePicker showTime
                                 onChange={(v) => {
                                     this.setState(
                                         {
                                             startTime: v[0].toDate(),
                                             endTime: v[1].toDate(),
                                         }
                                     )
                                 }}/>
                </div>
                <br/>
                <div>
                    <input value={this.state.bookinput}
                           onChange={(e) => {
                               this.setState(
                                   {bookinput: e.target.value}
                               )
                           }}/>
                    <Button type="primary"
                            onClick={() => {
                                history.push(`/admin_order/${this.state.bookinput}`);
                                // this.setState(
                                //     {booksearch: this.state.bookinput}
                                // )
                            }}>
                        书名搜索
                    </Button>
                </div>
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

    rendereachrow = (row, rowidx) => {
        let res = [];
        for (let idx = 0; idx < row.length; idx++) {
            const cell = row[idx];

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
                content = parseFloat(content) / 100.0;
            }
            if (headers[idx] === "OrderListId")
                res.push(
                    <Link to={{
                        pathname: "/orderDetail",
                        state: {oid: content}
                    }
                    }>
                        <td key={idx} data-row={rowidx} text-align="center">
                            {content}
                        </td>
                    </Link>
                );
            else res.push(<td key={idx} data-row={rowidx} text-align="center">{content} </td>);
        }
        return res;
    }

    renderTablecontent = (data) => {
        let res = [];
        for (let rowidx = 0; rowidx < data.length; rowidx++) {
            const row = data[rowidx];
            const {startTime, endTime} = this.state;
            let t = new Date(row[2]);
            if (startTime && endTime) {
                if (!(startTime <= t && endTime >= t)) continue;
            }

            let flag = false;
            for (let j = 0; j < this.allBooks[rowidx].length; j++)
                if (this.allBooks[rowidx][j].toString().toLowerCase().indexOf(this.props.match.params.key ?? "") > -1) {
                    flag = true;
                    break;
                }
            if (!flag) continue;

            res.push(
                <tr key={rowidx}>
                    {this.rendereachrow(row, rowidx)}
                </tr>);
        }
        return res;
    }

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
                {this.renderTablecontent(this.state.data)}

                </tbody>
            </table>
        );
    }
}

export default withRouter(AdminOrderListView);
