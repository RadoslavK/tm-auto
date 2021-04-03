/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuilding_queuedBuilding = {
    readonly id: string;
    readonly type: number;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuildingComponent_queuedBuilding">;
    readonly " $refType": "QueuedBuilding_queuedBuilding";
};
export type QueuedBuilding_queuedBuilding$data = QueuedBuilding_queuedBuilding;
export type QueuedBuilding_queuedBuilding$key = {
    readonly " $data"?: QueuedBuilding_queuedBuilding$data;
    readonly " $fragmentRefs": FragmentRefs<"QueuedBuilding_queuedBuilding">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueuedBuilding_queuedBuilding",
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
      "name": "type",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QueuedBuildingComponent_queuedBuilding"
    }
  ],
  "type": "QueuedBuilding",
  "abstractKey": null
};
(node as any).hash = '1a4248fba7e8aa0a69173d0008655218';
export default node;
