import { useMutation } from '@apollo/react-hooks';

import { SignIn } from '*/graphql_operations/controller.graphql';

import {
  ISignInMutation,
  ISignInMutationVariables,
} from '../../../_types/graphql';

export const useSignInMutation = (accountId: ISignInMutationVariables['accountId']) => {
  const [executeSignIn] = useMutation<ISignInMutation, ISignInMutationVariables>(
    SignIn,
    { variables: { accountId } },
  );

  return executeSignIn;
};