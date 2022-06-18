const createHistory = require("history").createBrowserHistory;

export const redirectTo = (url: string): void => {
	let history = createHistory();
	history.push(url);
	let pathUrl = window.location.href;
	window.location.href = pathUrl;
};

export const replaceUrl = (url: string): void => {
	window.location.replace(url);
};

export const validateError = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	if (!isLoggedIn) redirectTo("/login");
};
