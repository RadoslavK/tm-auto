import React, { useState } from 'react';
import type { Duration } from 'shared/types/duration.type.js';

import { Duration as DurationComponent } from '../controls/Duration.js';

type Props = {
  readonly onSubmit: (delay: Duration) => void;
};

const defaultDelay: Duration = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const NextExecutionForm: React.FC<Props> = ({ onSubmit }) => {
  const [delay, setDelay] = useState<Duration>(defaultDelay);

  const submit = () => onSubmit(delay);

  return (
    <div>
      <DurationComponent onChange={setDelay} value={delay} />
      <button onClick={submit} type="button">
        Submit
      </button>
    </div>
  );
};

NextExecutionForm.displayName = 'NextExecutionForm';