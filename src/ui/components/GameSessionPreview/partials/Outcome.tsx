import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { SFC } from 'react';

interface IOutcomeProps {
  className: string;
  outcome: 'inProgress' | 'ended' | 'win' | 'lose';
}

const useStyles = makeStyles({
  inProgress: {
    color: 'inherit'
  },
  ended: {
    color: 'inherit'
  },
  win: {
    color: 'yellow'
  },
  lose: {
    color: 'orange'
  }
});

const lables = {
  inProgress: 'In Progress',
  ended: 'Ended',
  win: 'Victory',
  lose: 'Loss'
};

const Outcome: SFC<IOutcomeProps> = ({ className, outcome }) => {
  const classes = useStyles({});

  return (
    <Typography className={classNames(className, classes[outcome])} color="inherit">
      {lables[outcome]}
    </Typography>
  );
};

export default Outcome;
