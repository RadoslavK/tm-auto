import { useMutation } from '@apollo/client';

import { SignOut } from '*/graphql_operations/controller.graphql';

import { SignOutMutation } from '../../../_graphql/types/graphql.type';

export const useSignOutMutation = () => {
  const [signOut] = useMutation<SignOutMutation>(SignOut);

  return signOut;
};