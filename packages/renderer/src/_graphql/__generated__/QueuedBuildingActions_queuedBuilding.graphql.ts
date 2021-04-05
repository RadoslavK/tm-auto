/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuildingActions_queuedBuilding = {
    readonly id: string;
    readonly startingLevel: number;
    readonly targetLevel: number;
    readonly " $refType": "QueuedBuildingActions_queuedBuilding";
};
export type QueuedBuildingActions_queuedBuilding$data = QueuedBuildingActions_queuedBuilding;
export type QueuedBuildingActions_queuedBuilding$key = {
    readonly " $data"?: QueuedBuildingActions_queuedBuilding$data;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingActions_queuedBuilding">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueuedBuildingActions_queuedBuilding",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startingLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetLevel",
      "storageKey": null
    }
  ],
  "type": "QueuedBuilding",
  "abstractKey": null
};
(node as any).hash = '69e500b7a8d9279475750ab00541bd15';
export default node;
