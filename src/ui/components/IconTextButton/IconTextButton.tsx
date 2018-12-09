import { ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { SFC } from 'react';

interface IconTextButtonProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?(): void;
}

const useStyles = makeStyles(theme => ({
  buttonBase: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 100,
    color: theme.palette.action.active,
    overflow: 'visible',
    padding: 8,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      },
      '&$disabled': {
        backgroundColor: 'transparent'
      }
    },
    '&$disabled': {
      color: theme.palette.action.disabled
    },
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    })
  },
  focusVisible: {
    backgroundColor: theme.palette.action.hover
  },
  selected: {
    backgroundColor: `${theme.palette.action.selected} !important`
  },
  disabled: {
    color: theme.palette.action.disabled
  }
}));

const IconTextButton: SFC<IconTextButtonProps> = ({ icon, onClick, label, selected, disabled }) => {
  const classes = useStyles({});
  return (
    <ButtonBase
      component="div"
      className={classNames(classes.buttonBase, {
        [classes.selected]: selected,
        [classes.disabled]: disabled
      })}
      focusVisibleClassName={classes.focusVisible}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <Typography
        component="span"
        variant="subtitle1"
        className={classNames({
          [classes.disabled]: disabled
        })}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
};

export default IconTextButton;
