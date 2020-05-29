import React, { useState } from 'react';

import { Duration as DurationModel } from '../../../_graphql/types/graphql.type';
import { Duration } from '../controls/Duration';

type Props = {
  readonly onSubmit: (delay: DurationModel) => void;
};

const defaultDelay: DurationModel = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const NextExecutionForm: React.FC<Props> = ({ onSubmit }) => {
  const [delay, setDelay] = useState<DurationModel>(defaultDelay);

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
