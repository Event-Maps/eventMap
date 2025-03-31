import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import logo from "./../../images/image_transparent.png";


class Header extends Component {
	componentDidMount() {

		// sidebar open/close

		var btn = document.querySelector('.navicon');
		var aaa = document.querySelector('.myNavbar ');

		function toggleFunc() {
			return aaa.classList.toggle("show");
		}

		btn.addEventListener('click', toggleFunc);


		// Sidenav li open close
		var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li'));
		for (var y = 0; y < navUl.length; y++) {
			navUl[y].addEventListener('click', function () { checkLi(this) });
		}

		function checkLi(current) {
			navUl.forEach(el => el.classList.remove('open'));
			current.classList.add('open');
		}

	}

	render() {
		return (
			<header className="site-header header-transparent mo-left">

				<div className="sticky-header main-bar-wraper navbar-expand-lg">
					<div className="main-bar clearfix ">
						<div className="container clearfix">

							<div className="logo-header mostion">
								<Link to={"./"} className="logo-1"><img src={logo} alt="Logo" /></Link>
								<Link to={"./"} className="logo-2"><img src={logo} alt="Logo" /></Link>

								<Link to={"./"} className="logo-2"><img src={logo} alt="Logo" /></Link>
							</div>

							<button className="navbar-toggler collapsed navicon  justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
								<span></span>
								<span></span>
								<span></span>
							</button>

						</div>
					</div>
				</div>

			</header>
		)
	}
}

export default Header;
