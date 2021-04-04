import React from 'react';

export const GraphiQL: React.FC = () => {
  const openGraphiQL = () => window.api.openGraphiQL();

  return (
    <button onClick={openGraphiQL}>Open GraphiQL</button>
  );
};

GraphiQL.displayName = 'OpenGraphiQL';