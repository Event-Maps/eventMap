import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from './../../images/destinations/pic2.jpg';
import img2 from './../../images/destinations/pic3.jpg';
import img3 from './../../images/destinations/pic4.jpg';
import img4 from './../../images/destinations/pic5.jpg';

const cityBlog = [
	{
		image: img1,
		title: 'San Francisco',
	},
	{
		image: img2,
		title: 'New York City',
	},
	{
		image: img3,
		title: 'Seattle',
	},
	{
		image: img4,
		title: 'Portland',
	},
];

class PopCity extends Component {
	render() {
		return (
			<div className="row">
				{cityBlog.map((item, index) => (
					<div className="col-lg-3 col-md-6 col-sm-6" key={index}>
						<div className="featured-bx m-b30">
							<div className="featured-media">
								<img src={item.image} alt="" />
							</div>
							<div className="featured-info">
								<ul className="featured-star">
									
								</ul>
								<h5 className="title" style={{color: 'white'}}>{item.title}</h5>
								<ul className="featured-category">
									
								</ul>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default PopCity;
