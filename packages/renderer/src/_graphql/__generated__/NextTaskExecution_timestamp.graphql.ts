/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NextTaskExecution_timestamp = {
    readonly totalSeconds: number;
    readonly " $refType": "NextTaskExecution_timestamp";
};
export type NextTaskExecution_timestamp$data = NextTaskExecution_timestamp;
export type NextTaskExecution_timestamp$key = {
    readonly " $data"?: NextTaskExecution_timestamp$data;
    readonly " $fragmentRefs": FragmentRefs<"NextTaskExecution_timestamp">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NextTaskExecution_timestamp",
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
(node as any).hash = '01e4b30f8886bbd56225e9c9446ab273';
export default node;
