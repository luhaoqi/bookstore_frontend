import React from 'react';
import '../css/Admin.css';
import {Button} from 'antd';
import {getBooksFilter} from "../services/bookService";
import {withRouter} from "react-router-dom";


const headers = ["id", "BookName", "Author", "description"];

//不要再搜索状态下修改
class AdminOrderListView extends React.Component {

    allBooks = [];

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: "",
            input: ""
        };
        this.getbooks(this.state.search);
    }

    getbooks(x) {
        getBooksFilter(x)
            .then(res => {
                console.log("获取书籍：", res, res.length === 10);
                let d = [];
                for (let i = 0; i < res.length; i++) {
                    const t = res[i];
                    d.push([t.id, t.name, t.author, t.description]);
                }

                this.setState({data: d});
            })
            .catch(err => {
                console.log('获取书籍失败 ', err);
            });
    }

    render = () => {
        return (
            <div>
                <br/>
                <div>
                    <input value={this.state.input}
                           onChange={(e) => {
                               this.setState(
                                   {input: e.target.value}
                               )
                           }}/>
                    <Button type="primary"
                            onClick={() => {
                                this.setState({search: this.state.input})
                                this.getbooks(this.state.input);
                            }}>
                        简介搜索
                    </Button>
                </div>
                {this.renderTable()}
            </div>
        );
    };

    rendereachrow = (row, rowidx) => {
        let res = [];
        for (let idx = 0; idx < row.length; idx++) {
            let content = row[idx];
            res.push(<td key={idx} data-row={rowidx} text-align="center">{content} </td>);
        }
        return res;
    }

    renderTablecontent = (data) => {
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
                <tr>{
                    headers.map(function (title, idx) {
                        return <th key={idx}>{title}</th>;
                    }, this)
                }</tr>
                {this.renderTablecontent(this.state.data)}
            </table>
        );
    }

}

export default withRouter(AdminOrderListView);
