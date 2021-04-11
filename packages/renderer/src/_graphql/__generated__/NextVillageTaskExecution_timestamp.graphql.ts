/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextVillageTaskExecution_timestamp = {
    readonly totalSeconds: number;
    readonly " $refType": "NextVillageTaskExecution_timestamp";
};
export type NextVillageTaskExecution_timestamp$data = NextVillageTaskExecution_timestamp;
export type NextVillageTaskExecution_timestamp$key = {
    readonly " $data"?: NextVillageTaskExecution_timestamp$data;
    readonly " $fragmentRefs": FragmentRefs<"NextVillageTaskExecution_timestamp">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NextVillageTaskExecution_timestamp",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalSeconds",
      "storageKey": null
    }
  ],
  "type": "Timestamp",
  "abstractKey": null
};
(node as any).hash = '5c31e4ae313ad6ec60bbe64327b5b4d0';
export default node;
