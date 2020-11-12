import React from "react";
// impt
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
	return (
		<div className="card">
			<h3>
				<a href={repo.html_url}>{repo.name}</a>
			</h3>
		</div>
	);
};

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired, // ptor
};

export default RepoItem;
