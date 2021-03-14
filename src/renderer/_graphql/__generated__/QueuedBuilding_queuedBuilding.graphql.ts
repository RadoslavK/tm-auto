/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueuedBuilding_queuedBuilding = {
    readonly queueIndex: number;
    readonly queueId: string;
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
      "name": "queueIndex",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "queueId",
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
(node as any).hash = 'c97df4b1ae15c98c11e4e8e9853f99ee';
export default node;
