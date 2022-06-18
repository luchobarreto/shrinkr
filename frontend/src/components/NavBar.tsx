import React from "react";
import { Popover } from "react-tiny-popover";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { redirectTo } from "../helpers";

import { DEFAULT_USER_PHOTO, API_URL } from "../config";

import styles from "./NavBar.module.css";

interface User {
	_id: string;
	email: string;
	name: string;
	photo_url?: string;
}

interface props {
	user: User;
	isPopoverActive: boolean;
	setPopover: any;
}

const NavBar: React.FC<props> = ({ user, isPopoverActive, setPopover }: props) => {
	const logOut = async () => {
		await axios({
			url: `${API_URL}/api/users/logout`,
			method: "POST",
			withCredentials: true,
		});

		redirectTo("/login");
	};

	return (
		<div className={`${styles.shrNavbar}`}>
			<div className={`${styles.shrNavbarTitle}`}>Shrinkr.</div>
			<Popover
				isOpen={isPopoverActive}
				positions={["bottom"]}
				align="end"
				content={
					<div className={styles.shrPopover}>
						<button onClick={() => redirectTo("/profile")}>Profile</button>
						<button onClick={logOut}>Log Out</button>
					</div>
				}
				onClickOutside={() => setPopover(false)}
			>
				<div className={`${styles.shrNavbarUser}`} onClick={() => setPopover(true)}>
					<p>
						{user.name} <IoIosArrowDown />
					</p>
					<img src={user.photo_url === "" ? DEFAULT_USER_PHOTO : user.photo_url} alt="" />
				</div>
			</Popover>
		</div>
	);
};

export default React.memo(NavBar);
