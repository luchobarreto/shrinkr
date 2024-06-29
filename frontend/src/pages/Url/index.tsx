import React, { Fragment, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import LoadingScreen from "../../components/LoadingScreen";
import { redirectTo, replaceUrl } from "../../helpers";
import { toast, ToastContainer, Slide } from "react-toastify";

interface params {
	id: string;
}

const Url: React.FC = () => {
	const { id } = useParams<params>();

	const getUrl = async () => {
		try {
			const req = await axios({
				url: `${API_URL}/urls/${id}`,
				method: "GET",
				withCredentials: true,
			});

			replaceUrl(req.data.url);
		} catch (err) {
			toast(err.response.data.error);
		}
	};

	useEffect(() => {
		if (id.length < 5) {
			redirectTo("/login");
		}
		getUrl();
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
			<LoadingScreen />
		</Fragment>
	);
};

export default React.memo(Url);
