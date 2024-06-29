import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";

import { API_URL } from "../../config";

import styles from "../styles.module.css";
import { redirectTo } from "../../helpers";

type Inputs = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const getUserSession = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/users`,
				withCredentials: true,
				method: "GET",
			});

			if (req.data.id) {
				redirectTo("/dashboard");
			}
		} catch (err) {}
	};

	const logIn: SubmitHandler<Inputs> = async (data: Inputs) => {
		try {
			const req = await axios({
				url: `${API_URL}/auth/signin`,
				method: "POST",
				withCredentials: true,
				data,
			});

			if (req.status === 200) {
				redirectTo("/dashboard");
			}
		} catch (err) {
			toast.error(err.response.data.error);
		}
	};

	useEffect(() => {
		getUserSession();
	}, []);

	return (
		<Fragment>
			<ToastContainer
				position="bottom-center"
				autoClose={2000}
				hideProgressBar
				closeOnClick
				pauseOnHover
				transition={Slide}
			/>
			<div className={`${styles.shrLoginContainer} row`}>
				<div className={`col-12 col-sm-6 ${styles.shrLogin}`}>
					<motion.h1
						initial={{ x: "-50%", opacity: 0 }}
						animate={{ x: "0%", opacity: 1 }}
						transition={{ type: "tween", duration: 0.5 }}
					>
						Welcome back <br /> to <span>Shrinkr</span>.
					</motion.h1>
					<motion.p
						initial={{ x: "-50%", opacity: 0 }}
						animate={{ x: "0%", opacity: 1 }}
						transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
					>
						Sign in to your account.
					</motion.p>
					<form onSubmit={handleSubmit(logIn)}>
						<motion.input
							initial={{ x: "-50%", opacity: 0 }}
							animate={{ x: "0%", opacity: 1 }}
							transition={{ type: "tween", duration: 0.5, delay: 0.2 }}
							type="email"
							placeholder="Email"
							autoComplete="off"
							className={styles.shrInput}
							{...register("email", { required: true })}
						/>
						{errors.email && (
							<motion.p
								initial={{ x: "-50%", opacity: 0 }}
								animate={{ x: "0%", opacity: 1 }}
								transition={{ type: "tween", duration: 0.3 }}
								className={styles.formError}
							>
								This field is required
							</motion.p>
						)}
						<motion.input
							initial={{ x: "-50%", opacity: 0 }}
							animate={{ x: "0%", opacity: 1 }}
							transition={{ type: "tween", duration: 0.5, delay: 0.3 }}
							type="password"
							placeholder="Password"
							className={styles.shrInput}
							{...register("password", { required: true })}
						/>
						{errors.password && (
							<motion.p
								initial={{ x: "-50%", opacity: 0 }}
								animate={{ x: "0%", opacity: 1 }}
								transition={{ type: "tween", duration: 0.3 }}
								className={styles.formError}
							>
								This field is required
							</motion.p>
						)}
						<motion.button
							initial={{ x: "-50%", opacity: 0 }}
							animate={{ x: "0%", opacity: 1 }}
							transition={{ type: "tween", duration: 0.5, delay: 0.3 }}
							className={styles.shrButton}
						>
							Sign In
						</motion.button>
					</form>
					<motion.p
						initial={{ x: "-50%", opacity: 0 }}
						animate={{ x: "0%", opacity: 1 }}
						transition={{ type: "tween", duration: 0.5, delay: 0.6 }}
					>
						Don't have an account? <a href="/register">Register</a>.
					</motion.p>
				</div>
				<div className="col-12 col-sm-6"></div>
			</div>
		</Fragment>
	);
};

export default withRouter(React.memo(Login));
