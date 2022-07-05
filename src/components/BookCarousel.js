import React from 'react';
import {Carousel} from 'antd';
import '../css/home.css'

export class BookCarousel extends React.Component {

    createContent = (ctx) => {
        const images = ctx.keys().map(ctx);
        console.log(images);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            console.log(img);
            result.push(<div><img alt={i} src={img}/></div>);
        }
        return result;
    };


    render() {
        const requireContext = require.context("../assets/carousel", true, /^\.\/.*\.jpg$/);
        const carouselProp = {
            showStatus: false,
            useKeyboardArrows: true,
            infiniteLoop: true,
            autoPlay: true,
            stopOnHover: true,
            emulateTouch: true,
            transitionTime: 400,
            showArrows: true,
            autoplaySpeed: 8000,
            renderArrowPrev: (clickHandler, hasPrev, label) => {
                return (
                    <span className="arrow-left" onClick={clickHandler}>
                        <span className="icon-keyboard_arrow_left"/>
                    </span>
                )
            },
            renderArrowNext: (clickHandler, hasNext, label) => {
                return (
                    <span className="arrow-right" onClick={clickHandler}>
                        <span className="icon-keyboard_arrow_right"/>
                    </span>
                )
            },
        }


        return (
            <Carousel {...carouselProp} >
                {this.createContent(requireContext)}
            </Carousel>
        )
    }
}


