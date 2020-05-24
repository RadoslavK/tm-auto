import { useMutation } from '@apollo/react-hooks';

import {
  GetAccounts,
  UpdateAccount,
} from '*/graphql_operations/account.graphql';

import {
  IUpdateAccountMutation,
  IUpdateAccountMutationVariables,
} from '../../../_types/graphql';

export const useUpdateAccount = (account: IUpdateAccountMutationVariables['account']) => {
  const [updateAccount, updateAccountResult] = useMutation<IUpdateAccountMutation, IUpdateAccountMutationVariables>(
    UpdateAccount,
    {
      refetchQueries: [{ query: GetAccounts }],
      variables: { account },
    },
  );

  return {
    updateAccount,
    updateAccountResult,
  };
};