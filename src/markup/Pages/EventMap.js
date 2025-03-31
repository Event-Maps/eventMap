import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventMap = ({ events, setEvents, searchData, setLoading }) => {
    const [viewport, setViewport] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 8,
        width: '100%',
        height: '600px',
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [lastLoadedViewport, setLastLoadedViewport] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const fetchTimeoutRef = useRef(null);

    // Categories array
    const categories = [
        'Music',
        'Sports',
        'Arts & Theatre',
        'Film',
        'Miscellaneous',
        'Party',
        'Bar Event',
        'Social Gathering',
        'Game Night',
        'Food & Drink',
        'Comedy',
        'Festival',
    ];

    // Main function to fetch events
    // Main function to fetch events
    const fetchEvents = async (
        latitude = viewport.latitude,
        longitude = viewport.longitude,
        isInitial = false
    ) => {
        const selectedDateStr = searchData.date || new Date().toISOString().split('T')[0];

        const params = {
            lat: Number(latitude.toFixed(4)),
            lng: Number(longitude.toFixed(4)),
            date: selectedDateStr,
            radius: 50, // Adjust the radius as needed
        };

        if (isInitial) setLoading(true);
        setIsFetching(true);
        console.log('Fetching events with params:', params);

        try {
            const response = await axios.get(
                'https://eventmaps-main-833157073960.us-central1.run.app/api/events',
                { params }
            );

            console.log('API Response:', response.data); // Log the full response to inspect it

            const selectedDate = new Date(selectedDateStr);

            const formattedEvents = response.data
                .map((event) => {
                    console.log('Event data:', event); // Log each event to see its structure

                    return {
                        title: event.name,
                        lat: event._embedded?.venues?.[0]?.location?.latitude,
                        lng: event._embedded?.venues?.[0]?.location?.longitude,
                        category: event.classifications?.[0]?.segment?.name || 'General',
                        date: event.dates.start.localDate,
                        time: convertTo12Hour(event.dates.start.localTime || ''),
                        venue: event._embedded?.venues?.[0]?.name || 'Unknown Venue',
                        description: event.description || 'No description available', // Check if description is in the correct place
                    };
                })
                .filter((event) => {
                    // Date filtering
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === selectedDate.toDateString();
                })
                .filter((event) => {
                    // Category filtering
                    const categoryMatch =
                        !searchData.category ||
                        event.category.toLowerCase() === searchData.category.toLowerCase();
                    // Search input filtering
                    const searchInputMatch =
                        !searchData.searchInput ||
                        event.title?.toLowerCase().includes(searchData.searchInput.toLowerCase());
                    // Return true if both category and search input match
                    return categoryMatch && searchInputMatch;
                });

            setEvents(formattedEvents);
            setLastLoadedViewport({ ...viewport });
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setIsFetching(false);
            if (isInitial) setLoading(false);
            setInitialLoad(false);
        }

    };


    // Center map on the searched city and fetch events
    useEffect(() => {
        if (searchData.city) {
            axios
                .get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                        searchData.city
                    )}.json`,
                    {
                        params: {
                            access_token: MAPBOX_TOKEN,
                            limit: 1,
                        },
                    }
                )
                .then((response) => {
                    if (response.data.features.length > 0) {
                        const [longitude, latitude] =
                            response.data.features[0].center;
                        setViewport((prev) => ({
                            ...prev,
                            latitude,
                            longitude,
                            zoom: 8, // Adjusted zoom level
                        }));
                        // Fetch events after viewport has been updated
                        fetchEvents(latitude, longitude, true);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching city coordinates:', error);
                });
        }
    }, [searchData.city]);

    // Fetch events when other searchData changes
    useEffect(() => {
        if (!isFetching && !searchData.city) {
            fetchEvents(viewport.latitude, viewport.longitude, true);
        }
    }, [searchData.category, searchData.searchInput, searchData.date]);

    // Fetch events when the viewport changes significantly
    useEffect(() => {
        if (!initialLoad && shouldFetchEvents() && !isFetching) {
            clearTimeout(fetchTimeoutRef.current);
            fetchTimeoutRef.current = setTimeout(() => fetchEvents(), 1000);
        }
    }, [viewport]);

    // Check if fetch is needed based on viewport changes
    const shouldFetchEvents = () => {
        if (!lastLoadedViewport) return true;
        const latDiff = Math.abs(
            viewport.latitude - lastLoadedViewport.latitude
        );
        const lngDiff = Math.abs(
            viewport.longitude - lastLoadedViewport.longitude
        );
        const zoomDiff = Math.abs(viewport.zoom - lastLoadedViewport.zoom);
        return latDiff > 0.01 || lngDiff > 0.01 || zoomDiff >= 1;
    };

    const convertTo12Hour = (time) => {
        if (!time) return 'N/A';
        const [hour, minute] = time.split(':');
        const hourInt = parseInt(hour, 10);
        const hour12 = hourInt % 12 || 12;
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        return `${hour12}:${minute} ${ampm}`;
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Music':
                return '🎸';
            case 'Sports':
                return '🏅';
            case 'Arts & Theatre':
                return '🎭';
            case 'Film':
                return '🎬';
            case 'Miscellaneous':
                return '🎉';
            case 'Party':
                return '🎊';
            case 'Bar Event':
                return '🍻';
            case 'Social Gathering':
                return '👥';
            case 'Game Night':
                return '🎲';
            case 'Food & Drink':
                return '🍔';
            case 'Comedy':
                return '😂';
            case 'Festival':
                return '🎪';
            default:
                return '📍';
        }
    };

    // Handle form submission to add a new event
    // Handle form submission to add a new event
    // Function to convert time to 12-hour format with AM/PM
    const formatTimeTo12Hour = (time) => {
        if (!time) return 'N/A';
        const [hour, minute] = time.split(':');
        const hourInt = parseInt(hour, 10);
        const hour12 = hourInt % 12 || 12;
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        return `${hour12}:${minute} ${ampm}`;
    };

    // Handle form submission to add a new event
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Get form values
        const title = e.target.title.value;
        const date = e.target.date.value;
        const time = formatTimeTo12Hour(e.target.time.value);  // Convert time to 12-hour format
        const location = e.target.location.value;
        const description = e.target.description.value;
        const category = e.target.category.value;

        // Use Mapbox geocoding API to get lat and lng
        axios
            .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    location
                )}.json`,
                {
                    params: {
                        access_token: MAPBOX_TOKEN,
                        limit: 1,
                    },
                }
            )
            .then((response) => {
                if (response.data.features.length > 0) {
                    const [lng, lat] = response.data.features[0].center;
                    const newEvent = {
                        title,
                        date,
                        time,  // Use the formatted 12-hour time with AM/PM
                        location,
                        description,
                        category,
                        lat,
                        lng,
                        venue: location,
                    };
                    // Add newEvent to events state via props
                    setEvents((prevEvents) => [...prevEvents, newEvent]);
                } else {
                    alert('Location not found. Please enter a valid location.');
                }
            })
            .catch((error) => {
                console.error('Error geocoding location:', error);
                alert('Error finding location. Please try again.');
            });

        // Reset the form after submission
        e.target.reset();
    };



    return (
        <div
            className="event-map-container"
            style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px',
            }}
        >
            <h1 className="text-center text-event">Event Map</h1>

            {initialLoad ? (
                <div className="loading-center">
                    <p>Loading...</p>
                    <div className="spinner-rotate"></div>
                </div>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '600px',
                        marginBottom: '20px',
                    }}
                >
                    {MAPBOX_TOKEN ? (
                        <ReactMapGL
                            {...viewport}
                            mapboxAccessToken={MAPBOX_TOKEN}
                            mapStyle="mapbox://styles/dudebrochill/cm2pb7ch600di01qi3a2a5cvo/draft"
                            onMove={(evt) => setViewport(evt.viewState)}
                            onMoveEnd={() => {
                                clearTimeout(fetchTimeoutRef.current);
                                fetchTimeoutRef.current = setTimeout(() => {
                                    if (!isFetching) fetchEvents();
                                }, 1000); // Delay to reduce load on API
                            }}
                        >
                            {events.map((event, index) => (
                                <Marker
                                    key={index}
                                    latitude={parseFloat(event.lat)}
                                    longitude={parseFloat(event.lng)}
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div
                                        style={{
                                            fontSize: '24px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {getCategoryIcon(event.category)}
                                    </div>
                                </Marker>
                            ))}

                            {selectedEvent && (
                                <Popup
                                    latitude={parseFloat(selectedEvent.lat)}
                                    longitude={parseFloat(selectedEvent.lng)}
                                    onClose={() => setSelectedEvent(null)}
                                    closeOnClick={false}
                                    anchor="top"
                                >
                                    <div
                                        style={{
                                            width: '200px',
                                            padding: '8px',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <button
                                            onClick={() => setSelectedEvent(null)}
                                            style={{
                                                float: 'right',
                                                cursor: 'pointer',
                                                border: 'none',
                                                background: 'none',
                                                fontSize: '14px',
                                                padding: 0,
                                            }}
                                        >
                                            ✖
                                        </button>
                                        <h4
                                            style={{
                                                fontSize: '16px',
                                                margin: '0 0 5px',
                                            }}
                                        >
                                            {selectedEvent.title}
                                        </h4>
                                        <p style={{ margin: '5px 0' }}>
                                            Category: {selectedEvent.category}
                                        </p>
                                        <p style={{ margin: '5px 0' }}>
                                            Date: {selectedEvent.date}
                                        </p>
                                        <p style={{ margin: '5px 0' }}>
                                            Time: {selectedEvent.time} {/* Display the event time here */}
                                        </p>
                                        <p style={{ margin: '5px 0' }}>
                                            Venue: {selectedEvent.venue}
                                        </p>
                                        <p style={{ margin: '5px 0' }}>
                                            Description: {selectedEvent.description}
                                        </p>
                                    </div>
                                </Popup>
                            )}

                            )}
                        </ReactMapGL>
                    ) : (
                        <div className="error-message">
                            <p>Map cannot be loaded. Mapbox token is missing.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Event Creation Form */}
            <div
                className="add-event-form-container"
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    marginTop: '20px',
                }}
            >
                <h2 className="text-center text-event">Add New Event</h2>
                <Form onSubmit={handleFormSubmit}>
                    <Row className="g-3">
                        {/* First Row - Title and Category */}
                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Enter event title"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="formCategory">
                                <Form.Label>Event Category</Form.Label>
                                <Form.Control as="select" name="category" required>
                                    <option value="">Select Category</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        {/* Second Row - Date and Time */}
                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="formDate">
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control type="date" name="date" required />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="formTime">
                                <Form.Label>Event Time</Form.Label>
                                <Form.Control type="time" name="time" required />
                            </Form.Group>
                        </Col>

                        {/* Third Row - Location */}
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formLocation">
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    placeholder="Enter event location"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        {/* Full Width Row - Description */}
                        <Col xs={12}>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder="Enter event description"
                                    rows={3}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        {/* Submit Button */}
                        <Col xs={12}>
                            <Button
                                type="submit"
                                className="event-form-button"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#6f42c1',
                                    borderColor: '#6f42c1',
                                    color: 'white',
                                }}
                            >
                                Add Event
                            </Button>
                        </Col>
                    </Row>
                </Form>


            </div>
        </div>
    );
};

export default EventMap;
