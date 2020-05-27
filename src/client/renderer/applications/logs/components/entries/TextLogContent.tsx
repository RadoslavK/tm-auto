import React from 'react';

import { TextLogEntryContentPayload } from '../../../../_types/graphql';

type Props = {
  readonly className?: string;
  readonly content: TextLogEntryContentPayload;
};

export const TextLogContent: React.FC<Props> = ({ className, content }) => (
  <span className={className}>
    {content.message}
  </span>
);