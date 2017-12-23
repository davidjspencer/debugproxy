import React from 'react';
import Redbox from 'redbox-react';

export const consoleErrorReporter = ({error}) => {
  console.error(error);
  return <Redbox error={error} />;
};

// Broken in upgrade, what is it?
//consoleErrorReporter.propTypes = {
//  error: React.PropTypes.instanceOf(Error).isRequired
//};
