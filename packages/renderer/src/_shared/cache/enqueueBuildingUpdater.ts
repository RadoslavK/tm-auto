import type {
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';

export const enqueueBuildingUpdater = (store: RecordSourceSelectorProxy, addedBuildingRecord: RecordProxy, addedNew: boolean, queueRecord: RecordProxy | null, villageId: string): void => {
  const root = store.getRoot();
  const queue = root.getLinkedRecord('buildingQueue', { villageId });

  if (!queue) {
    return;
  }

  if (addedNew) {
    const buildings = queue.getLinkedRecords('buildings') || [];

    buildings.push(addedBuildingRecord);
    queue.setLinkedRecords(buildings, 'buildings');
  }

  if (queueRecord) {
    queue.copyFieldsFrom(queueRecord);
  }

  root.setLinkedRecord(queue, 'buildingQueue', { villageId });
};