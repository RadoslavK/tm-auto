/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Cost_resources = {
    readonly " $fragmentRefs": FragmentRefs<"Resources_resources">;
    readonly " $refType": "Cost_resources";
};
export type Cost_resources$data = Cost_resources;
export type Cost_resources$key = {
    readonly " $data"?: Cost_resources$data;
    readonly " $fragmentRefs": FragmentRefs<"Cost_resources">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Cost_resources",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Resources_resources"
    }
  ],
  "type": "Resources",
  "abstractKey": null
};
(node as any).hash = '401c97af3ad16c11a4082b9fc10fa525';
export default node;
