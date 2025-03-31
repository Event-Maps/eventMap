import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadingToggleAction, loginAction } from '../../store/actions/AuthActions';
import logo from './../../images/logo-black.png';
import backgroundImgMobile from './../../images/mobileBackgroundImg.gif';
import rightSidebackgroundImgMobile from './../../images/background/bg1.jpg';
import gradientBackgroundImg from './../../images/background/bg2.jpg'


function Login(props) {
	const [email, setEmail] = useState('demo@example.com');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('123456');

	const dispatch = useDispatch();

	function onLogin(e) {
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = 'Email is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		dispatch(loadingToggleAction(true));
		dispatch(loginAction(email, password, props.history));
	}

	return (
		<div className="page-wraper">
			<div className="page-content dlab-login">
				<div className="container-fluid">
					<div className="row">
						{/* Login Form Box with GIF Background */}
						<div className="col-lg-4 login-form-box"
							style={{
								backgroundImage: `url(${backgroundImgMobile})`,
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
								backgroundColor: "#000"  // Optional fallback background color
							}}>
							<div className="login-form">
								<div className="logo">
									<Link to={"./"}><img src={""} alt="" /></Link>
								</div>
								<div className="tab-content nav">
									<div id="login" className="tab-pane active">
										<form className="dlab-form" onSubmit={onLogin}>
										<h3 className="form-title m-t0" style={{color: "white"}}>Welcome back, press login</h3>
											{props.errorMessage && (
												<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
													{props.errorMessage}
												</div>
											)}
											{props.successMessage && (
												<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
													{props.successMessage}
												</div>
											)}
											
											<div className="form-group">
												<input type="email" className="form-control"
													placeholder="Email Address"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
												{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
											</div>
											<div className="form-group">
												<input type="password" className="form-control" value={password} placeholder="Type Your Password"
													onChange={(e) =>
														setPassword(e.target.value)
													}
												/>
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
											</div>
											<div className="form-group field-btn text-left">
												<div className="input-block">
													<input id="check1" type="checkbox" />
													<label htmlFor="check1">Remember me</label>
												</div>
												<Link data-toggle="tab" to="#forgot-password" className="btn-link forgot-password"> Forgot Password</Link>
											</div>
											<div className="form-group">
												<button type="submit" className="site-button btn-block button-md">login</button>
											</div>
											<div className="form-group">
												<p className="info-bottom">Don’t have an account? <Link to="register" className="btn-link">Register</Link> </p>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>



						{/* Right Side White Background */}
						<div className="col-lg-8"
							style={{
								backgroundImage: `url(${gradientBackgroundImg})`,
								backgroundPosition: "center",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
							}}>




							<div className="content-info">
								<ul className="list-info">
									<li>
										<div className="dlab-box">
											<i className="fa fa-bullhorn"></i>
											<p>Get events from all over the world</p>
										</div>
									</li>
									<li>
										<div className="dlab-box">
											<i className="fa fa-car"></i>
											<p>Easily find events that are right for you</p>
										</div>
									</li>
									<li>
										<div className="dlab-box">
											<i className="fa fa-check"></i>
											<p>Organize your events</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		showLoading: state.auth.showLoading,
	};
};

export default connect(mapStateToProps)(Login);
