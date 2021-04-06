import type {
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';

export const modificationQueuePayloadUpdater = (store: RecordSourceSelectorProxy, modificationPayloadRootField: RecordProxy, villageId: string): void => {
  const removedBuildings = modificationPayloadRootField.getLinkedRecords('removedBuildings') || [];
  const removedIds = removedBuildings.map(b => b.getDataID());
  const root = store.getRoot();
  const queue = root.getLinkedRecord('buildingQueue', { villageId });

  if (queue) {
    const modifiedQueue = modificationPayloadRootField.getLinkedRecord('queue');

    if (removedIds) {
      let buildings = queue.getLinkedRecords('buildings') || [];
      buildings = buildings.filter(b => !removedIds.includes(b.getDataID()));

      queue.setLinkedRecords(buildings, 'buildings');
    }

    if (modifiedQueue) {
      queue.copyFieldsFrom(modifiedQueue);
    }

    root.setLinkedRecord(queue, 'buildingQueue', { villageId });
  }

  //  clearing cache does not work for some reason as it makes useFragment returns null instead of the list rendering first without this;
  window.setTimeout(() => {
    removedIds.forEach(id => store.delete(id));
  }, 0);
};