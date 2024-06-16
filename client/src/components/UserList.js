import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_USERS } from '../apollo/get-base';

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>{user.login} {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
