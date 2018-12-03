import { Divider } from '@material-ui/core';
import React, { SFC, useContext } from 'react';
import { TargetContext } from 'ui/contexts/target';
import Events from '../Events';

interface UserProps {
  showExit?: boolean;
}

const User: SFC<UserProps> = ({ showExit }) => {
  const { target, unsetTarget } = useContext(TargetContext);

  return (
    <div>
      {showExit && <div onClick={unsetTarget}>B</div>}
      <Divider />
      {target && target.value}
      <Events />
    </div>
  );
};

export default User;
