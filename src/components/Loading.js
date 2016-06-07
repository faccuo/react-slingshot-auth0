import React from 'react';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <div style={{
      textAlign: 'center'
    }}>
      <Paper style={{
        paddingTop: 20,
        paddingBottom: 20
      }}>
        <CircularProgress/>
      </Paper>
    </div>
  );
};

export default Loading;
