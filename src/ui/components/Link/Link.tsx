import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface ILinkProps extends WithStyles<typeof styles> {
  to: string;
}

const styles = createStyles({
  link: {
    textDecoration: 'inherit',
    color: 'inherit'
  }
});

const Link: SFC<ILinkProps> = ({ children, classes, to }) => (
  <ReactRouterLink className={classes.link} to={to}>
    {children}
  </ReactRouterLink>
);

export default withStyles(styles)(Link);
