import React, { Fragment } from "react";

import { BounceLoader } from "react-spinners";

import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC = () => {
	return (
		<Fragment>
			<div className={styles.shrLoadingScreenContainer}>
				<BounceLoader color={"#1D4BF6"} />
			</div>
		</Fragment>
	);
};

export default React.memo(LoadingScreen);
