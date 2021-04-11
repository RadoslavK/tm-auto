/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AutoAdventureSettings_timestamp = {
    readonly " $fragmentRefs": FragmentRefs<"NextTaskExecution_timestamp">;
    readonly " $refType": "AutoAdventureSettings_timestamp";
};
export type AutoAdventureSettings_timestamp$data = AutoAdventureSettings_timestamp;
export type AutoAdventureSettings_timestamp$key = {
    readonly " $data"?: AutoAdventureSettings_timestamp$data;
    readonly " $fragmentRefs": FragmentRefs<"AutoAdventureSettings_timestamp">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutoAdventureSettings_timestamp",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NextTaskExecution_timestamp"
    }
  ],
  "type": "Timestamp",
  "abstractKey": null
};
(node as any).hash = '8404705742ffe32b9376ee7fae7c6296';
export default node;
