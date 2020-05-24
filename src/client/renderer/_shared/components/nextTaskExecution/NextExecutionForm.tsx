import React, { useState } from 'react';

import { IDuration } from '../../../_types/graphql';
import { Duration } from '../controls/Duration';

type Props = {
  readonly onSubmit: (delay: IDuration) => void;
};

const defaultDelay: IDuration = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const NextExecutionForm: React.FC<Props> = ({ onSubmit }) => {
  const [delay, setDelay] = useState<IDuration>(defaultDelay);

  const submit = () => onSubmit(delay);

  return (
    <div>
      <Duration
        onChange={setDelay}
        value={delay}
      />
      <button
        onClick={submit}
        type="button"
      >
        Submit
      </button>
    </div>
  );
};
