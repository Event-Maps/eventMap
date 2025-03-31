import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import img1 from './../../images/listing/pic1.jpg';
import img2 from './../../images/listing/pic2.jpg';
import img3 from './../../images/listing/pic3.jpg';
import img4 from './../../images/listing/pic4.jpg';
import img5 from './../../images/listing/pic5.jpg';
import img6 from './../../images/listing/pic6.jpg';

const aboutBlog = [
	{
		image: img1,
	},
	{
		image: img2,
	},
	{
		image: img3,
	},
	{
		image: img4,
	},
	{
		image: img5,
	},
	{
		image: img6,
	},
];

function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<div className="owl-nav">
			<div className="owl-next la la-angle-right" onClick={onClick} />
		</div>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<div className="owl-nav">
			<div className="owl-prev la la-angle-left" onClick={onClick} />
		</div>
	);
}

class Topplace extends Component {
	render() {
		var settings = {
			dots: false,
			slidesToShow: 5,
			infinite: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};

		return (
			<></>
		);
	}
}

export default Topplace;
