import type {
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';

export const modificationQueuePayloadUpdater = (store: RecordSourceSelectorProxy, modificationPayloadRootField: RecordProxy, villageId: string): void => {
  const root = store.getRoot();
  const queue = root.getLinkedRecord('buildingQueue', { villageId });

  if (!queue) {
    return;
  }

  const modifiedQueue = modificationPayloadRootField.getLinkedRecord('queue');
  const removedBuildings = modificationPayloadRootField.getLinkedRecords('removedBuildings') || [];
  const removedIds = removedBuildings.map(b => b.getDataID());
  let buildings = queue.getLinkedRecords('buildings') || [];
  buildings = buildings.filter(b => !removedIds.includes(b.getDataID()));

  queue.setLinkedRecords(buildings, 'buildings');

  if (modifiedQueue) {
    queue.copyFieldsFrom(modifiedQueue);
  }

  root.setLinkedRecord(queue, 'buildingQueue', { villageId });
};