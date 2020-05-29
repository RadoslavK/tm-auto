import { useMutation } from '@apollo/react-hooks';

import {
  CreateAccount,
  GetAccounts,
} from '*/graphql_operations/account.graphql';

import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from '../../../_graphql/types/graphql.type';

export const useCreateAccount = (account: CreateAccountMutationVariables['account']) => {
  const [createAccount, createAccountResult] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CreateAccount,
    {
      refetchQueries: [{ query: GetAccounts }],
      variables: { account },
    },
  );

  return {
    createAccount,
    createAccountResult,
  };
};