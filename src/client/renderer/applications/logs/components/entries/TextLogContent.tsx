import React from 'react';

import { TextLogEntryContent } from '../../../../_graphql/types/graphql.type';

type Props = {
  readonly className?: string;
  readonly content: TextLogEntryContent;
};

export const TextLogContent: React.FC<Props> = ({ className, content }) => (
  <span className={className}>
    {content.message}
  </span>
);