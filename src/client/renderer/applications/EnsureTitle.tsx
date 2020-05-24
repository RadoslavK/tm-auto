import React from 'react';

import { useTitle } from '../hooks/useTitle';

export const EnsureTitle: React.FC = ({ children }) => {
  useTitle();

  return <>{children}</>;
};