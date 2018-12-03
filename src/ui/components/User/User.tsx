import { Divider } from '@material-ui/core';
import React, { ChangeEvent, SFC } from 'react';
import Events from '../Events';

interface UserProps {
  user: any;
  onExit?(): void;
}

const User: SFC<UserProps> = ({ user, onExit }) => (
  <div>
    {onExit && <div onClick={onExit}>B</div>}
    {user && user.profile && user.profile.email}
    {!user && 'Show welcome'}
    <Divider />
    <Events />
  </div>
);

export default User;
