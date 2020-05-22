import { useMutation } from '@apollo/react-hooks';

import { SignOut } from '*/graphql_operations/controller.graphql';

import { ISignOutMutation } from '../../../../_types/graphql';

export const useSignOutMutation = () => {
  const [signOut] = useMutation<ISignOutMutation>(SignOut);

  return signOut;
};