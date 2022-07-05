import React from 'react';
import {Carousel} from 'antd';
import {Link} from 'react-router-dom';
import '../css/home_page.css'

export class BookCarousel extends React.Component {

    createContent = (ctx) => {
        const images = ctx.keys().map(ctx);
        console.log(images);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
            result.push(
                <div className="carousel-item active">
                    <Link to="http://book.dangdang.com/">
                        <img className="d-block w-100" src={img} alt={"slide_" + String(i + 1)}/>
                    </Link>
                </div>);
        }
        return result;
    };
    createList = (ctx) => {
        const images = ctx.keys().map(ctx);
        console.log(images);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
            result.push(<li data-target="#carouselExampleIndicators" data-slide-to={String(i)} className="active"/>);
        }
        return result;
    };

    render() {
        const requireContext = require.context("../assets/carousel", false, /\.jpg$/);

        return (
            // <Carousel autoplay>
            //     {this.createContent(requireContext)}
            // </Carousel>
            <div className={"info"}>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {this.createList(requireContext)}
                    </ol>
                    <div className="carousel-inner">
                        {this.createContent(requireContext)}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}


