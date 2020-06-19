import { useDequeueBuildingAtFieldMutation as _useDequeueBuildingAtFieldMutation } from '../../_graphql/graphqlHooks';
import { useVillageContext } from '../../applications/villages/context/villageContext';

type Params = {
  readonly targetLevel?: number;
  readonly fieldId: number;
};

export const useDequeueBuildingAtFieldMutation = () => {
  const { villageId } = useVillageContext();

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
