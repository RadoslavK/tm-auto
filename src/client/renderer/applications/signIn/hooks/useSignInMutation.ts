import { useMutation } from '@apollo/react-hooks';

import { SignIn } from '*/graphql_operations/controller.graphql';

import {
  SignInMutation,
  SignInMutationVariables,
} from '../../../_types/graphql';

export const useSignInMutation = (accountId: SignInMutationVariables['accountId']) => {
  const [executeSignIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SignIn,
    { variables: { accountId } },
  );

  return executeSignIn;
};