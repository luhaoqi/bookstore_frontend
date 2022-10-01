import React from 'react';
import '../css/Admin.css';
import {withRouter} from "react-router-dom";
import {AdminHeader} from "../components/AdminHeader";
import {getAllOrderList} from "../services/orderService";
import {DatePicker} from 'antd';
import localStorage from "localStorage";
import {HeaderInfo} from "../components/HeaderInfo";

const {RangePicker} = DatePicker;

const headers = ["BookName", "Sales", "TotPrice"];

let allBook = [], BookInfo = [];
let totSales, totPrice;

//不要再搜索状态下修改
class UserOrderView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            res: [],
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
            startTime: null,
            endTime: null,
            totPrice: 0,
            totSales: 0,
        };
        getAllOrderList()
            .then(res => {
                console.log("获取订单：", res);
                BookInfo = res;
                this.filterAllBook();
            })
            .catch(err => {
                console.log('获取订单失败 ', err);
            });
    }


    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.state.data.slice();
        // let data = allBook.slice();
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
            // this.preSearchData = allBook;
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
                <br/>
                <div>
                    <label> 根据时间筛选订单： </label>
                    <RangePicker showTime
                                 onChange={(v) => {
                                     this.setState(
                                         {
                                             startTime: v[0].toDate(),
                                             endTime: v[1].toDate(),
                                         }, () => {
                                             this.filterAllBook();
                                         }
                                     )
                                 }}/>
                </div>
                <div>
                    <text>{`购买总本数： ${this.state.totSales}`}</text>
                    <br/>
                    <text>{`购买总金额： ${this.state.totPrice / 100.0}`}</text>
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
            res.push(<td key={idx} data-row={rowidx} text-align="center">{content} </td>);
        }
        return res;
    }

    filterAllBook = () => {
        let uid = parseInt(localStorage["uid"]);
        allBook = [];
        const {startTime, endTime} = this.state;
        let res = BookInfo;

        console.log(startTime, endTime);
        for (let i = 0; i < res.length; i++) {
            let t = new Date(res[i].orderList.time);
            if (startTime && endTime) {
                if (!(startTime <= t && endTime >= t)) continue;
            }
            if (uid !== res[i].uid) continue;
            // console.log(typeof uid, typeof res[i].uid);
            const name = res[i].bookName, sale = res[i].bookSales, price = res[i].bookPrice;
            // console.log(t, name, sale, price);
            for (let j = 0; j < name.length; j++) {
                let flag = false;
                for (let k = 0; k < allBook.length; k++)
                    if (allBook[k][0] === name[j]) {
                        flag = true;
                        allBook[k][1] += sale[j];
                        allBook[k][2] += price[j] * sale[j];
                    }
                if (flag) continue;
                allBook.push([name[j], sale[j], sale[j] * price[j]]);
            }
        }
        console.log("allBook:", allBook);
        this.setState({data: allBook});
        totSales = totPrice = 0;
        for (let i = 0; i < allBook.length; i++) {
            totSales += allBook[i][1];
            totPrice += allBook[i][2];
        }
        console.log("totSales", totSales, "totPrice", totPrice);
        this.setState({totSales: totSales, totPrice: totPrice});
    }

    renderTablecontent = () => {
        const data = this.state.data;
        let res = [];
        for (let rowidx = 0; rowidx < data.length; rowidx++) {
            const row = data[rowidx];
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
                {this.renderTablecontent()}

                </tbody>
            </table>
        );
    }
}

export default withRouter(UserOrderView);
