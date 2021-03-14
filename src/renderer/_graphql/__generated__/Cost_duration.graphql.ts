/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Cost_duration = {
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
    readonly " $refType": "Cost_duration";
};
export type Cost_duration$data = Cost_duration;
export type Cost_duration$key = {
    readonly " $data"?: Cost_duration$data;
    readonly " $fragmentRefs": FragmentRefs<"Cost_duration">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Cost_duration",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "days",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hours",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "minutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "seconds",
      "storageKey": null
    }
  ],
  "type": "Duration",
  "abstractKey": null
};
(node as any).hash = '00ee6c7b578c1c53950ba95330775d6d';
export default node;
