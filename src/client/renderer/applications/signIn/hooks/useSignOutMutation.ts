import { useMutation } from '@apollo/react-hooks';

import { SignOut } from '*/graphql_operations/controller.graphql';

import { SignOutMutation } from '../../../_types/graphql';

export const useSignOutMutation = () => {
  const [signOut] = useMutation<SignOutMutation>(SignOut);

  return signOut;
};