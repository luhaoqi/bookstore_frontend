import React from 'react';
import '../css/home_page.css'
import {Link} from 'react-router-dom';

export class Bottom extends React.Component {

    render() {

        return (
            <div className={"Bottom"}>
                <div className="info-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 flex-column column">
                                <h5 className={"bottom-h"}>About company</h5>
                                <a href="#">About us</a>
                                <a href="#">History</a>
                                <a href="#">Delivery</a>
                                <a href="#">Store map</a>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 column">
                                <h5 className={"bottom-h"}>Contacts</h5>
                                <h6 className={"bottom-h"}>Head office:</h6>
                                <p>SJTU, 800 Dongchuan Road, ShangHai, CN</p>
                                <p>Phone: 137******** </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}