import { Typography } from '@material-ui/core';
import { getQueryVariable } from 'api/utilities';
import React, { SFC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ConfirmEmail: SFC<RouteComponentProps<{}>> = ({ location }) => {
  const token = getQueryVariable('token', location.search);
  const tokenId = getQueryVariable('tokenId', location.search);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && tokenId) {
      // https://docs.mongodb.com/stitch/authentication/userpass/#reset-a-user-s-password
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
