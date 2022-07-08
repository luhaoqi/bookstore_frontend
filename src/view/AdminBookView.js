import React from 'react';
import '../css/Admin.css';
import {withRouter} from "react-router-dom";
import {addBook, deleteBook, editBook, getBooks} from "../services/bookService"
import {AdminHeader} from "../components/AdminHeader";
import {Button} from "antd";

const headers = ["Bid", "Book", "Author", "Image", "Isbn", "Sales", "Stock", "URL"];
let flag = [];

//不要再搜索状态下修改
class AdminBookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
            bookname: "",
            author: "",
            price: "",
            image_: "",
            description: "",
            isbn: "",
            stock: "",
        };
        getBooks()
            .then(res => {
                console.log("获取书籍~", res);
                let data = [];
                for (let i = 0; i < res.length; i++) {
                    data.push([res[i].bid, res[i].name, res[i].author, res[i].image, res[i].isbn, res[i].sales, res[i].stock, res[i].image]);
                    flag[i] = res[i].flag;
                }

                this.setState({data: data});
            })
            .catch(err => {
                console.log('获取书籍失败 ', err);
            });
    }

    handleDelete(rid) {
        console.log(rid, this.state.data[rid]);
        deleteBook(this.state.data[rid][0])
            .then(res => {
                console.log('删除书籍成功 ');
                alert("删除书籍成功");
                let d = this.state.data;
                d.splice(rid, 1);
                this.setState({data: d})
            })
            .catch(err => {
                console.log('删除书籍失败 ', err);
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
        console.log(tmp);
        editBook(tmp[0], tmp[1], tmp[2], tmp[4], tmp[5], tmp[6], tmp[7]);
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

    HandleAddBook = () => {
        addBook(this.state.bookname, this.state.author, this.state.price, this.state.image_, this.state.description, this.state.isbn, this.state.stock)
            .then(res => {
                console.log('增加书籍成功 ', res);
                alert("增加书籍成功");
                let d = this.state.data;
                d.push([res, this.state.bookname, this.state.author, this.state.image_, this.state.isbn, this.state.stock]);//image是image_
                console.log(d);
                this.setState({
                    data: d,
                    bookname: "",
                    author: "",
                    image_: "",
                    isbn: "",
                    stock: "",
                    description: "",
                    price: ""
                })
            })
            .catch(err => {
                console.log('增加书籍失败 ', err);
            })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        //或者根据target.type 判断; 比如type:checkbox 值在checked 而不是value
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

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

    generateInput = (s) => {
        return (
            <div>
                <label htmlFor={`${s}`}>{`${s}`}：</label>
                <input id={`${s}`} type={`${s}`}
                       name={`${s}`}
                       value={this.state[`${s}`]}
                       onChange={this.handleInputChange}
                       required autoFocus/>
            </div>
        )
    }

    renderToolbar = () => {
        return (
            <div>
                <div className="toolbar">
                    <button onClick={this.toggleSearch}>Search</button>
                    <button onClick={this.HandleAddBook}>Add</button>
                </div>
                <div>
                    <label htmlFor="username">bookname：</label>
                    <input id="bookname" type="bookname"
                           name="bookname"
                           value={this.state.bookname}
                           onChange={this.handleInputChange}
                           required autoFocus/>
                </div>
                {this.generateInput("author")}
                {this.generateInput("price")}
                {this.generateInput("image_")}
                {this.generateInput("description")}
                {this.generateInput("isbn")}
                {this.generateInput("stock")}

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
                    return flag[rowidx] === 0 ? null : (
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
                                if (headers[idx] === "Image") {
                                    // let img = require(`../assets/NewBooks/newbook_${parseInt(cell)}.jpg`);
                                    let img = cell;
                                    return (
                                        <td>
                                            <figure className="book_window">
                                                <img src={img} alt="book"/>
                                            </figure>
                                        </td>
                                    );
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                            {
                                <td>
                                    <Button onClick={() => this.handleDelete(rowidx)}>
                                        删除
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

export default withRouter(AdminBookView);
