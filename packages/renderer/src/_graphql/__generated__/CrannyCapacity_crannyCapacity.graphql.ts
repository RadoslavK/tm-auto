/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CrannyCapacity_crannyCapacity = {
    readonly actual: number;
    readonly ongoing: number;
    readonly total: number;
    readonly " $refType": "CrannyCapacity_crannyCapacity";
};
export type CrannyCapacity_crannyCapacity$data = CrannyCapacity_crannyCapacity;
export type CrannyCapacity_crannyCapacity$key = {
    readonly " $data"?: CrannyCapacity_crannyCapacity$data;
    readonly " $fragmentRefs": FragmentRefs<"CrannyCapacity_crannyCapacity">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CrannyCapacity_crannyCapacity",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "actual",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ongoing",
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
  "type": "VillageCrannyCapacity",
  "abstractKey": null
};
(node as any).hash = 'abe62e93156b6679196032d4a13966c3';
export default node;
