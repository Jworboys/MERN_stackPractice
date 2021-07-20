import React from 'react';
import { useParams } from 'react-router';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
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

const UpdatePlace = () => {
	const placeId = useParams().placeId;

	const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
	if (!identifiedPlace) {
		return (
			<div className='center'>
				<h2>Could not find place!</h2>
			</div>
		);
	}

	return (
		<form>
			<Input
				id='title'
				element='input'
				type='text'
				label='Title'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid title.'
				onInput={() => {}}
				value={identifiedPlace.title}
				valid={true}
			/>
			<Input
				id='title'
				element='textarea'
				label='Description'
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText='Please enter a valid description (min. 5 characters).'
				onInput={() => {}}
				value={identifiedPlace.description}
				valid={true}
			/>
			<Button type='submit' disabled={true}>
				UPDATE PLACE
			</Button>
		</form>
	);
};

export default UpdatePlace;