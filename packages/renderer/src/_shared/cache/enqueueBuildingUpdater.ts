import type {
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';

export const enqueueBuildingUpdater = (store: RecordSourceSelectorProxy, addedBuildingRecord: RecordProxy, addedNew: boolean, newIndex: number | null, queueRecord: RecordProxy | null, villageId: string): void => {
  const root = store.getRoot();
  const queue = root.getLinkedRecord('buildingQueue', { villageId });

  if (!queue) {
    return;
  }

  if (addedNew) {
    const buildings = queue.getLinkedRecords('buildings') || [];

    if (newIndex === null) {
      buildings.push(addedBuildingRecord);
    } else {
      buildings.splice(newIndex, 0, addedBuildingRecord);
    }
    queue.setLinkedRecords(buildings, 'buildings');
  }

  if (queueRecord) {
    queue.copyFieldsFrom(queueRecord);
  }

  root.setLinkedRecord(queue, 'buildingQueue', { villageId });
};