import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import GoogleMaps from "simple-react-google-maps";

// Import images using ES6 import
import bnr from './../../images/banner/bnr2.jpg';
import pic14 from './../../images/listing/pic14.jpg';
import pic15 from './../../images/listing/pic15.jpg';
import pic13 from './../../images/listing/pic13.jpg';
import pic16 from './../../images/listing/pic16.jpg';
import pic17 from './../../images/listing/pic17.jpg';

const gridBlog = [
	{ image: pic14 },
	{ image: pic15 },
	{ image: pic13 },
	{ image: pic16 },
	{ image: pic17 },
];

class Gridmaprightsidebar extends Component {
	render() {
		return (
			<div className="page-wraper font-roboto">
				<Header />
				<div className="page-content bg-white">
					<div
						className="dlab-bnr-inr dlab-bnr-inr-sm overlay-black-middle"
						style={{ backgroundImage: `url(${bnr})` }}
					>
						<div className="container">
							<div className="dlab-bnr-inr-entry">
								<h1 className="text-white">Grid Map Left Sidebar</h1>
								<p>Find awesome places, bars, restaurants & activities.</p>

								<div className="breadcrumb-row">
									<ul className="list-inline">
										<li><Link to={"./"}>Home</Link></li>
										<li>Grid Map Left Sidebar</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="content-block">
						<div className="section-full bg-white map-listing-bx">
							<div className="container-fluid">
								<div className="row">
									<div className="col-xl-6 col-lg-8 col-md-12 map-listing">
										<div className="listing-filter-sidebar">
											<h4 className="title m-b30">Filter By</h4>
											<form>
												<div className="row">
													<div className="col-lg-4 col-md-4">
														<div className="form-group">
															<div className="input-group">
																<input type="text" className="form-control" placeholder="What are your looking for?" />
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4">
														<div className="form-group">
															<div className="input-group">
																<input type="text" className="form-control" placeholder="Your location" />
															</div>
														</div>
													</div>
													<div className="col-lg-4 col-md-4">
														<div className="form-group">
															<select className="custom-select" id="inputGroupSelect01">
																<option>Category</option>
																<option>Construction</option>
																<option>Coordinator</option>
																<option>Employer</option>
																<option>Financial Career</option>
																<option>Information Technology</option>
																<option>Marketing</option>
																<option>Quality check</option>
																<option>Real Estate</option>
																<option>Sales</option>
																<option>Supporting</option>
																<option>Teaching</option>
															</select>
														</div>
													</div>
												</div>
											</form>
											<h4 className="text-center m-b30">“ <span className="text-primary">(Restaurant)</span> 14 results found ”</h4>
										</div>
										<div className="listing-filter m-b40">
											<div className="d-flex">
												<div className="mr-auto">
													<ul className="filter m-b0">
														<li>
															<select className="custom-select" id="inputGroupSelect01">
																<option>More Filters</option>
																<option>Construction</option>
																<option>Coordinator</option>
																<option>Employer</option>
																<option>Financial Career</option>
																<option>Information Technology</option>
																<option>Marketing</option>
																<option>Quality check</option>
																<option>Real Estate</option>
																<option>Sales</option>
																<option>Supporting</option>
																<option>Teaching</option>
															</select>
														</li>
													</ul>
												</div>
												<div>
													<ul className="filter-icon m-b0">
														<li className="mr-1"><Link to={"#"}><i className="fa fa-th"></i></Link></li>
														<li><Link to={"#"}><i className="fa fa-th-list"></i></Link></li>
													</ul>
												</div>
											</div>
										</div>
										<div className="row">
											{gridBlog.map((item, index) => (
												<div className="col-lg-12 col-md-12" key={index}>
													<div className="listing-bx listing-half m-b30">
														<div className="listing-media">
															<img src={item.image} alt="" />
															<ul className="wish-bx">
																<li><Link className="like-btn" to={""}><i className="fa fa-heart"></i></Link></li>
																<li><Link className="info-btn" to={""}><i className="fa fa-leaf"></i></Link></li>
															</ul>
														</div>
														<div className="listing-info">
															<ul className="featured-star">
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul>
															<h3 className="title"><Link to={"/listing-details"}>Rowdy King City</Link></h3>
															<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
															<ul className="place-info">
																<li className="place-location"><i className="fa fa-map-marker"></i>12/a, New</li>
																<li className="open"><i className="fa fa-check"></i>Open Now</li>
															</ul>
														</div>
													</div>
												</div>
											))}
										</div>

										<div className="pagination-bx clearfix text-center">
											<ul className="pagination">
												<li className="previous"><Link to={"#"}><i className="fa fa-arrow-left"></i></Link></li>
												<li><Link to={"#"}>1</Link></li>
												<li><Link to={"#"}>2</Link></li>
												<li><Link to={"#"}>...</Link></li>
												<li className="active"><Link to={"#"}>7</Link></li>
												<li className="next"><Link to={"#"}><i className="fa fa-arrow-right"></i></Link></li>
											</ul>
										</div>
									</div>
									<div className="col-xl-6 col-lg-4 col-md-12 p-a0">
										<div className="sticky-top">
											<GoogleMaps
												apiKey={"AIzaSyDrAU41UTBlcEDNJgEtdlFLZeUBNBuHhzM"}
												style={{ height: "100vh", width: "100%" }}
												zoom={6}
												center={{ lat: 37.4224764, lng: -122.0842499 }}
												markers={{ lat: 37.4224764, lng: -122.0842499 }} //optional
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<Footer />
			</div>
		);
	}
}

export default Gridmaprightsidebar;
