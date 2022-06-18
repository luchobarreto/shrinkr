import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/";
import Profile from "./pages/Profile/";
import Url from "./pages/Url";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
	return (
		<Router>
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/profile" exact component={Profile} />
			<Route path="/l/:id" exact component={Url} />
		</Router>
	);
}

export default App;
