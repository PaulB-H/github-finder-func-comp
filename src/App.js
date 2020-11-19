import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Load initial users
	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			// You can await here
			const res = await axios.get(`https://api.github.com/users`, {
				headers: {
					"User-Agent": "PaulB-H",
					Authorization: "token " + process.env.REACT_APP_GITHUB_OATH_TOKEN,
				},
			});
			setUsers(res.data);
			setLoading(false);
			console.log("Hello Kenobi");
		}
		fetchData();
	}, []);

	// Search Github users
	const searchUsers = async (text) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}`,
			{
				headers: {
					"User-Agent": "PaulB-H",
					Authorization: "token " + process.env.REACT_APP_GITHUB_OATH_TOKEN,
				},
			}
		);

		setUsers(res.data.items);
		setLoading(false);
	};

	// Get a single Github user
	const getUser = async (username) => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
			{
				headers: {
					"User-Agent": "PaulB-H",
					Authorization: "token " + process.env.REACT_APP_GITHUB_OATH_TOKEN,
				},
			}
		);

		setUser(res.data);
		setLoading(false);
	};

	// Get users repos
	const getUserRepos = async (username) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/users/${username}`, {
			headers: {
				"User-Agent": "PaulB-H",
				Authorization: "token " + process.env.REACT_APP_GITHUB_OATH_TOKEN,
			},
		});

		setRepos(res.data);
		setLoading(false);
	};

	// Clear users from state
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// Set alert

	const showAlert = (msg, type) => {
		// Same as { msg: msg, type: type }
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} />
					<Switch>
						<Route
							// exact
							path="/github-finder-func-comp"
							render={(props) => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						{/* When you pass in a component to a route like below you cannot pass in props */}
						<Route exact path="/about" component={About} />
						<Route
							exact
							path="/users/:login"
							render={(props) => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
