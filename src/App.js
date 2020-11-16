import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { Route, Link, Switch } from 'react-router-dom';
import Playlist from './components/Playlist';
// import Favorites from './components/Favorites';

function App() {
	// url of database
	// change url to deployed site //
	const url = 'https://jrtunr.herokuapp.com';
	// empty song for create
	const emptySong = {
		title: '',
		artist: '',
		time: '',
		favorite: false,
	};
	// State lives here
	const [songs, setSongs] = useState([]);
	const [selectedSong, setSelectedSong] = useState(emptySong);
	const [favorites, setFavorites] = useState([]);
	// Function to Fetch songs
	// match fetch to deployed data //
	const getSongs = () => {
		fetch(url + '/songs/')
			.then((response) => response.json())
			.then((data) => {
				setSongs(data);
			});
	};
	// get songs on page load
	React.useEffect(() => {
		getSongs();
	}, []);
	// handleCreate for creating songs
	const handleCreate = (newSong) => {
		// match create with deployed data //
		fetch(url + '/songs/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
		setSelectedSong(emptySong)
	};
	//  handleUpdate to edit songs
	const handleUpdate = (song) => {
		// match create with deployed data //
		fetch(url + '/songs/' + song.id, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(song),
		}).then((response) => getSongs());
		setSelectedSong(emptySong);
	};
	const removeSong = (song) => {
		// match create with deployed data //
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};
	const selectSong = (song) => {
		setSelectedSong(song);
	};

	const handleTest = () => {
		console.log(selectedSong)
	}
	return (
		<div className='App'>
			<h1>TUNR.</h1>
			<h6>FOR ALL YOUR PLAYLIST NEEDS</h6>
			<hr />
			<Switch>
				<Route
					exact
					path='/'
					render={(rp) => (
						<>
							<Playlist
								{...rp}
								songs={songs}
								selectSong={selectSong}
								removeSong={removeSong}
							/>
							<Form
								{...rp}
								label='create'
								song={selectedSong}
								setSong={setSelectedSong}
								handleSubmit={handleCreate}
							/>
						</>
					)}
				/>
				<Route
					exact
					path='/edit'
					render={(rp) => (
						<>
							<Playlist
								{...rp}
								songs={songs}
								selectSong={selectSong}
								removeSong={removeSong}
							/>
							<Form
								{...rp}
								label='update'
								song={selectedSong}
								setSong={setSelectedSong}
								handleSubmit={handleUpdate}
							/>
							<button onClick={handleTest}>test state</button>
						</>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
