import { useMutation } from '@apollo/react-hooks';

import {
  DeleteAccount,
  GetAccounts,
} from '*/graphql_operations/account.graphql';

import {
  IDeleteAccountMutation,
  IDeleteAccountMutationVariables,
} from '../../../../_types/graphql';

export const useDeleteAccountMutation = (accountId: IDeleteAccountMutationVariables['accountId']) => {
  const [deleteAccount, deleteAccountResult] = useMutation<IDeleteAccountMutation, IDeleteAccountMutationVariables>(
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