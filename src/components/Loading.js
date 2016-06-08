import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <div style={{
      paddingTop: 20,
      paddingBottom: 20,
      textAlign: 'center'
    }}>
      <CircularProgress/>
    </div>
  );
};

export default Loading;
