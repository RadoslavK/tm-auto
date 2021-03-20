/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Cost_resources = {
    readonly wood: number;
    readonly clay: number;
    readonly iron: number;
    readonly crop: number;
    readonly freeCrop: number;
    readonly total: number;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "wood",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "iron",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "crop",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "freeCrop",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "total",
      "storageKey": null
    }
  ],
  "type": "Resources",
  "abstractKey": null
};
(node as any).hash = '3de1ad6eacbb62fd0d40c18d81d80d27';
export default node;
