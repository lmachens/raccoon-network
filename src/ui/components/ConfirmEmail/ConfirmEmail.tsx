import { Typography } from '@material-ui/core';
import { handleConfirmUser } from 'api/stitch';
import React, { SFC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const getQueryVariable = (variable, search) => {
  const query = search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
};

const ConfirmEmail: SFC<RouteComponentProps<{}>> = ({ location }) => {
  const token = getQueryVariable('token', location.search);
  const tokenId = getQueryVariable('tokenId', location.search);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && tokenId) {
      handleConfirmUser(token, tokenId).then(() => {
        setLoading(false);
      });
    }
  }, []);

  if (!token || !tokenId) {
    return <Typography color="error">Invalid request</Typography>;
  }
  return (
    <Typography>
      {loading ? 'Loading' : 'E-Mail confirmed. You can close this window and login now.'}
    </Typography>
  );
};

export default withRouter(ConfirmEmail);
