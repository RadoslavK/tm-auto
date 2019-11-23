import * as React from 'react';
import { ITextLogEntryContentPayload } from '../../../../_types/graphql';

interface IProps {
  readonly className?: string;
  readonly content: ITextLogEntryContentPayload;
}

export const TextLogContent: React.FC<IProps> = (props) => {
  const {
    className,
    content,
  } = props;

  return (
    <span className={className}>
      {content.message}
    </span>
  );
};