import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ExitButtonProps extends RouteComponentProps<{}> {
  to?: string;
}

const ExitButton: SFC<ExitButtonProps> = ({ history, to = '/' }) => {
  const handleClick = () => {
    history.push(to);
  };

  return (
    <IconButton onClick={handleClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default withRouter(ExitButton);
