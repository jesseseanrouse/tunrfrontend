import React from 'react';

const Favorite = (props) => {
	const loaded = () => (
		<div>
			{props.favList.map((song) => (
				<article>
					<p>{song.title}</p>
					<p>{song.artist}</p>
					<p>{song.time}</p>
					<div
						onClick={() => {
							props.handleFav(song);
						}}>
						{song.favorite === true ? (
							<i className='far fa-heart'></i>
						) : (
							<i className='fas fa-heart'></i>
						)}
					</div>
				</article>
			))}
		</div>
	);

	return props.favList.length > 0 ? loaded() : <h1></h1>;
};

export default Favorite;
