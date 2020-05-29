import { useMutation } from '@apollo/react-hooks';

import {
  GetAccounts,
  UpdateAccount,
} from '*/graphql_operations/account.graphql';

import {
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
} from '../../../_graphql/types/graphql.type';

export const useUpdateAccount = (account: UpdateAccountMutationVariables['account']) => {
  const [updateAccount, updateAccountResult] = useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(
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