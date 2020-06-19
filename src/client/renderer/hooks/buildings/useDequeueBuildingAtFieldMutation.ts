import { useDequeueBuildingAtFieldMutation as _useDequeueBuildingAtFieldMutation } from '../../_graphql/graphqlHooks';
import { useSelectedVillageId } from '../villages/useSelectedVillageId';

type Params = {
  readonly targetLevel?: number;
  readonly fieldId: number;
};

export const useDequeueBuildingAtFieldMutation = () => {
  const villageId = useSelectedVillageId();

  const [dequeue] = _useDequeueBuildingAtFieldMutation();

  return ({ fieldId, targetLevel }: Params) => {
    dequeue({
      variables: {
        input: {
          targetLevel,
          fieldId,
          villageId,
        },
      },
    });
  };
};
