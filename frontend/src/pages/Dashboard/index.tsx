import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FiCopy, FiDelete, FiEdit2, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import NavBar from "../../components/NavBar";
import LoadingScreen from "../../components/LoadingScreen";
import Modal from "../../components/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import copy from "copy-to-clipboard";

import { API_URL, APP_URL } from "../../config";

import styles from "../styles.module.css";
import { validateError } from "../../helpers";
import { toast, ToastContainer, Slide } from "react-toastify";

type Inputs = {
	url: string;
};

type Url = {
	_id: string;
	url: string;
	owner_id?: string;
	short_id: string;
	views: number;
	active?: boolean;
	createdAt?: string;
};

const Link: React.FC<any> = ({
	url,
	id,
	shortId,
	deleteUrl,
	editUrl,
}: {
	url: string;
	id: string;
	shortId: string;
	deleteUrl: any;
	editUrl: any;
}) => {
	return (
		<div className={styles.shrLink} key={id}>
			<span>{url}</span>
			<div className={styles.shrLinkButtons}>
				<button
					data-tip="Copy Short Link"
					onClick={() => {
						copy(`${APP_URL}/l/${shortId}`);
						toast.success("Url copied!");
					}}
				>
					<FiCopy />
				</button>
				<button data-tip="Edit Link" onClick={() => editUrl()}>
					<FiEdit2 />
				</button>
				<button data-tip="Delete Link" onClick={() => deleteUrl()}>
					<FiDelete />
				</button>
			</div>
			<ReactTooltip />
		</div>
	);
};

const Dashboard: React.FC = () => {
	const [showPopover, setShowPopover] = useState(false);
	const [page, setPage] = useState(0);
	const [user, setUser] = useState<any>();
	const [urls, setUrls] = useState<Array<Url>>([]);
	const [urlsCount, setUrlsCount] = useState(0);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [activeUrl, setActiveUrl] = useState<null | string>(null);
	const [editedUrl, setEditedUrl] = useState("");

	const { register, handleSubmit, setValue } = useForm<Inputs>();

	const getUser = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/api/users`,
				method: "GET",
				withCredentials: true,
			});

			setUser(req.data);
		} catch (err) {
			validateError(err.response.data);
		}
	};

	const getUrls = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/api/urls?page=${page}&size=10`,
				method: "GET",
				withCredentials: true,
			});
			setUrlsCount(req.data.count);
			setUrls(req.data.data);
		} catch (err) {
			validateError(err.response.data);
			toast.error(err.response.error);
		}
	};

	const createUrl: SubmitHandler<Inputs> = async (data: Inputs) => {
		try {
			const req = await axios({
				url: `${API_URL}/api/urls`,
				method: "POST",
				data,
				withCredentials: true,
			});

			toast.success(req.data.message);
			setValue("url", "");
			getUrls();
		} catch (err) {
			validateError(err.response.data);
			toast.error(err.response.error);
		}
	};

	const editUrl = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/api/urls/${activeUrl}`,
				method: "PATCH",
				data: { url: editedUrl },
				withCredentials: true,
			});
			setShowEditModal(false);
			toast.success(req.data.message);
			getUrls();
		} catch (err) {
			toast.error(err.response.error);
		}
		setActiveUrl(null);
		setEditedUrl("");
	};

	const deleteUrl = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/api/urls/${activeUrl}`,
				method: "DELETE",
				withCredentials: true,
			});
			setShowDeleteModal(false);
			toast.success(req.data.message);
			getUrls();
		} catch (err) {
			toast.error(err.response.error);
		}
		setActiveUrl(null);
	};

	useEffect(() => {
		getUrls();
	}, [page]);

	useEffect(() => {
		if (user?._id) {
			getUrls();
		}
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
				<div className={`${styles.shrDashboardContainer}`}>
					<NavBar user={user} isPopoverActive={showPopover} setPopover={setShowPopover} />
					<Modal
						title="Edit Url"
						isOpen={showEditModal}
						toggleOpen={() => setShowEditModal(false)}
						onClose={() => {
							setActiveUrl(null);
							setEditedUrl("");
						}}
						buttons={[
							{
								text: "Cancel",
								border: "#EBECF0",
								background: "#fff",
								closeModal: true,
								onClick: () => {
									setActiveUrl(null);
									setEditedUrl("");
								},
							},
							{
								text: "Edit",
								color: "#000",
								background: "#ffd780",
								onClick: () => editUrl(),
							},
						]}
						className={styles.shrModalEdit}
					>
						<label htmlFor="url">Url:</label>
						<input
							type="url"
							id="url"
							placeholder="https://yourlongurl.com/"
							value={editedUrl}
							onChange={(e) => setEditedUrl(e.target.value)}
						/>
						<label htmlFor="url">Short Id:</label>
						<div className={styles.shrModalDisabledInput}>
							{urls.find((url) => url._id === activeUrl)?.short_id}
						</div>
					</Modal>
					<Modal
						title="Are you sure?"
						isOpen={showDeleteModal}
						toggleOpen={() => setShowDeleteModal(false)}
						onClose={() => {
							setActiveUrl(null);
						}}
						buttons={[
							{
								text: "Cancel",
								border: "#EBECF0",
								background: "#fff",
								closeModal: true,
								onClick: () => setActiveUrl(null),
							},
							{
								text: "Delete",
								color: "#fff",
								background: "#fb3640",
								onClick: () => deleteUrl(),
							},
						]}
					>
						Are you sure you want to delete this url?
					</Modal>
					<div className={`${styles.shrCreateLinkContainer}`}>
						<h1>Ready to cut your URL?</h1>
						<div className={`${styles.shrCreateLink}`}>
							<label htmlFor="">Long URL:</label>
							<form
								className={`${styles.shrInputContainer}`}
								onSubmit={handleSubmit(createUrl)}
							>
								<motion.input
									initial={{ x: "-50%", opacity: 0 }}
									animate={{ x: "0%", opacity: 1 }}
									transition={{ type: "tween", duration: 0.5, delay: 0.2 }}
									type="url"
									placeholder="https://yourlongurl.com/long_subdirectory"
									className={`${styles.shrInput}`}
									{...register("url", { required: true })}
								/>
								<button
									className={`${styles.shrButton} ${styles.shrShrinkButton}`}
									style={{ marginTop: "auto", marginBottom: 0 }}
									type="submit"
								>
									Short it!
								</button>
							</form>
						</div>
					</div>
					<div className={styles.shrTableContainer}>
						<div className={styles.shrTable}>
							<h2>
								Links <span>{urlsCount}</span>
							</h2>
							<div className={styles.shrLinks}>
								{urls.map((url: Url) => (
									<Link
										url={url.url}
										id={url._id}
										shortId={url.short_id}
										editUrl={() => {
											setShowEditModal(true);
											setEditedUrl(url.url);
											setActiveUrl(url._id);
										}}
										deleteUrl={() => {
											setShowDeleteModal(true);
											setActiveUrl(url._id);
										}}
									/>
								))}
							</div>
							<div className={styles.shrPages}>
								<button
									className={`${page === 0 ? styles.shrDisabledPageButton : ""}`}
									onClick={() => {
										if (page > 0) {
											setPage(page - 1);
										}
									}}
								>
									<FiArrowLeft />
								</button>
								<span>{page}</span>
								<button
									className={`${
										10 + page * 10 > urlsCount
											? styles.shrDisabledPageButton
											: ""
									}`}
									onClick={() => {
										if (10 + page * 10 < urlsCount) {
											setPage(page + 1);
										}
									}}
								>
									<FiArrowRight />
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	} else {
		return <LoadingScreen />;
	}
};

export default withRouter(React.memo(Dashboard));
