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
					<p className='A'>{song.title}</p>
					<p className='B'>{song.artist}</p>
					<p className='C'>{song.time}</p>
					<div className='D'
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
