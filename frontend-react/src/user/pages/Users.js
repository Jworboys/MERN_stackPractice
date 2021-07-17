import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
	const USERS = [
		{
			id: 'u1',
			name: 'Jordan Worboys',
			image:
				'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg',
			places: 3,
		},
	];

	return <UsersList items={USERS} />;
};

export default Users;
