import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Popcity from './../Element/popCity';
import Topplacesowl from './../Element/Topplacesowl';
import EventMap from './../Pages/EventMap';
import bnr from './../../images/main-slider/slide1.jpg';

const Homepage = () => {
	const [searchData, setSearchData] = useState({
		searchInput: '',
		category: '',
		date: '',
		city: '',
	});
	const [events, setEvents] = useState([]); // Move events state here
	const [loading, setLoading] = useState(false);
	const mapRef = useRef(null); // Create a reference for the map

	// Handle input changes for the search form
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSearchData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle change in category dropdown
	const handleCategoryChange = (event) => {
		const value = event.target.value;
		setSearchData((prev) => ({
			...prev,
			category: value === 'All Categories' ? '' : value,
		}));
	};

	// Handle the form submission for searching events
	const handleSearch = (event) => {
		event.preventDefault();
		setLoading(true);

		// Scroll to the map section
		if (mapRef.current) {
			mapRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	// Add a new event to the list
	const handleAddEvent = (newEvent) => {
		setEvents((prevEvents) => [...prevEvents, newEvent]);
	};

	// List of categories for dropdown
	const allCategories = [
		'All Categories',
		'Sports',
		'Music',
		'Community',
		'Concerts',
		'Birthday',
		'Wedding',
		'Corporate',
		'Festival',
		'Italian',
		'Chinese',
		'Fast Food',
		'Seafood',
	];

	return (
		<div className="page-wraper">
			<Header />
			<div className="page-content bg-white">
				<div
					className="dlab-bnr-inr dlab-bnr-inr-md"
					style={{ backgroundImage: `url(${bnr})`, backgroundSize: 'cover' }}
				>
					<div className="container">

						<div className="dlab-bnr-inr-entry align-m dlab-home">
							<div className="bnr-content">
								<h2>
									<strong>Find & Get</strong> Events.
								</h2>
							</div>

							<div className="dlab-tabs search-filter">
								<div className="tab-content">
									<div className="tab-pane active">
										{/* Search form to filter events */}
										<Form onSubmit={handleSearch} className="search-form">
											<div className="input-group">
												{/* Search input field */}
												<input
													type="text"
													className="form-control"
													placeholder="What are you looking for?"
													name="searchInput"
													value={searchData.searchInput}
													onChange={handleInputChange}
												/>

												{/* Dropdown to select event category */}
												<Form.Control
													as="select"
													name="category"
													value={searchData.category}
													onChange={handleCategoryChange}
													className="form-control"
												>
													{allCategories.map((cat, index) => (
														<option
															key={index}
															value={cat === 'All Categories' ? '' : cat}
														>
															{cat}
														</option>
													))}
												</Form.Control>

												{/* Date input field */}
												<input
													type="date"
													className="form-control"
													name="date"
													value={searchData.date}
													onChange={handleInputChange}
												/>

												{/* City input field */}
												<input
													type="text"
													className="form-control"
													placeholder="Enter city"
													name="city"
													value={searchData.city}
													onChange={handleInputChange}
												/>

												{/* Search button */}
												<div className="input-group-prepend">
													<button
														type="submit"
														className="site-button text-uppercase"
													>
														<i className="fa m-r5 fa-search"></i> Search
													</button>
												</div>
											</div>
										</Form>
									</div>
								</div>

								<p className="text-center text-white m-b10 m-t30">
									Find awesome places, bars, restaurants & activities.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Map section to display events */}
				<div ref={mapRef} className="event-map">
					<EventMap
						events={events}
						setEvents={setEvents}
						searchData={searchData}
						loading={loading}
						setLoading={setLoading}
					/>
				</div>

				<div className="content-block">
					<div className="section-full bg-white content-inner">
						<div className="container">
							<div className="section-head text-black text-center">
								<h2 className="box-title">Popular Cities</h2>
								<div className="dlab-separator bg-primary"></div>
								<p>
									Browse events in cities all over the world
								</p>
							</div>
							<Popcity />
						</div>
					</div>
					<Topplacesowl />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Homepage;
