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
	name: string;
	email: string;
	password: string;
};

const Register: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const getUserSession = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/api/users`,
				withCredentials: true,
				method: "GET",
			});

			if (req.data._id) {
				redirectTo("/dashboard");
			}
		} catch (err) {}
	};

	const createUser: SubmitHandler<Inputs> = async (data: Inputs) => {
		try {
			const req = await axios({
				url: `${API_URL}/api/users`,
				method: "POST",
				withCredentials: true,
				data,
			});

			toast.success(req.data.message);

			setTimeout(() => redirectTo("/login"), 1000);
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
			<div className={`${styles.shrRegisterContainer} row`}>
				<div className={`col-6 ${styles.shrRegister}`}>
					<motion.h1
						initial={{ x: "-50%", opacity: 0 }}
						animate={{ x: "0%", opacity: 1 }}
						transition={{ type: "tween", duration: 0.5 }}
					>
						Create your <br /> account
					</motion.h1>
					<form onSubmit={handleSubmit(createUser)}>
						<motion.input
							initial={{ x: "-50%", opacity: 0 }}
							animate={{ x: "0%", opacity: 1 }}
							transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
							type="text"
							placeholder="Name"
							className={`${styles.shrInput}`}
							{...register("name", { required: true })}
						/>
						{errors.name && (
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
							transition={{ type: "tween", duration: 0.5, delay: 0.2 }}
							type="email"
							placeholder="Email"
							className={`${styles.shrInput}`}
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
							className={`${styles.shrInput}`}
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
						<motion.p
							initial={{ x: "-50%", opacity: 0 }}
							animate={{ x: "0%", opacity: 1 }}
							transition={{ type: "tween", duration: 0.5, delay: 0.4 }}
							className={`${styles.shrRegisterTerms}`}
						>
							By clicking "Register" you agree with Shrinkr <span>Terms</span> and{" "}
							<span>Privacy Policy</span>.
						</motion.p>
						<motion.button
							initial={{ x: "-50%", opacity: 0 }}
							animate={{ x: "0%", opacity: 1 }}
							transition={{ type: "tween", duration: 0.5, delay: 0.2 }}
							className={`${styles.shrButton}`}
						>
							Register
						</motion.button>
					</form>
					<motion.p
						initial={{ x: "-50%", opacity: 0 }}
						animate={{ x: "0%", opacity: 1 }}
						transition={{ type: "tween", duration: 0.5, delay: 0.6 }}
					>
						Already have an account? <a href="/login">Sign in</a>.
					</motion.p>
				</div>
				<div className={`col-6 ${styles.shrRegisterQuoteContainer}`}>
					<motion.div
						initial={{ x: "50%", opacity: 0 }}
						animate={{ x: "0%", opacity: 1 }}
						transition={{ type: "tween", duration: 0.5 }}
						className={`${styles.shrRegisterQuote}`}
					>
						<div className={`${styles.shrRegisterQuotePhoto}`}></div>
						<div className={`${styles.shrRegisterQuoteText}`}>
							Lorem ipsum dolor sit, <span>amet consectetur adipisicing elit</span>.
							Maiores, harum autem vero est ad quae ex{" "}
							<span>blanditiis quo molestiae nam</span>. Recusandae, sapiente.
						</div>
						<div className={`${styles.shrRegisterQuoteName}`}>Jhon Doe</div>
					</motion.div>
				</div>
			</div>
		</Fragment>
	);
};

export default withRouter(React.memo(Register));
