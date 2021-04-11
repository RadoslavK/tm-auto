import {
  useEffect,
  useState,
} from 'react';
// eslint-disable-next-line no-restricted-imports
import { useLazyLoadQuery } from 'react-relay/hooks';

const _useLazyLoadQuery: typeof useLazyLoadQuery = (query, variables, options) => {
  const [fetchKey, setFetchKey] = useState<number>(0);

  useEffect(() => {
    setFetchKey(new Date().valueOf());
  }, []);

  const hasOwnFetchKey = !!options?.hasOwnProperty('fetchKey');

  return useLazyLoadQuery(query, variables, hasOwnFetchKey ? options : { ...options, fetchKey });
};

export { _useLazyLoadQuery as useLazyLoadQuery };