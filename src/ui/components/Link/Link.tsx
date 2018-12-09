import { makeStyles } from '@material-ui/styles';
import React, { SFC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface ILinkProps {
  to: string;
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'inherit',
    color: 'inherit'
  }
});

const Link: SFC<ILinkProps> = ({ children, to }) => {
  const classes = useStyles({});
  return (
    <ReactRouterLink className={classes.link} to={to}>
      {children}
    </ReactRouterLink>
  );
};

export default Link;
