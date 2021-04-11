/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextTasksExecution_timestamp = {
    readonly totalSeconds: number;
    readonly " $refType": "NextTasksExecution_timestamp";
};
export type NextTasksExecution_timestamp$data = NextTasksExecution_timestamp;
export type NextTasksExecution_timestamp$key = {
    readonly " $data"?: NextTasksExecution_timestamp$data;
    readonly " $fragmentRefs": FragmentRefs<"NextTasksExecution_timestamp">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NextTasksExecution_timestamp",
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
(node as any).hash = '45654e7d7c038fa425907b557bce75fe';
export default node;
