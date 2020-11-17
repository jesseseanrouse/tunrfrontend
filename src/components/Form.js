import React, { useState } from 'react';

const Form = (props) => {
	// state for the form
	const [formData, setFormData] = useState(props.song); // update with props sent down from app for an empty form

	// HandleSubmit
	const handleSubmit = (event) => {
		event.preventDefault();
		// handleSubmit from app here
		props.handleSubmit(props.song);
		props.history.push('/');
	};

	// HandleChange
	const handleChange = (event) => {
		props.setSong({ ...props.song, [event.target.name]: event.target.value });
	};

	// onSubmit is an event listener - listening for a submit click
	return (
		<div className='InputsForm'>
			<form onSubmit={handleSubmit}>
				<div className='GridForm'>
					<div>TITLE</div>
					<div>
						<input
							type='text'
							name='title'
							value={props.song.title}
							onChange={handleChange}
						/>
					</div>
					<div>ARTIST</div>
					<div>
						<input
							type='text'
							name='artist'
							value={props.song.artist}
							onChange={handleChange}
						/>
					</div>
					<div>TIME</div>
					<div>
						<input
							type='text'
							name='time'
							value={props.song.time}
							onChange={handleChange}
						/>
					</div>
				</div>
				<input
					type='hidden'
					name='time'
					value={props.song.favorite}
					onChange={handleChange}
				/>
				<input className='ButtonForm' type='submit' value={props.label} />
			</form>
		</div>
	);
};

export default Form;
