import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { Route, Link, Switch } from 'react-router-dom';
import Playlist from './components/Playlist';
import Favorite from './components/Favorite';

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
		setSelectedSong(emptySong);
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

	// Favorite Song
	const handleFav = (song) => {
		if (song.favorite === false) {
			let favSongs = favorites;
			favSongs.push(song);
			setFavorites(favSongs);
			song.favorite = true;
			fetch(url + '/songs/' + song.id, {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(song),
			}).then((response) => getSongs());
		} else {
			let favSongs = favorites;
			let i = 0;
			let index = -1;
			while (i < favSongs.length) {
				if (favSongs[i].id === song.id) {
					index = i;
				}
				i++;
			}
			if (index > -1) {
				favSongs.splice(index, 1);
			}
			setFavorites(favSongs);
			song.favorite = false;
			fetch(url + '/songs/' + song.id, {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(song),
			}).then((response) => getSongs());
		}
		let favDisplay = document.getElementById('FavHeader');
		if (favorites.length === 0) {
			favDisplay.style.display = 'none';
		} else {
			favDisplay.style.display = 'block';
		}
	};
	return (
		<div className='App'>
			<header>
				<h1 className='Header'>TUNR.</h1>
				<h6 className='Header2'>FOR ALL YOUR PLAYLIST NEEDS</h6>
			</header>
			<hr />
			<Switch>
				<Route
					exact
					path='/'
					render={(rp) => (
						<>
							<h3 className='PlaylistHeader'>Playlist</h3>
							<Playlist
								{...rp}
								songs={songs}
								selectSong={selectSong}
								removeSong={removeSong}
								handleFav={handleFav}
							/>
							<h3 id='FavHeader'>Favorites</h3>
							<Favorite favList={favorites} handleFav={handleFav} />
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
							<h3 className='PlaylistHeader'>Playlist</h3>
							<Playlist
								{...rp}
								songs={songs}
								selectSong={selectSong}
								removeSong={removeSong}
								handleFav={handleFav}
							/>
							<h3 id='FavHeader'>Favorites</h3>
							<Favorite favList={favorites} handleFav={handleFav} />
							<Form
								{...rp}
								label='update'
								song={selectedSong}
								setSong={setSelectedSong}
								handleSubmit={handleUpdate}
							/>
						</>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
