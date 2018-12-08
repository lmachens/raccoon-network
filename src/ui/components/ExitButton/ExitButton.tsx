import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Link from '../Link';

interface IExitButtonProps extends RouteComponentProps<{}> {
  to?: string;
}

const ExitButton: SFC<IExitButtonProps> = ({ history, to = '/' }) => {
  return (
    <Link to={to}>
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
    </Link>
  );
};

export default withRouter(ExitButton);
