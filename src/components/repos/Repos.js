import React from "react";
// impt
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repos = ({ repos }) => {
	return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

// ptar
Repos.propTypes = {
	repos: PropTypes.array.isRequired,
};

export default Repos;
