import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { IoIosCamera } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import LoadingScreen from "../../components/LoadingScreen";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { redirectTo, validateError } from "../../helpers";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";

import { API_URL, DEFAULT_USER_PHOTO } from "../../config";

import styles from "../styles.module.css";

type Inputs = {
	name: string;
	email: string;
	password?: string;
};

const Profile: React.FC = () => {
	const [showPopover, setShowPopover] = useState(false);
	const [user, setUser] = useState<any>();
	const [photo, setPhoto] = useState<any>();
	const [imageFile, setImageFile] = useState<any>(null);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Inputs>();

	const updateUser: SubmitHandler<Inputs> = async (data: Inputs) => {
		try {

			if (photo !== user.photoUrl) {
				const formData = new FormData();
				formData.append('file', imageFile);
				console.log(formData.get("file"))
				await axios.put(`${API_URL}/users/image`, formData, {
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				formData.delete("file");
			}

			toast.info("Updating...");
			const req = await axios({
				url: `${API_URL}/users`,
				method: "PATCH",
				withCredentials: true,
				data: {
					name: data.name
				},
			});
			redirectTo("/profile");
			toast.success(req.data.message);
		} catch (err) {
			validateError(err.response.data);
			toast.error(err.response.data.error);
		}
	};

	const getUser = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/users`,
				method: "GET",
				withCredentials: true,
			});

			setPhoto(req.data.photoUrl);
			setUser(req.data);
		} catch (err) {
			validateError(err.response.data);
		}
	};

	const updatePhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file: any = e?.target?.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPhoto(imageUrl);
			setImageFile(file);
		}
	};

	useEffect(() => {
		setValue("name", user?.name);
		setValue("email", user?.email);
	}, [user]);

	useEffect(() => {
		getUser();
	}, []);

	if (user) {
		return (
			<Fragment>
				<ToastContainer
					position="bottom-center"
					autoClose={4000}
					hideProgressBar
					closeOnClick
					pauseOnHover
					transition={Slide}
				/>
				<div className={`${styles.shrProfileContainer}`}>
					<NavBar user={user} isPopoverActive={showPopover} setPopover={setShowPopover} />
					<div className={styles.shrProfile}>
						<div className={styles.shrProfileCard}>
							<h2>
								<FiArrowLeft onClick={() => redirectTo("/dashboard")} /> Edit
								Profile
							</h2>
							<form
								className={styles.shrProfileData}
								onSubmit={handleSubmit(updateUser)}
							>
								<div className={styles.shrProfilePhoto}>
									<img src={photo === null ? DEFAULT_USER_PHOTO : photo} alt="" />
									<label
										className={styles.shrProfilePhotoCover}
										htmlFor="profile_picture"
									>
										<IoIosCamera />
										<span>Change Photo</span>
									</label>
								</div>
								<div className={styles.shrProfileText}>
									<input
										type="file"
										id="profile_picture"
										onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
											updatePhoto(e)
										}
										style={{display: "none"}}
									/>
									<motion.input
										initial={{x: "-50%", opacity: 0}}
										animate={{x: "0%", opacity: 1}}
										transition={{type: "tween", duration: 0.5, delay: 0.1}}
										type="text"
										placeholder="Name"
										className={`${styles.shrInput}`}
										{...register("name", {required: true})}
									/>
									<div className={styles.shrProfileFooter}>
										<motion.button
											initial={{x: "-50%", opacity: 0}}
											animate={{x: "0%", opacity: 1}}
											transition={{
												type: "tween",
												duration: 0.5,
												delay: 0.5,
											}}
											className={`${styles.shrButton}`}
											style={{marginTop: "1rem"}}
										>
											Save
										</motion.button>

										{(errors.name || errors.email) && (
											<motion.p
												initial={{x: "-50%", opacity: 0}}
												animate={{x: "0%", opacity: 1}}
												transition={{type: "tween", duration: 0.3}}
											>
												*Name and email are required
											</motion.p>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	} else {
		return <LoadingScreen/>;
	}
};

export default withRouter(React.memo(Profile));
