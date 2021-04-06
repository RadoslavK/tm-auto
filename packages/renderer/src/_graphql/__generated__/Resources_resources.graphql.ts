/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Resources_resources = {
    readonly wood: number;
    readonly clay: number;
    readonly iron: number;
    readonly crop: number;
    readonly freeCrop: number;
    readonly total: number;
    readonly " $refType": "Resources_resources";
};
export type Resources_resources$data = Resources_resources;
export type Resources_resources$key = {
    readonly " $data"?: Resources_resources$data;
    readonly " $fragmentRefs": FragmentRefs<"Resources_resources">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Resources_resources",
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
(node as any).hash = '80cec722720a35e6aac752666ceaf605';
export default node;
