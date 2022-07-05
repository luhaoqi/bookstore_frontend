import React from 'react';
import {Descriptions, Button, Avatar} from 'antd';


export class BookComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const img=require("../assets/users/user"+this.props.uid+".jpg");
        return (
            <div className="review_example">
                <div className="example">
                    <img align="center" src={img} alt={this.props.username}/>
                    <a href="#">{this.props.username}</a>
                    <p>{this.props.content}</p>
                    <p className="date">{this.props.date}</p>
                </div>
            </div>


        )

    }

}
