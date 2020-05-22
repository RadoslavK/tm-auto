import React from 'react';

import { ITextLogEntryContentPayload } from '../../../../../_types/graphql';

type Props = {
  readonly className?: string;
  readonly content: ITextLogEntryContentPayload;
};

export const TextLogContent: React.FC<Props> = ({ className, content }) => (
  <span className={className}>
    {content.message}
  </span>
);