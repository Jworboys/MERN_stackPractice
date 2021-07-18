import { description } from 'commander';
import React from 'react';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'Ones of the most famous sky scrapers in the world!',
		imageUrl:
			'https://cdn.cnn.com/cnnnext/dam/assets/130802044459-skyscrapers-gallery---empire-state-building-super-169.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u1',
	},
	{
		id: '[2',
		title: 'Empire State Building',
		description: 'Ones of the most famous sky scrapers in the world!',
		imageUrl:
			'https://cdn.cnn.com/cnnnext/dam/assets/130802044459-skyscrapers-gallery---empire-state-building-super-169.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u2',
	},
];

const UserPlaces = () => {
	return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
