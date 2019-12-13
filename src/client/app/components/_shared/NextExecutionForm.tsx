import React, { useState } from 'react';

import { IDuration } from '../../../_types/graphql';
import { Duration } from '../controls/Duration';

interface IProps {
  readonly onSubmit: (delay: IDuration) => void;
}

const defaultDelay: IDuration = {
  days: 0, hours: 0, minutes: 0, seconds: 0,
};

export const NextExecutionForm: React.FC<IProps> = (props) => {
  const {
    onSubmit,
  } = props;

  const [delay, setDelay] = useState<IDuration>(defaultDelay);

  const submit = () => {
    onSubmit(delay);
  };

  return (
    <div>
      <Duration value={delay} onChange={setDelay} />
      <button
        type="button"
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
};
