import { useMutation } from '@apollo/client';

import {
  DeleteAccount,
  GetAccounts,
} from '*/graphql_operations/account.graphql';

import {
  DeleteAccountMutation,
  DeleteAccountMutationVariables,
} from '../../../_graphql/types/graphql.type';

export const useDeleteAccountMutation = (accountId: DeleteAccountMutationVariables['accountId']) => {
  const [deleteAccount, deleteAccountResult] = useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(
    DeleteAccount,
    {
      refetchQueries: [{ query: GetAccounts }],
      variables: { accountId },
    },
  );

  return {
    deleteAccount,
    deleteAccountResult,
  };
};