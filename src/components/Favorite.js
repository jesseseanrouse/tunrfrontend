import React from 'react';
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// solid Star
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const Favorite = (props) => {
	const loaded = () => (
		<div className='SongList'>
			{props.favList.map((song) => (
				<article className='Song'>
					<p>{song.title}</p>
					<p>{song.artist}</p>
					<p>{song.time}</p>
					<div
						onClick={() => {
							props.handleFav(song);
						}}>
						<FontAwesomeIcon icon={solidHeart} size='1x' />
					</div>
				</article>
			))}
		</div>
	);

	return props.favList.length > 0 ? loaded() : <h1></h1>;
};

export default Favorite;
