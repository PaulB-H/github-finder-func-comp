import React, { useState } from "react";
import PropTypes from "prop-types";

// Added props via destructuring here
const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
	// We pull out what we want to call the piece of state and the method
	// we use to change the piece of state and then our default value
	const [text, setText] = useState("");

	// not a class anymore so we add const before it
	const onSubmit = (e) => {
		e.preventDefault();
		// this.state.text => text
		if (text === "") {
			// this.props.setAlert => setAlert & added to props via destructuring
			setAlert("Please enter something", "light");
		} else {
			searchUsers(text);
			// this.setState({ text: "" }); => setText('');
			setText("");
		}
	};

	// We no longer do this.setState, we call setText
	// we no longer have to pass in an object { [e.target.name]: e.target.value }
	// Just need the value we want to set it to
	const onChange = (e) => setText(e.target.value);

	// No more render we need a return
	return (
		<div>
			<form className="form" onSubmit={onSubmit}>
				<input
					type="text"
					name="text"
					placeholder="Search Users..."
					// this.state.text/onChange => text, onChange
					value={text}
					onChange={onChange}
				/>
				<input
					type="submit"
					value="Search"
					className="btn btn-dark btn-block"
				/>
			</form>
			{showClear && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

// ptfr - PropTypes function is required
// ptbr - PropTypes boolean is required
Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default Search;
