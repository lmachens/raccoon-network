import { Divider, IconButton, Typography } from '@material-ui/core';
import { addContact, removeContact } from 'api/stitch/profile';
import React, { SFC, useContext } from 'react';
import { ProfileContext } from 'ui/contexts/profile';
import { TargetContext } from 'ui/contexts/target';
import Events from '../Events';

interface UserProps {
  showExit?: boolean;
}

const User: SFC<UserProps> = ({ showExit }) => {
  const { user, isAnonymous, refreshProfile, profile } = useContext(ProfileContext);
  const { target, unsetTarget } = useContext(TargetContext);

  const userId = target!.value;
  const toggleContact = () => {
    if (profile!.contactUserIds && profile!.contactUserIds!.includes(userId)) {
      removeContact(userId).then(() => {
        refreshProfile();
      });
    } else {
      addContact(userId).then(() => {
        refreshProfile();
      });
    }
  };

  return (
    <div>
      {showExit && <div onClick={unsetTarget}>B</div>}
      <Typography>User</Typography>
      <IconButton onClick={toggleContact} disabled={isAnonymous || user!.id === userId}>
        +
      </IconButton>
      <Divider />
      {userId}
      <Events />
    </div>
  );
};

export default User;
