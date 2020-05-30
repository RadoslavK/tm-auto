import { useMutation } from '@apollo/client';

import { SignIn } from '*/graphql_operations/controller.graphql';

import {
  SignInMutation,
  SignInMutationVariables,
} from '../../../_graphql/types/graphql.type';

export const useSignInMutation = (accountId: SignInMutationVariables['accountId']) => {
  const [executeSignIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SignIn,
    { variables: { accountId } },
  );

  return executeSignIn;
};