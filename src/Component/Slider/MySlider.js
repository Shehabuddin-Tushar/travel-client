import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from '../../assests/Images/sliderimage8.jpg'
import image2 from '../../assests/Images/sliderimage7.jpg'
import image3 from '../../assests/Images/sliderimage5.jpg'
import image4 from '../../assests/Images/sliderimage9.jpg'
import image5 from '../../assests/Images/sliderimage3.jpg'
import image6 from '../../assests/Images/sliderimage6.jpg'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block",marginRight:"50px"}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", marginLeft: "50px", zIndex:"1"}}
            onClick={onClick}
        />
    );
}

function MySlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      
    };
    return (
        <Slider {...settings} style={{marginTop:"55px"}}>
        <div>
            <img src="https://i.postimg.cc/cHqT0LWP/sliderimage8.jpg" alt="slider1" style={{ width: "100%", height: "60vh" }} />
        </div>
        <div>
            <img src="https://i.postimg.cc/0jnCYGSq/sliderimage7.jpg" alt="slider2" style={{ width: "100%", height: "60vh" }} />
        </div>
        <div>
            <img src="https://i.postimg.cc/3rF9Qhcb/sliderimage5.jpg" alt="slider3" style={{ width: "100%", height: "60vh" }} />
        </div>
        <div>
            <img src="https://i.postimg.cc/bvSL727Q/sliderimage9.jpg" alt="slider4" style={{width:"100%", height:"60vh"}}/>
        </div>
        <div>
            <img src="https://i.postimg.cc/QChbKYHb/sliderimage3.jpg" alt="slider5" style={{ width: "100%", height: "60vh" }} />
        </div>
        <div>
            <img src="https://i.postimg.cc/MTy5TJKH/sliderimage6.jpg" alt="slider6" style={{ width: "100%", height: "60vh" }}/>
        </div>
        
        </Slider>
    );
}

export default MySlider;
