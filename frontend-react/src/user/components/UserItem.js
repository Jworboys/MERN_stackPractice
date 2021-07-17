import classes from './UserItem.module.css';
import React from 'react';

const UserItem = props => {
	return (
		<li className={classes['user-item']}>
			<div className={classes['user-item__content']}>
				<div className={classes['user-item__image']}>
					<img src={props.image} alt={props.name} />
				</div>
				<div className={classes['user-item__info']}>
					<h2>{props.name}</h2>
					<h3>
						{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
					</h3>
				</div>
			</div>
		</li>
	);
};

export default UserItem;
