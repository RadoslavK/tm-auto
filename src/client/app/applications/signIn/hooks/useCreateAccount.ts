import { useMutation } from '@apollo/react-hooks';

import {
  CreateAccount,
  GetAccounts,
} from '*/graphql_operations/account.graphql';

import {
  ICreateAccountMutation,
  ICreateAccountMutationVariables,
} from '../../../../_types/graphql';

export const useCreateAccount = (account: ICreateAccountMutationVariables['account']) => {
  const [createAccount, createAccountResult] = useMutation<ICreateAccountMutation, ICreateAccountMutationVariables>(
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