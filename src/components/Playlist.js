import React from "react";
// import font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// solid Star
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
// holy Star
import { faHeart as holyHeart} from "@fortawesome/free-regular-svg-icons";

const Playlist = (props) => {
  const {songs} = props

  const loaded = () => (
		<div className='SongList'>
			{songs.map((song) => (
				<article className='Song'>
					<p className='A'>{song.title}</p>
					<p className='B'>{song.artist}</p>
					<p className='C'>{song.time}</p>
					<div
						className='D'
						onClick={() => {
							props.handleFav(song);
						}}>
						{song.favorite === true ? (
							<FontAwesomeIcon icon={solidHeart} size='1x' />
						) : (
							<FontAwesomeIcon icon={holyHeart} size='1x' />
						)}
					</div>

					<button
						className='E'
						onClick={() => {
							props.selectSong(song);
							props.history.push('/edit');
						}}>
						Edit
					</button>

					<button
						className='F'
						onClick={() => {
							props.removeSong(song);
						}}>
						Delete
					</button>
				</article>
			))}
		</div>
	);

  return songs.length > 0 ? loaded() : <h1>Loading songs...</h1>
  

};

export default Playlist;